<script lang="ts">
	import type { ArcId, Chapter } from '$lib/data/profile';
	import FocusLines from './FocusLines.svelte';
	import Hanko from './Hanko.svelte';
	import Redactable from './Redactable.svelte';
	import ShoutBubble from './ShoutBubble.svelte';
	import SpeechBubble from './SpeechBubble.svelte';
	import Warehouse from '$lib/illustrations/Warehouse.svelte';
	import Pos from '$lib/illustrations/Pos.svelte';
	import Trading from '$lib/illustrations/Trading.svelte';
	import Fitting from '$lib/illustrations/Fitting.svelte';
	import CasePhotos from '$lib/illustrations/CasePhotos.svelte';
	import CaseHealth from '$lib/illustrations/CaseHealth.svelte';

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
		'case-photos': CasePhotos,
		'case-health': CaseHealth
	};
	const Illo = $derived(illustrations[chapter.illustration]);
	const points = $derived(chapter.points[arcId] ?? chapter.points.default);
	const shout = $derived(chapter.shout[arcId] ?? chapter.shout.default);
	const num = $derived(String(index + 1).padStart(2, '0'));
	const params = $derived([
		{ k: 'Role', v: chapter.role },
		{ k: 'Reach', v: chapter.reach },
		{ k: 'Period', v: chapter.when }
	]);

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

<!-- Laid out like an entry in a manga encyclopedia: big art on the left, the entry on the right. -->
<article class="chapter" class:classified={chapter.classified} aria-labelledby="ch-{chapter.id}">
	<div class="tab kicker">Chapter {num}</div>
	<div class="sheet" style="box-shadow: {stack}">
		<div class="art panel">
			<div class="art-tone" aria-hidden="true"></div>
			<p class="entry">
				<span class="entry-no display">{num}</span>
				<span class="entry-kana" lang="ja"><Redactable text={chapter.kana} /></span>
			</p>
			<div class="art-bubble">
				<SpeechBubble tail="bl">{chapter.quote}</SpeechBubble>
			</div>
			<div class="illo"><Illo /></div>
			<h3 id="ch-{chapter.id}" class="art-title"><Redactable text={chapter.title} /></h3>
		</div>

		<header class="head">
			{#if chapter.classified}
				<Hanko class="seal" top="Case" main="機密" bottom="NDA" />
			{/if}
			<p class="catch display">{chapter.catchphrase}</p>
			<p class="caption">↓ {chapter.tagline}. {chapter.where}.</p>
		</header>

		<div class="row">
			<div class="action panel">
				<FocusLines seed={index * 17 + 3} rays={70} innerX={0.62} innerY={0.56} />
				<ShoutBubble class="shout" seed={index * 7 + 2} spikes={20}>
					<span class="shout-text">{shout}</span>
				</ShoutBubble>
				<span class="sfx action-sfx" lang="ja" aria-hidden="true">ドドド</span>
			</div>
			<dl class="params panel">
				<div class="params-head kicker"><span lang="ja">能力</span> Parameters</div>
				{#each params as param (param.k)}
					<div class="param">
						<dt class="kicker">{param.k}</dt>
						<dd><Redactable text={param.v} /></dd>
					</div>
				{/each}
			</dl>
		</div>

		<div class="text">
			<ul>
				{#each points as point (point)}
					<li><Redactable text={point} /></li>
				{/each}
			</ul>
		</div>

		<footer class="foot">
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
		grid-template-areas: 'art' 'head' 'row' 'text' 'foot';
		padding: var(--gutter);
		background: var(--white);
		border: var(--line) solid var(--ink);
	}

	/* ---- the art panel ---- */
	.art {
		grid-area: art;
		container-type: inline-size;
		display: flex;
		flex-direction: column;
		min-height: 340px;
		background: var(--white);
	}

	.art-tone {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(var(--ink) 30%, transparent 32%);
		background-size: 6px 6px;
		-webkit-mask-image: radial-gradient(ellipse at 50% 46%, transparent 32%, #000 88%);
		mask-image: radial-gradient(ellipse at 50% 46%, transparent 32%, #000 88%);
		opacity: 0.6;
	}

	.classified .art-tone {
		opacity: 0.85;
	}

	.entry {
		position: absolute;
		top: 12px;
		left: 12px;
		z-index: 2;
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		padding: 0.2rem 0.65rem 0.3rem;
		background: var(--white);
		border: var(--line-thin) solid var(--ink);
	}

	.entry-no {
		font-size: 1.7rem;
		line-height: 1;
		color: var(--red);
	}

	.entry-kana {
		font-family: var(--font-display);
		font-size: 1rem;
	}

	.art-bubble {
		position: absolute;
		top: 3.9rem;
		right: 10px;
		z-index: 2;
		max-width: 56%;
	}

	.art-bubble :global(.body) {
		font-size: 0.8rem;
		padding: 0.9em 1.2em;
	}

	.illo {
		position: relative;
		z-index: 1;
		flex: 1;
		display: grid;
		place-items: center;
		padding: 6.2rem 0.6rem 3.4rem;
	}

	.illo :global(svg) {
		width: min(100%, 360px);
		height: auto;
	}

	/* outlined name across the bottom, encyclopedia style */
	.art-title {
		position: absolute;
		left: 12px;
		right: 8px;
		bottom: 4px;
		z-index: 2;
		margin: 0;
		font-family: var(--font-display);
		font-weight: 400;
		font-size: min(4rem, 15cqi);
		line-height: 0.95;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		color: var(--white);
		-webkit-text-stroke: 7px var(--ink);
		paint-order: stroke fill;
		text-shadow: 4px 4px 0 var(--ink);
		transform: rotate(-3deg);
		transform-origin: left bottom;
	}

	/* ---- the entry ---- */
	.head {
		grid-area: head;
		position: relative;
		padding: 0.2rem 0.3rem 0;
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

	.catch {
		font-size: clamp(1.3rem, 2.3vw, 1.85rem);
		line-height: 1.12;
	}

	.caption {
		margin-top: 0.5rem;
		font-size: 0.84rem;
		line-height: 1.45;
		color: var(--ink-soft);
	}

	.row {
		grid-area: row;
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: var(--gutter);
	}

	.action {
		min-height: 140px;
		display: grid;
		place-items: center;
		background: var(--white);
	}

	.action :global(.shout) {
		position: relative;
		z-index: 1;
		transform: rotate(-4deg);
	}

	.shout-text {
		display: block;
		font-size: clamp(0.85rem, 1.4vw, 1rem);
		max-width: 10ch;
	}

	.action-sfx {
		position: absolute;
		left: 8px;
		bottom: 6px;
		z-index: 1;
		font-size: 1.5rem;
		transform: rotate(-10deg);
	}

	.params {
		display: grid;
		align-content: start;
		gap: 0.4rem;
		margin: 0;
		padding: 0.7rem 0.9rem 0.8rem;
	}

	.params-head {
		padding-bottom: 0.35rem;
		margin-bottom: 0.15rem;
		border-bottom: var(--line-thin) solid var(--ink);
	}

	.params-head span {
		color: var(--red);
		font-family: var(--font-display);
		letter-spacing: 0.1em;
	}

	.param {
		display: grid;
		grid-template-columns: 4.4rem minmax(0, 1fr);
		gap: 0.5rem;
		align-items: baseline;
	}

	dt {
		color: var(--ink-faint);
	}

	dd {
		margin: 0;
		font-size: 0.88rem;
		font-weight: 700;
		line-height: 1.35;
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

	@media (min-width: 480px) {
		.row {
			grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
		}
	}

	@media (min-width: 760px) {
		.sheet {
			grid-template-columns: minmax(0, 0.92fr) minmax(0, 1.08fr);
			grid-template-rows: auto auto 1fr auto;
			grid-template-areas: 'art head' 'art row' 'art text' 'foot foot';
		}

		.art {
			min-height: 420px;
		}
	}
</style>
