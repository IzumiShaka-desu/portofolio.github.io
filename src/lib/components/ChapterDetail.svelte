<script lang="ts">
	import { base } from '$app/paths';
	import { arc } from '$lib/arc.svelte';
	import { chapters, type Chapter } from '$lib/data/profile';
	import { reveal } from '$lib/actions';
	import ChapterArt from './ChapterArt.svelte';
	import ChapterParams from './ChapterParams.svelte';
	import FocusLines from './FocusLines.svelte';
	import Hanko from './Hanko.svelte';
	import Portrait from './Portrait.svelte';
	import Redactable from './Redactable.svelte';
	import ShoutBubble from './ShoutBubble.svelte';
	import SpeechBubble from './SpeechBubble.svelte';

	interface Props {
		chapter: Chapter;
	}

	let { chapter }: Props = $props();

	const pad = (n: number) => String(n).padStart(2, '0');

	// Numbering and "next chapter" follow the current arc's order.
	const order = $derived(
		arc.data.chapters.includes(chapter.id) ? arc.data.chapters : Object.keys(chapters)
	);
	const index = $derived(order.indexOf(chapter.id));
	const num = $derived(pad(index + 1));
	const nextIndex = $derived((index + 1) % order.length);
	const next = $derived(chapters[order[nextIndex]]);
	const media = $derived(chapter.classified ? [] : (chapter.media ?? []));
	const did = $derived(chapter.whatIDid);
</script>

<article class="detail" class:classified={chapter.classified} id="chapter" aria-labelledby="chapter-title">
	<div class="wrap">
		<div class="top">
			<a class="back lettering" href="{base}/?arc={arc.current}#chapters">← All chapters</a>
			<p class="kicker where-in">
				Chapter {num} of {pad(order.length)} · {arc.data.label} arc
			</p>
		</div>

		<!-- title spread -->
		<header class="spread">
			<div class="tab kicker">Chapter {num}</div>
			<div class="sheet">
				<div class="art">
					<ChapterArt {chapter} {num} heading="h1" headingId="chapter-title" />
				</div>
				<div class="head">
					{#if chapter.classified}
						<Hanko class="seal" top="Case" main="機密" bottom="NDA" />
					{/if}
					<p class="catch display">{chapter.catchphrase}</p>
					<p class="caption">↓ {chapter.tagline}. {chapter.where}.</p>
					<ChapterParams {chapter} />
					{#if chapter.links.length}
						<div class="links">
							{#each chapter.links as link (link.href)}
								<a class="btn" href={link.href} target="_blank" rel="noopener">{link.label} ↗</a>
							{/each}
						</div>
					{:else if chapter.note}
						<p class="private lettering">{chapter.note}</p>
					{/if}
				</div>
			</div>
		</header>

		<!-- what I did: one panel per beat -->
		<section class="did" aria-labelledby="did-title">
			<h2 id="did-title" class="sec-title" use:reveal><span class="jp" lang="ja">活躍</span>What I did</h2>
			<ol class="panels">
				{#each did as item, i (item)}
					<li
						class="beat panel"
						class:wide={i === did.length - 1 && did.length % 2 === 1}
						use:reveal
						style="--delay: {(i % 2) * 0.06}s"
					>
						<span class="beat-no display" aria-hidden="true">{pad(i + 1)}</span>
						<p><Redactable text={item} /></p>
					</li>
				{/each}
			</ol>
		</section>

		<div class="verdict">
			<section class="impact panel" aria-labelledby="impact-title" use:reveal>
				<FocusLines seed={index * 11 + 5} rays={110} innerX={0.86} innerY={0.8} />
				<ShoutBubble class="impact-label" tone="red" seed={index + 4} spikes={14}>
					<h2 id="impact-title" class="impact-word"><span lang="ja">成果</span> Impact!!</h2>
				</ShoutBubble>
				<ShoutBubble class="impact-box" shape="box" seed={index * 3 + 1} spikes={14}>
					<span class="impact-text"><Redactable text={chapter.impact} /></span>
				</ShoutBubble>
			</section>

			<section class="learned panel" aria-labelledby="learned-title" use:reveal style="--delay: 0.08s">
				<h2 id="learned-title" class="label kicker"><span lang="ja">教訓</span> What I learned</h2>
				<div class="said">
					<div class="face tone"><Portrait variant="bust" class="face-art" /></div>
					<SpeechBubble tail="l" class="learned-bubble"><Redactable text={chapter.learned} /></SpeechBubble>
				</div>
			</section>
		</div>

		{#if media.length}
			<section class="media" aria-labelledby="media-title">
				<h2 id="media-title" class="sec-title" use:reveal><span class="jp" lang="ja">記録</span>In motion</h2>
				<div class="shots">
					{#each media as shot, i (shot.src)}
						<figure class="shot" use:reveal style="--lean: {i % 2 ? 1.2 : -1.2}deg; --delay: {i * 0.06}s">
							<span class="tape" aria-hidden="true"></span>
							<div class="shot-frame panel">
								{#if shot.type === 'video'}
									<video
										src="{base}/{shot.src}"
										aria-label={shot.alt}
										controls
										muted
										playsinline
										preload="metadata"
									></video>
								{:else}
									<img src="{base}/{shot.src}" alt={shot.alt} loading="lazy" decoding="async" />
								{/if}
							</div>
							{#if shot.caption}<figcaption class="lettering">{shot.caption}</figcaption>{/if}
						</figure>
					{/each}
				</div>
			</section>
		{/if}

		<section class="stack panel" aria-labelledby="stack-title" use:reveal>
			<h2 id="stack-title" class="label kicker"><span lang="ja">使用技術</span> Built with</h2>
			<ul class="tags">
				{#each chapter.tags as tag (tag)}<li class="chip">{tag}</li>{/each}
			</ul>
		</section>

		<a class="next panel" href="{base}/chapters/{next.id}/?arc={arc.current}" use:reveal>
			<span class="next-label kicker">{nextIndex === 0 ? 'Back to the first chapter' : 'Next chapter'}</span>
			<span class="next-no display">{pad(nextIndex + 1)}</span>
			<span class="next-title display"><Redactable text={next.title} /></span>
			<span class="next-tagline">{next.tagline}</span>
			<span class="next-arrow display" aria-hidden="true">→</span>
		</a>
	</div>
</article>

<style>
	.detail {
		padding-block: clamp(20px, 4vw, 40px) clamp(24px, 5vw, 56px);
	}

	.top {
		display: flex;
		flex-wrap: wrap;
		align-items: baseline;
		justify-content: space-between;
		gap: 0.4rem 1rem;
		margin-bottom: clamp(16px, 3vw, 28px);
	}

	.back {
		font-size: 1.15rem;
		text-decoration: none;
		border-bottom: 2px solid var(--ink);
	}

	.back:hover {
		color: var(--red);
		border-color: var(--red);
	}

	.where-in {
		color: var(--ink-faint);
	}

	/* ---- title spread ---- */
	.tab {
		display: inline-block;
		position: relative;
		z-index: 1;
		margin-left: 18px;
		padding: 0.45rem 1.6rem 0.35rem 0.9rem;
		background: var(--ink);
		color: var(--white);
		clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%);
	}

	.sheet {
		display: grid;
		gap: var(--gutter);
		grid-template-columns: minmax(0, 1fr);
		padding: var(--gutter);
		background: var(--white);
		border: var(--line) solid var(--ink);
		box-shadow: 8px 8px 0 var(--ink);
	}

	.art {
		--art-min: 360px;
	}

	.head {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		padding: 0.3rem 0.3rem 0.2rem;
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
		font-size: clamp(1.6rem, 3.4vw, 2.6rem);
		line-height: 1.08;
	}

	.caption {
		font-size: 0.9rem;
		line-height: 1.45;
		color: var(--ink-soft);
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.7rem;
	}

	.links .btn {
		font-size: 0.74rem;
	}

	.private {
		font-size: 0.9rem;
		color: var(--ink-faint);
	}

	.classified .private {
		color: var(--red);
	}

	/* ---- section titles ---- */
	.sec-title {
		display: flex;
		align-items: baseline;
		gap: 0.7rem;
		margin: clamp(40px, 7vw, 80px) 0 1.2rem;
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(1.8rem, 4.5vw, 3rem);
		line-height: 1;
	}

	.sec-title .jp {
		color: var(--red);
		font-size: 0.45em;
		letter-spacing: 0.2em;
	}

	.label {
		position: relative;
		z-index: 1;
		justify-self: start;
		display: inline-block;
		padding: 0.3rem 0.6rem;
		background: var(--white);
		border: var(--line-thin) solid var(--ink);
	}

	.label span {
		color: var(--red);
		font-family: var(--font-display);
		letter-spacing: 0.1em;
	}

	/* ---- what I did ---- */
	.panels {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: var(--gutter);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.beat {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr);
		align-items: start;
		gap: 0.9rem;
		padding: 1rem 1.1rem 1.1rem;
		box-shadow: 4px 4px 0 var(--ink);
	}

	.beat:nth-child(4n + 2) {
		background-image: radial-gradient(color-mix(in srgb, var(--ink) 22%, transparent) 30%, transparent 32%);
		background-size: 6px 6px;
		background-position: right top;
		background-repeat: no-repeat;
		background-color: var(--white);
	}

	.beat-no {
		font-size: 2rem;
		line-height: 0.9;
		color: var(--red);
		-webkit-text-stroke: 1px var(--ink);
		paint-order: stroke fill;
	}

	.beat p {
		font-size: 0.95rem;
		line-height: 1.6;
	}

	/* ---- impact & learned ---- */
	.verdict {
		display: grid;
		gap: clamp(20px, 3vw, 28px);
		margin-top: clamp(40px, 7vw, 80px);
	}

	.impact,
	.learned {
		padding: clamp(14px, 2.4vw, 22px);
		box-shadow: 8px 8px 0 var(--ink);
	}

	.impact {
		display: grid;
		justify-items: start;
		gap: 0.4rem;
	}

	.impact :global(.impact-label) {
		position: relative;
		z-index: 2;
		margin: 0 0 -1.6rem 0.2rem;
		transform: rotate(-6deg);
	}

	.impact-word {
		font-family: inherit;
		font-weight: 400;
		font-size: clamp(1rem, 2vw, 1.25rem);
		text-transform: uppercase;
	}

	.impact-word span {
		font-size: 0.7em;
		letter-spacing: 0.1em;
	}

	.impact :global(.impact-box) {
		position: relative;
		z-index: 1;
		display: grid;
		width: 100%;
	}

	.impact-text {
		display: block;
		font-family: var(--font-body);
		font-weight: 700;
		font-size: clamp(1rem, 1.7vw, 1.15rem);
		line-height: 1.5;
	}

	.learned {
		display: grid;
		align-content: start;
		gap: 1rem;
		background: var(--white);
	}

	.said {
		display: grid;
		grid-template-columns: clamp(96px, 24vw, 150px) minmax(0, 1fr);
		align-items: center;
		gap: clamp(18px, 3vw, 30px);
	}

	.face {
		position: relative;
		aspect-ratio: 3 / 4;
		border: var(--line) solid var(--ink);
		background-color: var(--paper);
		overflow: hidden;
	}

	.face :global(.face-art) {
		position: absolute;
		inset: 0;
		--art-pos: 50% 12%;
	}

	.face :global(.face-art img) {
		position: absolute;
		inset: 0;
	}

	.said :global(.learned-bubble) {
		display: block;
	}

	.said :global(.learned-bubble .body) {
		border-radius: 46% / 38%;
		padding: 1.6em 2.2em;
		font-size: clamp(0.85rem, 1.3vw, 1rem);
		line-height: 1.35;
	}

	/* ---- media ---- */
	.shots {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr));
		gap: clamp(20px, 3vw, 32px);
	}

	.shot {
		position: relative;
		margin: 0;
	}

	.shot {
		rotate: var(--lean);
	}

	.shot-frame {
		box-shadow: 6px 6px 0 var(--ink);
	}

	.shot-frame img,
	.shot-frame video {
		display: block;
		width: 100%;
		height: auto;
	}

	.tape {
		position: absolute;
		top: -12px;
		left: 50%;
		z-index: 1;
		width: 76px;
		height: 22px;
		background: color-mix(in srgb, var(--paper-deep) 80%, transparent);
		border: 1px solid color-mix(in srgb, var(--ink) 25%, transparent);
		transform: translateX(-50%) rotate(-4deg);
	}

	figcaption {
		margin-top: 0.6rem;
		font-size: 0.9rem;
		text-align: center;
	}

	/* ---- built with ---- */
	.stack {
		display: grid;
		justify-items: start;
		gap: 0.9rem;
		margin-top: clamp(40px, 7vw, 80px);
		padding: clamp(14px, 2.4vw, 22px);
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.tags .chip {
		font-size: 0.78rem;
	}

	/* ---- next chapter ---- */
	.next {
		display: grid;
		grid-template-columns: auto minmax(0, 1fr) auto;
		grid-template-areas: 'label label arrow' 'no title arrow' 'no tagline arrow';
		align-items: center;
		gap: 0.2rem 1rem;
		margin-top: clamp(28px, 5vw, 48px);
		padding: clamp(16px, 3vw, 28px) clamp(16px, 3vw, 32px);
		text-decoration: none;
		box-shadow: 8px 8px 0 var(--ink);
		transition:
			transform 0.15s var(--ease-out),
			box-shadow 0.15s var(--ease-out);
	}

	.next:hover {
		transform: translate(-3px, -3px);
		box-shadow: 11px 11px 0 var(--red);
	}

	.next-label {
		grid-area: label;
		color: var(--red);
	}

	.next-no {
		grid-area: no;
		font-size: clamp(2.6rem, 6vw, 4rem);
		color: var(--red);
	}

	.next-title {
		grid-area: title;
		font-size: clamp(1.5rem, 4vw, 2.6rem);
		text-transform: uppercase;
	}

	.next-tagline {
		grid-area: tagline;
		color: var(--ink-soft);
		font-size: 0.95rem;
	}

	.next-arrow {
		grid-area: arrow;
		font-size: clamp(2rem, 5vw, 3.4rem);
		transition: transform 0.2s var(--ease-snap);
	}

	.next:hover .next-arrow {
		transform: translateX(6px);
	}

	@media (min-width: 720px) {
		.panels {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}

		.beat.wide {
			grid-column: span 2;
		}
	}

	@media (min-width: 900px) {
		.sheet {
			grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
			align-items: stretch;
		}

		.art {
			--art-min: 460px;
		}

		.head {
			justify-content: center;
			padding: 0.6rem 0.8rem;
		}

		.verdict {
			grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
			align-items: start;
		}
	}
</style>
