<script lang="ts">
	import { base } from '$app/paths';
	import { arc } from '$lib/arc.svelte';
	import { chapters, person, type Chapter } from '$lib/data/profile';
	import { reveal } from '$lib/actions';
	import { plainText } from '$lib/text';
	import ChapterArt from './ChapterArt.svelte';
	import ChapterParams from './ChapterParams.svelte';
	import FocusLines from './FocusLines.svelte';
	import Hanko from './Hanko.svelte';
	import Koma, { type Shot } from './Koma.svelte';
	import MangaPage from './MangaPage.svelte';
	import Portrait from './Portrait.svelte';
	import Redactable from './Redactable.svelte';
	import ShoutBubble from './ShoutBubble.svelte';
	import SpeechBubble from './SpeechBubble.svelte';
	import SpeedLines from './SpeedLines.svelte';

	interface Props {
		chapter: Chapter;
	}

	let { chapter }: Props = $props();

	type Slot = { cols: number; rows?: number; cut?: 'l' | 'r' };

	/** Panel layouts on a 6-column page, by how many panels the page holds. */
	const LAYOUTS: Record<number, Slot[][]> = {
		1: [[{ cols: 6 }]],
		2: [[{ cols: 3, cut: 'r' }, { cols: 3, cut: 'l' }]],
		3: [
			[{ cols: 6 }, { cols: 3, cut: 'r' }, { cols: 3, cut: 'l' }],
			[{ cols: 3, rows: 2 }, { cols: 3 }, { cols: 3 }],
			[{ cols: 3, cut: 'r' }, { cols: 3, cut: 'l' }, { cols: 6 }]
		],
		4: [
			[{ cols: 6 }, { cols: 3, cut: 'r' }, { cols: 3, cut: 'l' }, { cols: 6 }],
			[{ cols: 2, rows: 2 }, { cols: 4 }, { cols: 4 }, { cols: 6 }],
			[{ cols: 6 }, { cols: 4 }, { cols: 2, rows: 2 }, { cols: 4 }]
		]
	};
	const PER_PAGE = 4;
	/** Cycled through the panels so neighbours never look alike. */
	const SHOTS: Shot[] = ['wide', 'focus', 'face', 'speed', 'close', 'night'];
	const SFX: Record<Shot, [string, string]> = {
		wide: ['カタカタ', 'ピコン'],
		focus: ['ドン', 'バン'],
		face: ['ハッ', 'フッ'],
		speed: ['シュッ', 'ザッ'],
		close: ['カチッ', 'ピピッ'],
		night: ['ゴゴゴ', 'ゴゴゴ']
	};
	// The title spread is pages 1–2, so the story starts on page 3.
	const FIRST_PAGE = 3;

	const pad = (n: number) => String(n).padStart(2, '0');

	// Numbering and "next chapter" follow the current arc's order.
	const order = $derived(
		arc.data.chapters.includes(chapter.id) ? arc.data.chapters : Object.keys(chapters)
	);
	const index = $derived(order.indexOf(chapter.id));
	const num = $derived(pad(index + 1));
	const nextIndex = $derived((index + 1) % order.length);
	const next = $derived(chapters[order[nextIndex]]);
	const shout = $derived(chapter.shout[arc.current] ?? chapter.shout.default);
	const media = $derived(chapter.classified ? [] : (chapter.media ?? []));
	const did = $derived(chapter.whatIDid);
	const hashira = $derived(plainText(chapter.tagline));

	// "What I did" as story pages: up to four panels each, spread evenly, each page with its own layout.
	const pages = $derived.by(() => {
		const count = Math.ceil(did.length / PER_PAGE);
		const out = [];
		let start = 0;
		for (let p = 0; p < count; p++) {
			const size = Math.ceil((did.length - start) / (count - p));
			const layouts = LAYOUTS[size];
			const layout = layouts[(p + index) % layouts.length];
			const panels = did.slice(start, start + size).map((text, k) => {
				const i = start + k;
				const shot = SHOTS[i % SHOTS.length];
				return { text, shot, sfx: SFX[shot][Math.floor(i / SHOTS.length) % 2], ...layout[k] };
			});
			out.push({ start, panels });
			start += size;
		}
		return out;
	});
	const climaxPage = $derived(FIRST_PAGE + pages.length);
</script>

<article class="detail" class:classified={chapter.classified} id="chapter" aria-labelledby="chapter-title">
	<div class="wrap">
		<div class="top">
			<a class="back lettering" href="{base}/?arc={arc.current}#chapters">← All chapters</a>
			<p class="kicker where-in">
				Chapter {num} of {pad(order.length)} · {arc.data.label} arc
			</p>
		</div>

		<!-- pages 1–2: the title spread -->
		<header class="spread">
			<div class="tabs">
				<span class="tab kicker">Chapter {num}</span>
				<span class="tab yomikiri kicker"><span lang="ja">読切</span> One-shot</span>
			</div>
			<div class="sheet">
				<div class="art">
					<ChapterArt {chapter} {num} heading="h1" headingId="chapter-title" />
				</div>
				<div class="head">
					{#if chapter.classified}
						<Hanko class="seal" top="Case" main="機密" bottom="NDA" />
					{/if}
					<p class="catch display">{chapter.catchphrase}</p>
					<p class="credit"><span class="credit-role" lang="ja">作</span> {person.nickname}</p>
					<p class="caption">↓ {chapter.tagline}. {chapter.where}.</p>
					<p class="summary narration"><Redactable text={chapter.summary} /></p>
					<div class="row">
						<div class="action panel">
							<FocusLines seed={index * 17 + 3} rays={70} innerX={0.62} innerY={0.56} />
							<ShoutBubble class="shout" seed={index * 7 + 2} spikes={20}>
								<span class="shout-text">{shout}</span>
							</ShoutBubble>
							<span class="sfx action-sfx" lang="ja" aria-hidden="true">ドドド</span>
						</div>
						<ChapterParams {chapter} />
					</div>
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

		<div class="book">
			<!-- what I did: the story, one panel per beat -->
			{#if pages.length}
				<section class="story" aria-labelledby="did-title">
					{#each pages as page, p (page.start)}
						<MangaPage no={FIRST_PAGE + p} {hashira}>
							{#if p === 0}
								<h2 id="did-title" class="page-tab kicker"><span lang="ja">活躍</span> What I did</h2>
							{/if}
							<ol class="koma-grid" start={page.start + 1}>
								{#each page.panels as panel, k (panel.text)}
									<Koma
										{...panel}
										illustration={chapter.illustration}
										seed={index * 31 + page.start + k}
										lean={p % 2 === 1}
										delay={(k % 2) * 0.06}
									/>
								{/each}
							</ol>
						</MangaPage>
					{/each}
				</section>
			{/if}

			<!-- the climax: a close-up, then the impact as a splash panel -->
			<MangaPage no={climaxPage} {hashira}>
				<div class="climax">
					<div class="buildup frame" aria-hidden="true">
						<div class="cut">
							<SpeedLines seed={index + 9} lines={50} />
							<div class="eyes"><Portrait variant="bust" /></div>
							<span class="sfx buildup-sfx" lang="ja">ゴゴゴゴ</span>
						</div>
					</div>
					<section class="splash frame" aria-labelledby="impact-title" use:reveal>
						<div class="cut">
							<FocusLines seed={index * 11 + 5} rays={140} innerX={0.62} innerY={0.6} />
							<ShoutBubble class="impact-label" tone="red" seed={index + 4} spikes={14}>
								<h2 id="impact-title" class="impact-word"><span lang="ja">成果</span> Impact!!</h2>
							</ShoutBubble>
							<ShoutBubble class="impact-box" shape="box" seed={index * 3 + 1} spikes={14}>
								<span class="impact-text"><Redactable text={chapter.impact} /></span>
							</ShoutBubble>
							<span class="sfx red splash-sfx" lang="ja" aria-hidden="true">ドンッ</span>
						</div>
					</section>
				</div>
			</MangaPage>

			<!-- the epilogue: what I learned, said under the cherry tree -->
			<MangaPage no={climaxPage + 1} {hashira}>
				<section class="epilogue frame" aria-labelledby="learned-title" use:reveal>
					<div class="cut">
						<div class="scenery" aria-hidden="true"><Portrait /></div>
						<h2 id="learned-title" class="label kicker"><span lang="ja">教訓</span> What I learned</h2>
						<div class="said">
							<SpeechBubble tail="bl" class="learned-bubble"><Redactable text={chapter.learned} /></SpeechBubble>
						</div>
					</div>
				</section>
				<p class="fin"><span class="fin-mark" lang="ja">完</span><span class="kicker">The end</span></p>
			</MangaPage>
		</div>

		<!-- back matter, as in a magazine: extras, credits, and the next chapter -->
		<div class="extras">
			{#if media.length}
				<section class="media" aria-labelledby="media-title">
					<h2 id="media-title" class="sec-title" use:reveal><span class="jp" lang="ja">おまけ</span>In motion</h2>
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
				<span class="next-label kicker"
					><span lang="ja">次回</span> {nextIndex === 0 ? 'Back to the first chapter' : 'Next chapter'}</span
				>
				<span class="next-no display">{pad(nextIndex + 1)}</span>
				<span class="next-title display"><Redactable text={next.title} /></span>
				<span class="next-tagline">{next.tagline}</span>
				<span class="next-arrow display" aria-hidden="true">→</span>
			</a>
		</div>
	</div>
</article>

<style>
	.detail {
		--page-gap: clamp(40px, 6vw, 64px);
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
	.tabs {
		display: flex;
		gap: 6px;
		margin-left: 18px;
	}

	.tab,
	.page-tab {
		display: inline-block;
		position: relative;
		z-index: 1;
		padding: 0.45rem 1.6rem 0.35rem 0.9rem;
		background: var(--ink);
		color: var(--white);
		clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 100%, 0 100%);
	}

	.yomikiri {
		background: var(--red);
	}

	.yomikiri span,
	.page-tab span {
		font-family: var(--font-display);
		letter-spacing: 0.1em;
	}

	.sheet {
		position: relative;
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

	/* the author credit on a title page */
	.credit {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--font-display);
		font-size: 1.05rem;
		letter-spacing: 0.08em;
		text-transform: uppercase;
	}

	.credit-role {
		display: grid;
		place-items: center;
		width: 1.6rem;
		height: 1.6rem;
		border: 2px solid var(--red);
		color: var(--red);
		font-size: 0.85rem;
	}

	.caption {
		font-size: 0.9rem;
		line-height: 1.45;
		color: var(--ink-soft);
	}

	.row {
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

	.summary {
		font-size: 1rem;
		line-height: 1.6;
		box-shadow: 4px 4px 0 var(--ink);
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

	/* ---- the pages ---- */
	.book,
	.story {
		display: grid;
		gap: var(--page-gap);
	}

	.book,
	.extras {
		max-width: 960px;
		margin-inline: auto;
	}

	.book {
		margin-top: var(--page-gap);
	}

	/* the tab hangs off the top of the page */
	.page-tab {
		position: absolute;
		bottom: 100%;
		left: 18px;
		margin: 0;
		font-weight: 500;
	}

	.page-tab span {
		color: var(--red);
	}

	.koma-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 14px 12px;
		margin: 0;
		padding: 0;
		list-style: none;
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

	/* ---- climax ---- */
	.climax {
		display: grid;
		gap: 14px;
	}

	.buildup .cut {
		height: clamp(96px, 16vw, 140px);
	}

	.eyes {
		position: absolute;
		inset: 0 18% 0 0;
		overflow: hidden;
		-webkit-mask-image: linear-gradient(to right, #000 70%, transparent);
		mask-image: linear-gradient(to right, #000 70%, transparent);
	}

	.climax .eyes :global(.art img) {
		position: absolute;
		left: 50%;
		top: 50%;
		width: max(100%, 520px);
		max-width: none;
		height: auto;
		transform: translate(-50%, -21%);
	}

	.buildup-sfx {
		position: absolute;
		right: 3%;
		top: 50%;
		z-index: 1;
		font-size: clamp(1.8rem, 5vw, 3.2rem);
		transform: translateY(-50%) rotate(-4deg);
	}

	.splash .cut {
		display: grid;
		place-content: center;
		justify-items: start;
		min-height: clamp(420px, 56vw, 560px);
		padding: clamp(28px, 6vw, 64px) clamp(14px, 6vw, 72px);
	}

	.splash :global(.impact-label) {
		position: relative;
		z-index: 2;
		margin: 0 0 -1.6rem 0.2rem;
		transform: rotate(-6deg);
	}

	.impact-word {
		font-family: inherit;
		font-weight: 400;
		font-size: clamp(1.1rem, 2.4vw, 1.5rem);
		text-transform: uppercase;
	}

	.impact-word span {
		font-size: 0.7em;
		letter-spacing: 0.1em;
	}

	.splash :global(.impact-box) {
		position: relative;
		z-index: 1;
		display: grid;
		width: 100%;
		max-width: 660px;
	}

	.impact-text {
		display: block;
		font-family: var(--font-body);
		font-weight: 700;
		font-size: clamp(1rem, 1.9vw, 1.2rem);
		line-height: 1.5;
	}

	.splash-sfx {
		position: absolute;
		right: clamp(4px, 2vw, 20px);
		bottom: clamp(4px, 2vw, 16px);
		z-index: 2;
		writing-mode: vertical-rl;
		font-size: clamp(2.6rem, 8vw, 5.4rem);
		transform: rotate(6deg);
	}

	/* ---- epilogue ---- */
	.epilogue .cut {
		display: grid;
		align-content: start;
		gap: 1rem;
		min-height: clamp(540px, 62vw, 600px);
		padding: clamp(12px, 2.4vw, 22px);
	}

	.scenery {
		position: absolute;
		inset: 0;
	}

	.scenery :global(.art) {
		position: absolute;
		inset: 0;
		--art-pos: 24% 100%;
	}

	.epilogue .scenery :global(.art img) {
		position: absolute;
		inset: 0;
	}

	.said {
		position: relative;
		z-index: 1;
	}

	.said :global(.learned-bubble) {
		display: block;
	}

	.said :global(.learned-bubble .tail) {
		left: 18%;
	}

	.said :global(.learned-bubble .body) {
		border-radius: 46% / 38%;
		padding: 1.6em 2.2em;
		font-size: clamp(0.85rem, 1.3vw, 1rem);
		line-height: 1.35;
	}

	.fin {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 0.6rem;
		margin-top: 1rem;
		color: var(--red);
	}

	.fin-mark {
		display: grid;
		place-items: center;
		width: 3rem;
		height: 3rem;
		border: 3px solid var(--red);
		border-radius: 50%;
		font-family: var(--font-display);
		font-size: 1.4rem;
		transform: rotate(-10deg);
	}

	/* ---- back matter ---- */
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

	.shots {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 220px), 1fr));
		gap: clamp(20px, 3vw, 32px);
	}

	.shot {
		position: relative;
		margin: 0;
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

	.next-label span {
		font-family: var(--font-display);
		letter-spacing: 0.1em;
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

	@media (min-width: 480px) {
		.row {
			grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
		}
	}

	@media (min-width: 720px) {
		.koma-grid {
			grid-template-columns: repeat(6, minmax(0, 1fr));
		}

		.said {
			justify-self: end;
			width: min(60%, 460px);
			margin-top: 0.4rem;
		}

		.scenery :global(.art) {
			--art-pos: 24% 88%;
		}
	}

	@media (min-width: 900px) {
		.sheet {
			grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
			align-items: stretch;
		}

		/* the fold down the middle of the spread */
		.sheet::after {
			content: '';
			position: absolute;
			top: 0;
			bottom: 0;
			left: calc(50% - 18px);
			width: 36px;
			z-index: 3;
			background: linear-gradient(
				to right,
				transparent,
				color-mix(in srgb, var(--ink) 9%, transparent) 50%,
				transparent
			);
			pointer-events: none;
		}

		.art {
			--art-min: 460px;
		}

		.head {
			justify-content: center;
			padding: 0.6rem 0.8rem 0.6rem 1.4rem;
		}
	}
</style>
