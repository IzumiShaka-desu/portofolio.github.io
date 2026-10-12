<script lang="ts">
	import { onDestroy } from 'svelte';
	import type { ArcId, Chapter } from '$lib/data/profile';
	import { plainText } from '$lib/text';
	import ChapterPage from './ChapterPage.svelte';
	import Redactable from './Redactable.svelte';

	interface Props {
		chapters: Chapter[];
		arcId: ArcId;
	}

	let { chapters, arcId }: Props = $props();

	// Keep in sync with the turn animations below.
	const TURN_MS = 800;

	type Turn = { from: number; to: number; dir: 'next' | 'prev' };
	type Role = 'active' | 'under' | 'turn-out' | 'turn-in' | 'hidden';

	let current = $state(0);
	let turn = $state<Turn | null>(null);
	let root: HTMLElement;
	let inView = false;
	let timer: ReturnType<typeof setTimeout> | undefined;
	let swipe: { x: number; y: number } | null = null;

	const total = $derived(chapters.length);
	const pad = (n: number) => String(n).padStart(2, '0');

	// Pages share one grid cell so the book keeps the height of its tallest page.
	// Turning to the next page lifts the current one away (manga style: it swings
	// to the right around the spine); turning back swings the previous page in.
	function role(i: number): Role {
		if (!turn) return i === current ? 'active' : 'hidden';
		const top = turn.dir === 'next' ? turn.from : turn.to;
		const below = turn.dir === 'next' ? turn.to : turn.from;
		if (i === top) return turn.dir === 'next' ? 'turn-out' : 'turn-in';
		if (i === below) return 'under';
		return 'hidden';
	}

	function go(to: number) {
		if (turn || to === current || to < 0 || to >= total) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
			current = to;
			keepInView();
			return;
		}
		turn = { from: current, to, dir: to > current ? 'next' : 'prev' };
		timer = setTimeout(() => {
			current = to;
			turn = null;
			keepInView();
		}, TURN_MS);
	}

	function keepInView() {
		if (root.getBoundingClientRect().top < 0) root.scrollIntoView({ block: 'start' });
	}

	// Manga reads right to left, so ← is the next page.
	function onKeydown(event: KeyboardEvent) {
		if (!inView || event.altKey || event.ctrlKey || event.metaKey) return;
		if ((event.target as HTMLElement).closest('input, textarea, select, [contenteditable]')) return;
		if (event.key === 'ArrowLeft') go(current + 1);
		else if (event.key === 'ArrowRight') go(current - 1);
		else return;
		event.preventDefault();
	}

	// Swiping right pulls the page over, like in a manga reader app.
	function onPointerDown(event: PointerEvent) {
		if (event.pointerType !== 'mouse') swipe = { x: event.clientX, y: event.clientY };
	}

	function onPointerUp(event: PointerEvent) {
		if (!swipe) return;
		const dx = event.clientX - swipe.x;
		const dy = event.clientY - swipe.y;
		swipe = null;
		if (Math.abs(dx) < 60 || Math.abs(dy) > Math.abs(dx) * 0.6) return;
		go(dx > 0 ? current + 1 : current - 1);
	}

	$effect(() => {
		const io = new IntersectionObserver(([entry]) => (inView = entry.isIntersecting), { threshold: 0.3 });
		io.observe(root);
		return () => io.disconnect();
	});

	onDestroy(() => clearTimeout(timer));
</script>

<svelte:window onkeydown={onKeydown} />

<div class="reader" bind:this={root} role="region" aria-roledescription="carousel" aria-label="Chapters">
	<nav class="contents" aria-label="Table of contents">
		<span class="contents-label kicker"><span lang="ja">目次</span> Contents</span>
		<ol>
			{#each chapters as chapter, i (chapter.id)}
				<li>
					<button
						type="button"
						class:on={i === (turn?.to ?? current)}
						aria-current={i === current ? 'page' : undefined}
						onclick={() => go(i)}
					>
						<span class="no">{pad(i + 1)}</span>
						<Redactable text={chapter.title} />
					</button>
				</li>
			{/each}
		</ol>
	</nav>

	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="stage"
		onpointerdown={onPointerDown}
		onpointerup={onPointerUp}
		onpointercancel={() => (swipe = null)}
	>
		{#each chapters as chapter, i (chapter.id)}
			{@const r = role(i)}
			<div
				class="leaf {r}"
				role="group"
				aria-roledescription="slide"
				aria-label="Chapter {i + 1} of {total}: {plainText(chapter.title)}"
				aria-hidden={r === 'hidden'}
				inert={r !== 'active'}
			>
				<div class="front">
					<ChapterPage
						{chapter}
						index={i}
						{total}
						{arcId}
						onturn={r === 'active' && i < total - 1 ? () => go(i + 1) : undefined}
					/>
				</div>
				<div class="back" aria-hidden="true"></div>
			</div>
		{/each}
		{#if turn}
			<span class="sfx pera" lang="ja" aria-hidden="true">ペラッ</span>
		{/if}
	</div>

	<div class="controls">
		<button type="button" class="btn ink" onclick={() => go(current + 1)} disabled={current >= total - 1}>
			← Next chapter
		</button>
		<p class="folio">
			<span class="count"><span class="display">{pad(current + 1)}</span> / {pad(total)}</span>
			<span class="hint lettering">reads right to left, like a real manga</span>
		</p>
		<button type="button" class="btn" onclick={() => go(current - 1)} disabled={current === 0}>
			Previous →
		</button>
	</div>

	<p class="sr-only" aria-live="polite">
		Chapter {current + 1} of {total}: {plainText(chapters[current].title)}
	</p>
</div>

<style>
	.reader {
		scroll-margin-top: 76px;
	}

	/* ---- table of contents ---- */
	.contents {
		display: flex;
		align-items: center;
		gap: 0.6rem 1rem;
		margin-bottom: 1.4rem;
		min-width: 0;
	}

	.contents-label {
		flex: none;
		color: var(--ink-faint);
	}

	.contents-label span {
		color: var(--red);
		font-family: var(--font-display);
		letter-spacing: 0.1em;
	}

	.contents ol {
		display: flex;
		gap: 0.45rem;
		min-width: 0;
		margin: 0;
		padding: 4px 6px 8px 2px;
		list-style: none;
		overflow-x: auto;
		scrollbar-width: thin;
	}

	.contents button {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		padding: 0.4rem 0.75rem;
		border: var(--line-thin) solid var(--ink);
		background: var(--white);
		color: var(--ink);
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 500;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		white-space: nowrap;
		box-shadow: 2px 2px 0 var(--ink);
		cursor: pointer;
		transition:
			background-color 0.2s,
			color 0.2s;
	}

	.contents button:hover {
		background: var(--paper);
	}

	.contents button.on {
		background: var(--ink);
		color: var(--white);
	}

	.contents button.on :global(.redact) {
		background: var(--white);
		box-shadow: none;
	}

	.no {
		color: var(--red);
	}

	/* ---- the book ---- */
	.stage {
		position: relative;
		perspective: 2600px;
		touch-action: pan-y;
	}

	:global(.js) .stage {
		display: grid;
	}

	:global(.js) .leaf {
		grid-area: 1 / 1;
	}

	/* without JS every chapter is simply listed */
	.leaf + .leaf {
		margin-top: 2.5rem;
	}

	:global(.js) .leaf + .leaf {
		margin-top: 0;
	}

	.leaf {
		position: relative;
		transform-style: preserve-3d;
		transform-origin: right center;
	}

	:global(.js) .leaf.hidden {
		visibility: hidden;
	}

	.leaf.active {
		z-index: 2;
	}

	.leaf.under {
		z-index: 1;
	}

	.leaf.turn-out,
	.leaf.turn-in {
		z-index: 3;
	}

	.front {
		position: relative;
		height: 100%;
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
	}

	/* the reverse of the sheet, seen as it swings past the spine */
	.back {
		display: none;
		position: absolute;
		inset: 2.1rem 0 2.2rem;
		background-color: var(--paper);
		background-image: radial-gradient(rgba(20, 20, 20, 0.14) 26%, transparent 28%);
		background-size: 5px 5px;
		border: var(--line) solid var(--ink);
		transform: rotateY(180deg);
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
	}

	.turn-out .back,
	.turn-in .back {
		display: block;
	}

	.turn-out {
		animation: turn-out 0.8s cubic-bezier(0.45, 0.05, 0.3, 1) forwards;
	}

	.turn-in {
		animation: turn-in 0.8s cubic-bezier(0.45, 0.05, 0.3, 1) forwards;
	}

	/* light falls off the lifting page, and its shadow slides off the one below */
	.turn-out .front::after,
	.turn-in .front::after,
	.under .front::after {
		content: '';
		position: absolute;
		inset: 0;
		pointer-events: none;
		z-index: 5;
	}

	.turn-out .front::after {
		background: linear-gradient(to right, rgba(20, 20, 20, 0.05), rgba(20, 20, 20, 0.35));
		animation: shade-in 0.8s ease-in forwards;
	}

	.turn-in .front::after {
		background: linear-gradient(to right, rgba(20, 20, 20, 0.05), rgba(20, 20, 20, 0.35));
		animation: shade-out 0.8s ease-out forwards;
	}

	.under .front::after {
		background: linear-gradient(to left, rgba(20, 20, 20, 0.35), transparent 70%);
		animation: shade-out 0.8s ease-out forwards;
	}

	@keyframes turn-out {
		from {
			transform: rotateY(0deg);
		}
		to {
			transform: rotateY(180deg);
		}
	}

	@keyframes turn-in {
		from {
			transform: rotateY(180deg);
		}
		to {
			transform: rotateY(0deg);
		}
	}

	@keyframes shade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes shade-out {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	.pera {
		position: absolute;
		left: clamp(4px, 3%, 28px);
		bottom: 22%;
		z-index: 6;
		font-size: clamp(2rem, 5vw, 3.2rem);
		transform: rotate(-12deg);
		animation: pera 0.8s var(--ease-snap) forwards;
	}

	@keyframes pera {
		0% {
			opacity: 0;
			transform: rotate(-12deg) scale(0.4);
		}
		25% {
			opacity: 1;
			transform: rotate(-12deg) scale(1.1);
		}
		80% {
			opacity: 1;
			transform: rotate(-10deg) scale(1);
		}
		100% {
			opacity: 0;
			transform: rotate(-10deg) scale(1);
		}
	}

	/* ---- controls ---- */
	.controls {
		display: none;
		align-items: center;
		justify-content: space-between;
		gap: 0.8rem;
		margin-top: 1.4rem;
	}

	:global(.js) .controls {
		display: flex;
	}

	.controls .btn:disabled {
		opacity: 0.35;
		cursor: default;
		transform: none;
		box-shadow: 2px 2px 0 var(--ink);
	}

	.folio {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 0.1rem;
		text-align: center;
	}

	.count {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--ink-faint);
	}

	.count .display {
		font-size: 1.5rem;
		color: var(--ink);
	}

	.hint {
		font-size: 0.72rem;
		color: var(--red);
	}

	@media (max-width: 560px) {
		.controls .btn {
			padding: 0.65em 0.8em;
			font-size: 0.7rem;
		}

		.hint {
			display: none;
		}
	}
</style>
