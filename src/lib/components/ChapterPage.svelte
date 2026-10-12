<script lang="ts">
	import type { ArcId, Chapter } from '$lib/data/profile';
	import ShoutBubble from './ShoutBubble.svelte';
	import Hanko from './Hanko.svelte';
	import Redactable from './Redactable.svelte';
	import Warehouse from '$lib/illustrations/Warehouse.svelte';
	import Pos from '$lib/illustrations/Pos.svelte';
	import Trading from '$lib/illustrations/Trading.svelte';
	import Fitting from '$lib/illustrations/Fitting.svelte';
	import Classified from '$lib/illustrations/Classified.svelte';

	interface Props {
		chapter: Chapter;
		index: number;
		total: number;
		arcId: ArcId;
		/** When set, a folded corner invites turning to the next page. */
		onturn?: () => void;
	}

	let { chapter, index, total, arcId, onturn }: Props = $props();

	const illustrations = {
		warehouse: Warehouse,
		pos: Pos,
		trading: Trading,
		fitting: Fitting,
		classified: Classified
	};
	const Illo = $derived(illustrations[chapter.illustration]);
	const points = $derived(chapter.points[arcId] ?? chapter.points.default);
	const shout = $derived(chapter.shout[arcId] ?? chapter.shout.default);
	const num = $derived(String(index + 1).padStart(2, '0'));

	// The unread pages behind this one, drawn as a stack that thins out as you read.
	const stack = $derived.by(() => {
		const layers = Math.min(total - index - 1, 4);
		if (layers <= 0) return '6px 6px 0 var(--ink)';
		const out: string[] = [];
		for (let k = 1; k <= layers; k++) {
			const o = k * 5;
			out.push(`${o}px ${o}px 0 0 var(--white)`, `${o}px ${o}px 0 2px var(--ink)`);
		}
		return out.join(', ');
	});
</script>

<article class="chapter" class:classified={chapter.classified} aria-labelledby="ch-{chapter.id}">
	<div class="tab kicker">Chapter {num}</div>
	<div class="sheet" style="box-shadow: {stack}">
		<header class="p-title panel">
			{#if chapter.classified}
				<Hanko class="seal" top="Case" main="機密" bottom="NDA" />
			{/if}
			<p class="meta kicker">{chapter.where} · {chapter.when}</p>
			<h3 id="ch-{chapter.id}" class="display"><Redactable text={chapter.title} /></h3>
			<p class="tagline">{chapter.tagline}</p>
			{#if chapter.rating}
				<p class="rating" aria-label="Rated {chapter.rating} out of 5">★ {chapter.rating}<span>/5</span></p>
			{/if}
		</header>

		<div class="p-illo panel">
			<div class="speed" aria-hidden="true"></div>
			<div class="illo"><Illo /></div>
			<ShoutBubble class="shout" seed={index * 7 + 2} spikes={20}>
				<span class="shout-text">{shout}</span>
			</ShoutBubble>
		</div>

		<div class="p-text panel">
			<ul>
				{#each points as point (point)}
					<li><Redactable text={point} /></li>
				{/each}
			</ul>
		</div>

		<footer class="p-foot">
			<ul class="tags" aria-label="Stack">
				{#each chapter.tags as tag (tag)}<li class="chip">{tag}</li>{/each}
			</ul>
			{#if chapter.links.length}
				<div class="links">
					{#each chapter.links as link (link.href)}
						<a class="btn" href={link.href} target="_blank" rel="noopener">{link.label} ↗</a>
					{/each}
				</div>
			{:else if chapter.note}
				<span class="private lettering">{chapter.note}</span>
			{/if}
		</footer>

		{#if onturn}
			<button type="button" class="dogear" onclick={onturn} aria-label="Turn to chapter {index + 2}">
				<svg viewBox="0 0 56 56" aria-hidden="true">
					<path class="gap" d="M0 0 L0 56 L56 56 Z" />
					<path class="flap" d="M0 0 L56 0 L56 56 Z" />
				</svg>
				<span class="turn-label lettering"><span lang="ja">めくる</span> turn the page</span>
			</button>
		{:else if index === total - 1}
			<p class="end lettering">last chapter · side stories below ↓</p>
		{/if}
	</div>
	<p class="folio kicker" aria-hidden="true">— {num} / {String(total).padStart(2, '0')} —</p>
</article>

<style>
	.chapter {
		position: relative;
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	.tab {
		display: inline-block;
		position: relative;
		z-index: 1;
		margin-left: 18px;
		padding: 0.45rem 0.9rem 0.35rem;
		background: var(--ink);
		color: var(--white);
		clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%);
		padding-right: 1.6rem;
	}

	.sheet {
		display: grid;
		gap: var(--gutter);
		grid-template-columns: 1fr;
		grid-template-areas: 'title' 'illo' 'text' 'foot';
		grid-template-rows: auto auto 1fr auto;
		flex: 1;
		position: relative;
		padding: var(--gutter);
		/* room for the folded corner */
		padding-bottom: calc(var(--gutter) + 2.8rem);
		background: var(--white);
		border: var(--line) solid var(--ink);
	}

	.classified .p-title {
		background-image: repeating-linear-gradient(-45deg, transparent 0 9px, rgba(20, 20, 20, 0.05) 9px 10px);
	}

	.p-title :global(.seal) {
		position: absolute;
		top: 14px;
		right: 14px;
		font-size: 0.95rem;
		transform: rotate(9deg);
	}

	.p-title {
		grid-area: title;
		padding: clamp(16px, 2.4vw, 26px);
		padding-right: 5.5rem;
	}

	.meta {
		color: var(--ink-faint);
	}

	h3 {
		font-size: clamp(2.4rem, 6vw, 4.4rem);
		margin-top: 0.4rem;
	}

	.tagline {
		margin-top: 0.4rem;
		font-family: var(--font-letter);
		font-weight: 700;
		font-size: clamp(1rem, 1.6vw, 1.2rem);
	}

	.rating {
		display: inline-block;
		margin-top: 0.8rem;
		padding: 0.1rem 0.55rem;
		background: var(--ink);
		color: var(--white);
		font-family: var(--font-display);
		font-size: 0.95rem;
	}

	.rating span {
		opacity: 0.6;
		font-size: 0.75em;
	}

	.p-illo {
		grid-area: illo;
		min-height: 260px;
		display: grid;
		place-items: center;
		background: var(--paper);
	}

	.speed {
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			90deg,
			transparent 0 18px,
			rgba(20, 20, 20, 0.08) 18px 19px,
			transparent 19px 31px,
			rgba(20, 20, 20, 0.05) 31px 33px
		);
	}

	.illo {
		position: relative;
		width: min(100%, 380px);
		padding: 2.6rem 1rem 1rem;
	}

	.p-illo :global(.shout) {
		position: absolute;
		top: 6px;
		right: 6px;
		transform: rotate(5deg);
		z-index: 1;
	}

	.shout-text {
		display: block;
		font-size: clamp(0.85rem, 1.5vw, 1.05rem);
		max-width: 10ch;
	}

	.p-text {
		grid-area: text;
		padding: clamp(16px, 2.4vw, 24px);
	}

	.p-text ul {
		margin: 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: 0.8rem;
	}

	.p-text li {
		position: relative;
		padding-left: 1.5rem;
		font-size: 0.98rem;
		line-height: 1.55;
	}

	.p-text li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.5em;
		width: 0.7rem;
		height: 0.7rem;
		background: var(--red);
		clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
	}

	.p-foot {
		grid-area: foot;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.8rem 1rem;
		padding: 0.2rem 0.2rem 0.1rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.6rem;
	}

	.links .btn {
		font-size: 0.72rem;
		padding: 0.5em 0.8em;
		box-shadow: 3px 3px 0 var(--ink);
	}

	.private {
		font-size: 0.85rem;
		color: var(--ink-faint);
	}

	.classified .private {
		color: var(--red);
	}

	/* folded bottom-left corner: where you'd lift a manga page */
	.dogear {
		position: absolute;
		left: calc(var(--line) * -1);
		bottom: calc(var(--line) * -1);
		z-index: 3;
		display: flex;
		align-items: flex-end;
		gap: 0.4rem;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
	}

	.dogear svg {
		width: 52px;
		height: 52px;
		overflow: visible;
		transform-origin: bottom left;
		transition: transform 0.25s var(--ease-snap);
	}

	.gap {
		fill: var(--paper);
	}

	.flap {
		fill: var(--paper-deep);
		stroke: var(--ink);
		stroke-width: 3;
		stroke-linejoin: round;
		filter: drop-shadow(-3px 3px 0 rgba(20, 20, 20, 0.25));
	}

	.turn-label {
		margin-bottom: 8px;
		font-size: 0.78rem;
		color: var(--red);
		white-space: nowrap;
		opacity: 0.85;
		transition:
			opacity 0.2s,
			transform 0.25s var(--ease-snap);
	}

	.dogear:hover svg,
	.dogear:focus-visible svg {
		transform: scale(1.3);
	}

	.dogear:hover .turn-label,
	.dogear:focus-visible .turn-label {
		opacity: 1;
		transform: translateX(16px);
	}

	.end {
		position: absolute;
		left: var(--gutter);
		bottom: 0.9rem;
		font-size: 0.8rem;
		color: var(--ink-faint);
	}

	.folio {
		margin-top: 0.7rem;
		text-align: center;
		color: var(--ink-faint);
	}

	@media (min-width: 760px) {
		.sheet {
			grid-template-columns: 1.1fr 1fr;
			grid-template-rows: auto 1fr auto;
			grid-template-areas: 'title illo' 'text illo' 'foot foot';
			align-content: stretch;
		}

		.p-illo {
			min-height: 320px;
		}
	}
</style>
