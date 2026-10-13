<script lang="ts">
	import { base } from '$app/paths';
	import type { ArcId, Chapter } from '$lib/data/profile';
	import Hanko from './Hanko.svelte';
	import Redactable from './Redactable.svelte';
	import ChapterArt from './ChapterArt.svelte';

	interface Props {
		chapter: Chapter;
		index: number;
		total: number;
		arcId: ArcId;
		/** When set, a folded corner invites turning to the next page. */
		onturn?: () => void;
	}

	let { chapter, index, total, arcId, onturn }: Props = $props();

	/** The overview shows this many tags; the rest are on the chapter's own page. */
	const TAG_LIMIT = 5;

	const points = $derived(chapter.highlights[arcId] ?? chapter.highlights.default);
	const tags = $derived(chapter.tags.slice(0, TAG_LIMIT));
	const moreTags = $derived(chapter.tags.slice(TAG_LIMIT));
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

<!-- The overview of a chapter, laid out like an entry in a manga encyclopedia: art on the left, a short
     entry on the right, and a button to the chapter's own page for the rest. -->
<article class="chapter" class:classified={chapter.classified} aria-labelledby="ch-{chapter.id}">
	<div class="tab kicker">Chapter {num}</div>
	<div class="sheet" style="box-shadow: {stack}">
		<div class="art">
			<ChapterArt {chapter} {num} heading="h3" headingId="ch-{chapter.id}" />
		</div>

		<header class="head">
			{#if chapter.classified}
				<Hanko class="seal" top="Case" main="機密" bottom="NDA" />
			{/if}
			<p class="meta kicker">● {chapter.where} · {chapter.when}</p>
			<p class="catch display">{chapter.catchphrase}</p>
			<p class="caption">↓ {chapter.tagline}.</p>
		</header>

		<div class="text">
			<ul>
				{#each points as point (point)}
					<li><Redactable text={point} /></li>
				{/each}
			</ul>
		</div>

		<footer class="foot">
			<ul class="tags" aria-label="Stack">
				{#each tags as tag (tag)}<li class="chip">{tag}</li>{/each}
				{#if moreTags.length}
					<li class="chip more" title={moreTags.join(', ')}>
						+{moreTags.length}<span class="sr-only"> more: {moreTags.join(', ')}</span>
					</li>
				{/if}
			</ul>
			<a class="btn ink read" href="{base}/chapters/{chapter.id}/?arc={arcId}">Read the full chapter →</a>
		</footer>

		{#if onturn}
			<button type="button" class="dogear" onclick={onturn} aria-label="Turn to chapter {index + 2}">
				<svg viewBox="0 0 56 56" aria-hidden="true">
					<path class="gap" d="M0 0 L0 56 L56 56 Z" />
					<path class="flap" d="M0 0 L56 0 L56 56 Z" />
					<text class="flap-text" x="37" y="22" transform="rotate(45 37 22)" lang="ja">めくる</text>
				</svg>
			</button>
		{:else if index === total - 1}
			<span class="fin" lang="ja" title="Last chapter">完</span>
		{/if}
	</div>
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
		align-self: flex-start;
		position: relative;
		z-index: 1;
		margin-left: 18px;
		padding: 0.45rem 1.6rem 0.35rem 0.9rem;
		background: var(--ink);
		color: var(--white);
		clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%);
	}

	.sheet {
		position: relative;
		flex: 1;
		display: grid;
		gap: var(--gutter);
		grid-template-columns: minmax(0, 1fr);
		grid-template-areas: 'art' 'head' 'text' 'foot';
		padding: var(--gutter);
		background: var(--white);
		border: var(--line) solid var(--ink);
	}

	/* ---- the entry ---- */
	.head {
		grid-area: head;
		position: relative;
		padding: 0.2rem 0.3rem 0;
	}

	.art {
		grid-area: art;
		--art-min: 340px;
	}

	.classified .head {
		padding-right: 5.2rem;
	}

	.head :global(.seal) {
		position: absolute;
		top: 0;
		right: 4px;
		font-size: 0.95rem;
		transform: rotate(9deg);
	}

	.meta {
		margin-bottom: 0.7rem;
		color: var(--ink-faint);
	}

	.catch {
		font-size: clamp(1.4rem, 2.8vw, 2.2rem);
		line-height: 1.1;
	}

	.caption {
		margin-top: 0.6rem;
		font-size: 0.9rem;
		line-height: 1.45;
		color: var(--ink-soft);
	}

	.text {
		grid-area: text;
		padding: 0 0.3rem;
	}

	.text ul {
		display: grid;
		gap: 0.65rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.text li {
		position: relative;
		padding-left: 1.4rem;
		font-size: 0.93rem;
		line-height: 1.55;
	}

	.text li::before {
		content: '';
		position: absolute;
		left: 0;
		top: 0.5em;
		width: 0.7rem;
		height: 0.7rem;
		background: var(--red);
		clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
	}

	/* ---- footer ---- */
	.foot {
		grid-area: foot;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 0.8rem 1rem;
		min-height: 2.6rem;
		/* the folded corner (or 完 on the last page) sits to the left */
		padding: 0.2rem 0.2rem 0.1rem 3.6rem;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.more {
		border-style: dashed;
		color: var(--ink-faint);
		cursor: help;
	}

	.read {
		font-size: 0.72rem;
		padding: 0.6em 0.9em;
	}

	/* folded bottom-left corner: where you'd lift a manga page */
	.dogear {
		position: absolute;
		left: calc(var(--line) * -1);
		bottom: calc(var(--line) * -1);
		z-index: 3;
		padding: 0;
		border: 0;
		background: none;
		cursor: pointer;
	}

	.dogear svg {
		display: block;
		width: 56px;
		height: 56px;
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

	.flap-text {
		fill: var(--red);
		font-family: var(--font-display);
		font-size: 9px;
		text-anchor: middle;
	}

	.dogear:hover svg,
	.dogear:focus-visible svg {
		transform: scale(1.25);
	}

	.fin {
		position: absolute;
		left: var(--gutter);
		bottom: var(--gutter);
		display: grid;
		place-items: center;
		width: 2.4rem;
		height: 2.4rem;
		border: 2px solid var(--red);
		border-radius: 50%;
		color: var(--red);
		font-family: var(--font-display);
		font-size: 1.1rem;
		transform: rotate(-10deg);
	}

	@media (min-width: 760px) {
		.sheet {
			grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
			grid-template-rows: auto 1fr auto;
			grid-template-areas: 'art head' 'art text' 'foot foot';
		}

		.art {
			--art-min: 420px;
		}
	}
</style>
