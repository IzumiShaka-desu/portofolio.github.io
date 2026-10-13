<script lang="ts" module>
	// Remembered across remounts (switching arcs re-creates the reader), so the
	// layout doesn't flip to list and back and nudge the reader's scroll position.
	let lastMode: 'pinned' | 'list' = 'list';
	let lastTrackHeight = 0;
</script>

<script lang="ts">
	import { onDestroy, onMount, tick } from 'svelte';
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
	const TURN_MS = 700;
	// Space between the sticky nav and the pinned page.
	const GAP = 10;

	type Turn = { from: number; to: number; dir: 'next' | 'prev' };
	type Role = 'active' | 'under' | 'turn-out' | 'turn-in' | 'hidden' | 'listed';

	// "pinned": the book sticks to the screen and scrolling turns its pages.
	// "list": the screen is too short to show a whole page, so pages are stacked
	// and each one flips in as it scrolls into view.
	let mode = $state<'pinned' | 'list'>(lastMode);
	let current = $state(0);
	let turn = $state<Turn | null>(null);
	let seen = $state<boolean[]>([]);
	let trackHeight = $state(lastTrackHeight);
	let pinTop = $state(70);

	let track: HTMLElement;
	let pin: HTMLElement;
	let head: HTMLElement;
	let leaves: HTMLElement[] = [];
	let target = 0;
	let step = 600;
	let inView = false;
	let frame = 0;
	let turnTimer: ReturnType<typeof setTimeout> | undefined;
	let resizeTimer: ReturnType<typeof setTimeout> | undefined;
	let alive = true;
	// The first sync jumps straight to the page under the scroll position.
	let synced = false;

	const total = $derived(chapters.length);
	const pad = (n: number) => String(n).padStart(2, '0');
	const reduceMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;

	function role(i: number): Role {
		if (mode === 'list') return 'listed';
		if (!turn) return i === current ? 'active' : 'hidden';
		const top = turn.dir === 'next' ? turn.from : turn.to;
		const below = turn.dir === 'next' ? turn.to : turn.from;
		if (i === top) return turn.dir === 'next' ? 'turn-out' : 'turn-in';
		if (i === below) return 'under';
		return 'hidden';
	}

	// Pinned mode: turn one page (or jump several) toward wherever scrolling points.
	function drive() {
		if (turn || target === current) return;
		const to = target;
		if (reduceMotion()) {
			current = to;
			return;
		}
		turn = { from: current, to, dir: to > current ? 'next' : 'prev' };
		turnTimer = setTimeout(() => {
			current = to;
			turn = null;
			drive();
		}, TURN_MS);
	}

	function onScroll() {
		if (mode !== 'pinned' || frame) return;
		frame = requestAnimationFrame(() => {
			frame = 0;
			const scrolled = pinTop - track.getBoundingClientRect().top;
			target = Math.max(0, Math.min(total - 1, Math.round(scrolled / step)));
			if (!synced) {
				synced = true;
				current = target;
				return;
			}
			drive();
		});
	}

	/** Scroll to chapter `i`; in pinned mode that is what turns the page. */
	function goTo(i: number) {
		if (i < 0 || i >= total) return;
		const behavior = reduceMotion() ? 'auto' : 'smooth';
		if (mode === 'pinned') {
			const top = window.scrollY + track.getBoundingClientRect().top - pinTop + i * step;
			window.scrollTo({ top: Math.max(0, top), behavior });
		} else {
			leaves[i].scrollIntoView({ behavior, block: 'start' });
		}
	}

	async function measure() {
		// may still be pending (fonts, resize) after an arc switch unmounted this reader
		if (!alive) return;
		const nav = document.querySelector('nav');
		pinTop = Math.round((nav?.getBoundingClientRect().height ?? 60) + GAP);
		const tallest = Math.max(...leaves.map((leaf) => leaf.offsetHeight));
		// the contents row itself; list mode adds toolbar padding around it
		const contents = head.querySelector<HTMLElement>('.contents');
		const need = (contents?.offsetHeight ?? head.offsetHeight) + 14 + tallest + GAP;
		const fits = need <= window.innerHeight - pinTop && window.innerWidth >= 700;
		mode = lastMode = fits ? 'pinned' : 'list';
		step = Math.round(window.innerHeight * 0.65);
		await tick();
		if (alive && mode === 'pinned') {
			trackHeight = lastTrackHeight = pin.offsetHeight + (total - 1) * step;
			onScroll();
		}
	}

	function onResize() {
		clearTimeout(resizeTimer);
		resizeTimer = setTimeout(measure, 150);
	}

	// Manga reads right to left, so ← is the next page.
	function onKeydown(event: KeyboardEvent) {
		if (mode !== 'pinned' || !inView || event.altKey || event.ctrlKey || event.metaKey) return;
		if ((event.target as HTMLElement).closest('input, textarea, select, [contenteditable]')) return;
		if (event.key === 'ArrowLeft') goTo(current + 1);
		else if (event.key === 'ArrowRight') goTo(current - 1);
		else return;
		event.preventDefault();
	}

	onMount(() => {
		measure();
		document.fonts?.ready.then(measure);

		const viewIO = new IntersectionObserver(([entry]) => (inView = entry.isIntersecting), {
			threshold: 0.3
		});
		viewIO.observe(track);

		// List mode: flip each page in once, and track which one is mid-screen.
		const seenIO = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) continue;
					const i = Number((entry.target as HTMLElement).dataset.index);
					seen[i] = true;
					seenIO.unobserve(entry.target);
				}
			},
			{ threshold: 0.15 }
		);
		const currentIO = new IntersectionObserver(
			(entries) => {
				if (mode !== 'list') return;
				for (const entry of entries) {
					if (entry.isIntersecting) current = Number((entry.target as HTMLElement).dataset.index);
				}
			},
			{ rootMargin: '-45% 0px -45% 0px' }
		);
		for (const leaf of leaves) {
			seenIO.observe(leaf);
			currentIO.observe(leaf);
		}

		return () => {
			viewIO.disconnect();
			seenIO.disconnect();
			currentIO.disconnect();
		};
	});

	onDestroy(() => {
		alive = false;
		clearTimeout(turnTimer);
		clearTimeout(resizeTimer);
		if (frame) cancelAnimationFrame(frame);
	});
</script>

<svelte:window onscroll={onScroll} onresize={onResize} onkeydown={onKeydown} />

<div class="reader {mode}" role="region" aria-roledescription="carousel" aria-label="Chapters">
	<div class="track" bind:this={track} style:height={mode === 'pinned' ? `${trackHeight}px` : null}>
		<div class="pin" bind:this={pin} style:--pin-top="{pinTop}px">
			<div class="head" bind:this={head}>
				<nav class="contents" aria-label="Table of contents">
					<span class="contents-label kicker"><span lang="ja">目次</span> Contents</span>
					<ol>
						{#each chapters as chapter, i (chapter.id)}
							<li>
								<button
									type="button"
									class:on={i === (turn?.to ?? current)}
									aria-current={i === current ? 'page' : undefined}
									onclick={() => goTo(i)}
								>
									<span class="no">{pad(i + 1)}</span>
									<Redactable text={chapter.short ?? chapter.title} />
								</button>
							</li>
						{/each}
					</ol>
				</nav>
				<p class="progress">
					<span class="count"><span class="display">{pad((turn?.to ?? current) + 1)}</span> / {pad(total)}</span>
					<span class="hint lettering">
						{mode === 'pinned' ? 'scroll ↓ to turn the page' : 'scroll ↓ to read on'}
					</span>
				</p>
			</div>

			<div class="stage">
				{#each chapters as chapter, i (chapter.id)}
					{@const r = role(i)}
					<div
						class="leaf {r}"
						class:seen={seen[i]}
						bind:this={leaves[i]}
						data-index={i}
						role="group"
						aria-roledescription="slide"
						aria-label="Chapter {i + 1} of {total}: {plainText(chapter.title)}"
						aria-hidden={r === 'hidden'}
						inert={mode === 'pinned' && r !== 'active'}
					>
						<div class="front">
							<ChapterPage
								{chapter}
								index={i}
								{total}
								{arcId}
								onturn={i < total - 1 && (r === 'listed' || r === 'active') ? () => goTo(i + 1) : undefined}
							/>
						</div>
						<div class="back" aria-hidden="true"></div>
					</div>
				{/each}
				{#if turn}
					<span class="sfx pera" lang="ja" aria-hidden="true">ペラッ</span>
				{/if}
			</div>
		</div>
	</div>

	<p class="sr-only" aria-live="polite">
		Chapter {current + 1} of {total}: {plainText(chapters[current].title)}
	</p>
</div>

<style>
	.track {
		position: relative;
	}

	.pinned .pin {
		position: sticky;
		top: var(--pin-top);
	}

	/* list: the contents row follows along as a small toolbar */
	.list .head {
		position: sticky;
		top: calc(var(--pin-top) - 10px);
		z-index: 10;
		padding: 8px 0 6px;
		background: var(--paper);
		box-shadow: 0 6px 6px -6px rgba(20, 20, 20, 0.25);
	}

	/* ---- contents + progress ---- */
	/* one row at every width, so the pinned book's height is predictable;
	   the tabs scroll sideways when they don't fit */
	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 0.8rem 1.2rem;
		margin-bottom: 14px;
	}

	.contents {
		flex: 1 1 auto;
		display: flex;
		align-items: center;
		gap: 0.6rem 1rem;
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
		padding: 4px 6px 6px 2px;
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

	.progress {
		flex: none;
		display: flex;
		align-items: baseline;
		gap: 0.7rem;
	}

	.count {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		color: var(--ink-faint);
		white-space: nowrap;
	}

	.count .display {
		font-size: 1.4rem;
		color: var(--ink);
	}

	.hint {
		font-size: 0.78rem;
		color: var(--red);
		white-space: nowrap;
	}

	/* ---- the book ---- */
	.stage {
		position: relative;
		perspective: 2600px;
	}

	.leaf {
		position: relative;
		transform-style: preserve-3d;
		transform-origin: right center;
		scroll-margin-top: 80px;
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
		inset: 2.1rem 0 0;
		background-color: var(--paper);
		background-image: radial-gradient(rgba(20, 20, 20, 0.14) 26%, transparent 28%);
		background-size: 5px 5px;
		border: var(--line) solid var(--ink);
		transform: rotateY(180deg);
		backface-visibility: hidden;
		-webkit-backface-visibility: hidden;
	}

	/* pinned: pages share one cell, so the book keeps its tallest page's height */
	.pinned .stage {
		display: grid;
	}

	.pinned .leaf {
		grid-area: 1 / 1;
	}

	.pinned .leaf.hidden {
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

	.turn-out .back,
	.turn-in .back,
	.list .back {
		display: block;
	}

	.turn-out {
		animation: turn-out 0.7s cubic-bezier(0.45, 0.05, 0.3, 1) forwards;
	}

	.turn-in {
		animation: turn-in 0.7s cubic-bezier(0.45, 0.05, 0.3, 1) forwards;
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
		animation: shade-in 0.7s ease-in forwards;
	}

	.turn-in .front::after {
		background: linear-gradient(to right, rgba(20, 20, 20, 0.05), rgba(20, 20, 20, 0.35));
		animation: shade-out 0.7s ease-out forwards;
	}

	.under .front::after {
		background: linear-gradient(to left, rgba(20, 20, 20, 0.35), transparent 70%);
		animation: shade-out 0.7s ease-out forwards;
	}

	/* list: stacked pages, each swinging in from the spine as it arrives */
	.list .leaf + .leaf {
		margin-top: clamp(2rem, 6vw, 3.5rem);
	}

	:global(.js) .list .leaf:not(.seen) {
		opacity: 0;
	}

	.list .leaf.seen {
		animation: flip-in 0.9s cubic-bezier(0.2, 0.7, 0.2, 1) both;
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

	@keyframes flip-in {
		from {
			opacity: 0;
			transform: perspective(2200px) rotateY(120deg);
		}
		30% {
			opacity: 1;
		}
		to {
			opacity: 1;
			transform: perspective(2200px) rotateY(0deg);
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
		animation: pera 0.7s var(--ease-snap) forwards;
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

	@media (max-width: 1100px) {
		.hint {
			display: none;
		}
	}

	@media (max-width: 560px) {
		.contents-label {
			display: none;
		}
	}
</style>
