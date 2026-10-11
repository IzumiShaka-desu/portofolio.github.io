<script lang="ts">
	import type { ArcId, Chapter } from '$lib/data/profile';
	import ShoutBubble from './ShoutBubble.svelte';
	import Warehouse from '$lib/illustrations/Warehouse.svelte';
	import Pos from '$lib/illustrations/Pos.svelte';
	import Trading from '$lib/illustrations/Trading.svelte';
	import Fitting from '$lib/illustrations/Fitting.svelte';

	interface Props {
		chapter: Chapter;
		index: number;
		total: number;
		arcId: ArcId;
	}

	let { chapter, index, total, arcId }: Props = $props();

	const illustrations = { warehouse: Warehouse, pos: Pos, trading: Trading, fitting: Fitting };
	const Illo = $derived(illustrations[chapter.illustration]);
	const points = $derived(chapter.points[arcId] ?? chapter.points.default);
	const shout = $derived(chapter.shout[arcId] ?? chapter.shout.default);
	const num = $derived(String(index + 1).padStart(2, '0'));
</script>

<article class="chapter" style="--i: {index}; --tilt: {index % 2 ? 0.6 : -0.5}deg" aria-labelledby="ch-{chapter.id}">
	<div class="tab kicker">Chapter {num}</div>
	<div class="sheet">
		<header class="p-title panel">
			<p class="meta kicker">{chapter.where} · {chapter.when}</p>
			<h3 id="ch-{chapter.id}" class="display">{chapter.title}</h3>
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
					<li>{point}</li>
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
			{:else}
				<span class="private lettering">internal product: no public link</span>
			{/if}
		</footer>
	</div>
	<p class="folio kicker" aria-hidden="true">— {num} / {String(total).padStart(2, '0')} —</p>
</article>

<style>
	.chapter {
		position: relative;
		margin-bottom: clamp(28px, 5vw, 56px);
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
		padding: var(--gutter);
		background: var(--white);
		border: var(--line) solid var(--ink);
		box-shadow: 8px 8px 0 var(--ink);
	}

	.p-title {
		grid-area: title;
		padding: clamp(16px, 2.4vw, 26px);
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
		}

		.p-illo {
			min-height: 320px;
		}
	}

	/* Stack the pages like a pile of manga sheets when there's room to read each one. */
	@media (min-width: 1000px) and (min-height: 760px) {
		.chapter {
			position: sticky;
			top: calc(76px + var(--i) * 16px);
			margin-bottom: 18vh;
			transform: rotate(var(--tilt));
		}

		.chapter:last-child {
			margin-bottom: 0;
		}
	}
</style>
