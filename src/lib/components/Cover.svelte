<script lang="ts">
	import { fade } from 'svelte/transition';
	import { arc } from '$lib/arc.svelte';
	import { person } from '$lib/data/profile';
	import ArcSwitcher from './ArcSwitcher.svelte';
	import FocusLines from './FocusLines.svelte';
	import Hanko from './Hanko.svelte';
	import Portrait from './Portrait.svelte';
	import Petals from './Petals.svelte';
	import ShoutBubble from './ShoutBubble.svelte';
	import SpeechBubble from './SpeechBubble.svelte';
	import Schema from '$lib/illustrations/Schema.svelte';
	import Phones from '$lib/illustrations/Phones.svelte';
	import { ink } from '$lib/transitions';
</script>

<section class="cover" id="top" aria-label="Introduction">
	<div class="wrap">
		<div class="page">
			<!-- A: title -->
			<div class="pA panel anim" style="--d: 0s">
				<FocusLines seed={11} rays={120} innerX={0.92} innerY={0.82} />
				<span class="corner kicker">Vol. 01 · Ch. 00 · Prologue</span>
				<div class="a-inner">
					<p class="hello lettering">This is the story of</p>
					<h1 class="name">
						<span class="display">{person.nickname.toUpperCase()}</span>
						<span class="kata" lang="ja">{person.katakana}</span>
					</h1>
					<p class="arc-line display">
						currently in my <ArcSwitcher /> arc.
					</p>
					<p class="hint lettering" aria-live="polite">
						<svg viewBox="0 0 40 30" aria-hidden="true"><path d="M36 26 C 26 26 12 20 8 4 M2 10 L8 3 L14 9" /></svg>
						{#key arc.switches === 0}
							<span in:fade={{ duration: 200 }}>
								{arc.switches === 0
									? "psst, tap it. there's another arc"
									: 'the chapters below just re-sorted for this arc'}
							</span>
						{/key}
					</p>
				</div>
				<Hanko class="stamp" top="BSD" main={person.katakana} bottom="ID" />
			</div>

			<!-- B: character -->
			<div class="pB frame anim" class:has-art={person.portrait} style="--d: 0.12s">
				<div class="cut">
					{#if person.portrait}
						<Portrait class="b-art" eager />
						<Petals />
					{:else}
						<div class="b-tone tone tone-fade-up" aria-hidden="true"></div>
						<span class="sfx b-sfx" lang="ja" aria-hidden="true">ゴゴゴ</span>
						<Portrait class="b-portrait" />
					{/if}
					<div class="b-bubble">
						{#key arc.current}
							<div in:ink>
								<SpeechBubble tail={person.portrait ? 'bl' : 'br'}>{arc.data.bubble}</SpeechBubble>
							</div>
						{/key}
					</div>
				</div>
			</div>

			<!-- C: prologue narration -->
			<div class="pC frame anim" style="--d: 0.24s">
				<div class="cut c-inner">
					{#key arc.current}
						<div class="c-content" in:ink>
							<p class="narration">{arc.data.summary}</p>
							<p class="avail">
								<span class="open">Open</span>
								{arc.data.availability}
							</p>
						</div>
					{/key}
					<div class="ctas">
						<a class="btn ink" href="#chapters">Read the chapters ↓</a>
						<a class="btn" href="#contact">Say hi</a>
					</div>
				</div>
			</div>

			<!-- D: arc prop -->
			<div class="pD frame anim" style="--d: 0.36s">
				<div class="cut d-inner">
					{#key arc.current}
						<div class="d-content" in:ink>
							<div class="d-illo">
								{#if arc.current === 'product'}<Schema />{:else}<Phones />{/if}
							</div>
							<ShoutBubble class="d-shout" tone="red" seed={arc.current === 'product' ? 5 : 9}>
								<span class="shout-value">{arc.data.shout.value}</span>
								<span class="shout-label lettering">{arc.data.shout.label}</span>
							</ShoutBubble>
							<ul class="notes" aria-label="Notes">
								{#each arc.data.notes as note, i (note)}
									<li class="lettering" style="--r: {i % 2 ? 4 : -5}deg">{note}</li>
								{/each}
							</ul>
						</div>
					{/key}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.cover {
		padding-top: clamp(12px, 2vw, 24px);
		padding-bottom: clamp(48px, 8vw, 96px);
	}

	.page {
		--slant: 34px;
		display: grid;
		gap: var(--gutter);
		grid-template-columns: 1fr;
		grid-template-areas: 'a' 'b' 'c' 'd';
	}

	.pA {
		grid-area: a;
		container-type: inline-size;
		min-height: 340px;
		display: flex;
		align-items: center;
		padding: clamp(40px, 6vw, 72px) clamp(20px, 4vw, 56px);
	}

	.pB {
		grid-area: b;
		min-height: 360px;
	}

	.pB.has-art,
	.pB.has-art .cut {
		min-height: 560px;
	}

	.pC {
		grid-area: c;
	}

	.pD {
		grid-area: d;
		min-height: 300px;
	}

	/* ---- A ---- */
	.pA :global(.focus) {
		opacity: 0.9;
	}

	.corner {
		position: absolute;
		top: 12px;
		left: 14px;
		padding: 0.15rem 0.5rem;
		background: var(--white);
		border: var(--line-thin) solid var(--ink);
		z-index: 2;
	}

	.a-inner {
		position: relative;
		z-index: 1;
		min-width: 0;
	}

	/* paper-coloured outline keeps type readable over the focus lines */
	.hello,
	.name,
	.arc-line,
	.hint {
		-webkit-text-stroke: 7px var(--white);
		paint-order: stroke fill;
	}

	.hello {
		font-size: clamp(1rem, 2vw, 1.35rem);
		color: var(--ink-soft);
		transform: rotate(-2deg);
		transform-origin: left;
		margin-bottom: 0.35rem;
	}

	.name {
		display: flex;
		align-items: flex-start;
		gap: 0.15em;
		margin: 0;
		font-weight: 400;
		font-size: min(10.5rem, 19cqi);
		line-height: 0.82;
		letter-spacing: -0.02em;
	}

	.kata {
		writing-mode: vertical-rl;
		font-family: var(--font-display);
		font-size: 0.24em;
		letter-spacing: 0.1em;
		color: var(--red);
		margin-top: 0.06em;
	}

	.arc-line {
		margin-top: 1.1rem;
		font-size: clamp(1.2rem, 4.9cqi, 2.4rem);
		line-height: 1.25;
	}

	.hint {
		display: flex;
		align-items: flex-start;
		gap: 0.4rem;
		margin-top: 1.1rem;
		margin-left: 2.2rem;
		font-size: 0.95rem;
		color: var(--red);
		transform: rotate(-2.5deg);
	}

	.hint svg {
		width: 36px;
		flex: none;
		margin-top: -14px;
	}

	.hint path {
		fill: none;
		stroke: var(--red);
		stroke-width: 2.2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.pA :global(.stamp) {
		position: absolute;
		right: clamp(14px, 3vw, 32px);
		bottom: clamp(14px, 3vw, 28px);
		font-size: clamp(1rem, 1.8vw, 1.35rem);
		background: var(--white);
		transform: rotate(8deg);
		z-index: 2;
	}

	/* ---- B ---- */
	.pB .cut {
		min-height: 360px;
		background: var(--white);
	}

	.b-tone {
		position: absolute;
		inset: 0;
		opacity: 0.55;
	}

	.b-sfx {
		position: absolute;
		top: 32%;
		right: 6%;
		font-size: clamp(2.2rem, 4vw, 3.4rem);
		writing-mode: vertical-rl;
		letter-spacing: -0.05em;
		transform: rotate(6deg);
	}

	.b-bubble {
		position: absolute;
		top: clamp(18px, 3vw, 28px);
		left: clamp(14px, 2.5vw, 24px);
		right: 26%;
		z-index: 2;
	}

	.pB :global(.b-art) {
		position: absolute;
		inset: 0;
		--art-pos: 22% 62%;
	}

	.pB :global(.b-art img) {
		position: absolute;
		inset: 0;
	}

	/* bubble floats over the branches, tail pointing down at him */
	.has-art .b-bubble {
		top: 30%;
		left: auto;
		right: clamp(10px, 4%, 22px);
		width: min(62%, 230px);
	}

	.pB :global(.b-portrait) {
		position: absolute;
		left: 50%;
		bottom: 0;
		width: min(62%, 240px);
		height: auto;
		transform: translateX(-50%);
	}

	/* ---- C ---- */
	.c-inner {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		gap: 1.2rem;
		padding: clamp(18px, 2.4vw, 28px);
	}

	.c-content .narration {
		font-size: clamp(0.98rem, 1.3vw, 1.08rem);
		box-shadow: 4px 4px 0 var(--ink);
	}

	.avail {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		margin-top: 1rem;
		font-family: var(--font-letter);
		font-weight: 700;
		font-size: 1.02rem;
	}

	.open {
		padding: 0.05rem 0.45rem;
		border: 2px solid var(--red);
		color: var(--red);
		font-family: var(--font-mono);
		font-size: 0.68rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
		transform: rotate(-6deg);
	}

	.ctas {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
	}

	/* ---- D ---- */
	.d-inner {
		padding: clamp(14px, 2vw, 22px);
	}

	.d-content {
		position: relative;
		height: 100%;
		min-height: 260px;
	}

	.d-illo {
		position: absolute;
		inset: 6% 0 20% 30%;
		display: grid;
		place-items: center;
	}

	.d-illo :global(svg) {
		width: 100%;
		height: 100%;
		max-height: 240px;
	}

	.d-content :global(.d-shout) {
		position: absolute;
		left: -6px;
		top: -4px;
		transform: rotate(-7deg) scale(0.92);
		transform-origin: top left;
		z-index: 2;
	}

	.shout-value {
		display: block;
		font-size: clamp(1.7rem, 3vw, 2.3rem);
	}

	.shout-label {
		display: block;
		font-size: 0.68rem;
		margin-top: 0.25rem;
		max-width: 9ch;
		margin-inline: auto;
	}

	.notes {
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.4rem;
		margin: 0;
		padding: 0;
		list-style: none;
		z-index: 2;
	}

	.notes li {
		padding: 0.25rem 0.6rem;
		background: var(--white);
		border: var(--line-thin) solid var(--ink);
		font-size: 0.78rem;
		transform: rotate(var(--r));
		box-shadow: 2px 2px 0 var(--ink);
	}

	/* ---- slanted gutter between C and D (stacked) ---- */
	.pC > .cut {
		clip-path: polygon(0 0, 100% 0, 100% calc(100% - var(--slant)), 0 100%);
		padding-bottom: calc(var(--slant) + 18px);
	}

	.pD {
		margin-top: calc(var(--slant) * -1);
	}

	.pD > .cut {
		clip-path: polygon(0 var(--slant), 100% 0, 100% 100%, 0 100%);
		padding-top: calc(var(--slant) + 14px);
	}

	/* ---- tablet: A on top, B beside C/D ---- */
	@media (min-width: 680px) {
		.page {
			grid-template-columns: 0.9fr 1.1fr;
			grid-template-areas: 'a a' 'b c' 'b d';
		}

		.pB .cut {
			min-height: 100%;
		}

		.pB :global(.b-portrait) {
			width: min(78%, 300px);
		}

		.pB.has-art {
			min-height: 0;
		}

		.pB.has-art .cut {
			min-height: 100%;
		}
	}

	/* ---- desktop: A + B on top row, C/D side by side ---- */
	@media (min-width: 1000px) {
		.page {
			--slant: 40px;
			grid-template-columns: 1.05fr 0.95fr 0.95fr;
			grid-template-rows: auto minmax(300px, auto);
			grid-template-areas: 'a a b' 'c d b';
		}

		.pA {
			min-height: 400px;
		}

		.pC > .cut {
			clip-path: polygon(0 0, 100% 0, calc(100% - var(--slant)) 100%, 0 100%);
			padding-bottom: clamp(18px, 2.4vw, 28px);
			padding-right: calc(var(--slant) + 14px);
		}

		.pD {
			margin-top: 0;
			margin-left: calc(var(--slant) * -1);
		}

		.pD > .cut {
			clip-path: polygon(var(--slant) 0, 100% 0, 100% 100%, 0 100%);
			padding-top: clamp(14px, 2vw, 22px);
			padding-left: calc(var(--slant) + 10px);
		}
	}

	/* ---- intro ---- */
	:global(.js) .anim {
		animation: panel-in 0.6s var(--ease-out) both;
		animation-delay: var(--d);
	}

	:global(.js) .name .display {
		display: inline-block;
		animation: slam 0.55s 0.3s var(--ease-snap) both;
	}

	@keyframes panel-in {
		from {
			opacity: 0;
			transform: translateY(18px) scale(0.985);
		}
	}

	@keyframes slam {
		from {
			opacity: 0;
			transform: scale(1.7) rotate(-4deg);
			filter: blur(6px);
		}
	}
</style>
