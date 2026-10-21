<script lang="ts" module>
	/** What fills a panel besides its narration, like a camera angle. */
	export type Shot = 'wide' | 'focus' | 'face' | 'speed' | 'close' | 'night';
</script>

<script lang="ts">
	import type { Chapter } from '$lib/data/profile';
	import { closeUps, illustrations } from '$lib/illustrations';
	import { reveal } from '$lib/actions';
	import FocusLines from './FocusLines.svelte';
	import Portrait from './Portrait.svelte';
	import Redactable from './Redactable.svelte';
	import SpeedLines from './SpeedLines.svelte';

	interface Props {
		text: string;
		shot: Shot;
		illustration: Chapter['illustration'];
		/** Sound effect lettered into the panel. */
		sfx?: string;
		seed?: number;
		/** Columns (of 6) and rows the panel spans on a wide page. */
		cols?: number;
		rows?: number;
		/** The side cut on a slant to meet the panel next to it. */
		cut?: 'l' | 'r';
		/** Flips which way the slant leans. */
		lean?: boolean;
		delay?: number;
	}

	let {
		text,
		shot,
		illustration,
		sfx,
		seed = 1,
		cols = 6,
		rows = 1,
		cut,
		lean = false,
		delay = 0
	}: Props = $props();

	const Illo = $derived(illustrations[illustration]);
	const aim = $derived(closeUps[illustration]);
</script>

<!-- One story panel: a narration box over a "shot" (the chapter's art, a close-up, the portrait, or speed
     and focus lines), with a sound effect. -->
<li
	class="koma frame shot-{shot}"
	class:cut-l={cut === 'l'}
	class:cut-r={cut === 'r'}
	class:lean
	style="--cols: {cols}; --rows: {rows}; --delay: {delay}s"
	use:reveal
>
	<div class="cut">
		<div class="inner">
			{#if shot === 'focus'}
				<div class="bg aim" aria-hidden="true"><FocusLines {seed} rays={90} innerX={0.32} innerY={0.32} /></div>
			{:else if shot === 'speed'}
				<div class="bg" aria-hidden="true"><SpeedLines {seed} /></div>
			{:else if shot === 'wide'}
				<div class="bg tone tone-fade-up" aria-hidden="true"></div>
			{/if}
			<p class="box"><Redactable {text} /></p>
			<div class="stage" aria-hidden="true">
				{#if shot === 'wide'}
					<div class="illo"><Illo /></div>
				{:else if shot === 'close'}
					<div class="illo zoom" style="--fx: {aim[0]}%; --fy: {aim[1]}%"><Illo /></div>
				{:else if shot === 'face'}
					<div class="face"><Portrait variant="bust" /></div>
				{/if}
				{#if sfx}<span class="sfx koma-sfx" lang="ja">{sfx}</span>{/if}
			</div>
		</div>
	</div>
</li>

<style>
	.koma {
		--pad: clamp(10px, 1.6vw, 14px);
		--slant: 26px;
		grid-column: 1 / -1;
		min-width: 0;
	}

	.cut {
		container-type: inline-size;
	}

	.shot-night .cut {
		background-color: var(--ink);
		background-image: radial-gradient(color-mix(in srgb, var(--white) 55%, transparent) 1px, transparent 1.6px);
		background-size: 17px 21px;
	}

	/* narration on top, the shot below; side by side once the panel is wide enough */
	.inner {
		position: relative;
		display: grid;
		grid-template-areas: 'box' 'stage';
		grid-template-rows: auto minmax(120px, 1fr);
		gap: 0.6rem;
		height: 100%;
		min-height: 250px;
		padding: var(--pad);
	}

	.shot-close .inner {
		grid-template-areas: 'stage' 'box';
		grid-template-rows: minmax(130px, 1fr) auto;
	}

	.bg {
		position: absolute;
		inset: 0;
		pointer-events: none;
	}

	.tone {
		opacity: 0.4;
	}

	/* centre the focus lines on the stage */
	.aim {
		inset: 0 0 -50% 0;
	}

	.box {
		grid-area: box;
		align-self: start;
		position: relative;
		z-index: 2;
		padding: 0.65rem 0.8rem;
		background: var(--white);
		border: var(--line-thin) solid var(--ink);
		font-size: 0.92rem;
		line-height: 1.55;
	}

	.stage {
		grid-area: stage;
		position: relative;
		z-index: 1;
	}

	/* ---- the shots ---- */
	.illo {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
	}

	.illo :global(svg) {
		width: 100%;
		height: 100%;
		max-width: 320px;
	}

	.zoom {
		inset: auto;
		left: 50%;
		top: 50%;
		display: block;
		width: max(260%, 520px);
		transform: translate(calc(var(--fx) * -1), calc(var(--fy) * -1));
	}

	.zoom :global(svg) {
		width: 100%;
		height: auto;
		max-width: none;
	}

	.face {
		position: absolute;
		inset: 0 calc(var(--pad) * -1) calc(var(--pad) * -1);
		overflow: hidden;
	}

	.koma .face :global(.art img) {
		position: absolute;
		left: 50%;
		top: 40%;
		width: max(150%, 300px);
		max-width: none;
		height: auto;
		transform: translate(-52%, -21%);
	}

	.koma-sfx {
		position: absolute;
		z-index: 3;
		font-size: clamp(1.6rem, 7cqi, 2.6rem);
	}

	.shot-wide .koma-sfx {
		top: 0;
		right: 0;
		transform: rotate(8deg);
	}

	.shot-focus .koma-sfx,
	.shot-speed .koma-sfx,
	.shot-night .koma-sfx {
		left: 50%;
		top: 50%;
		font-size: clamp(2.2rem, 11cqi, 4.2rem);
		transform: translate(-50%, -50%) rotate(-8deg);
	}

	.shot-night .koma-sfx {
		writing-mode: vertical-rl;
		color: var(--red);
		transform: translate(-50%, -50%) rotate(4deg);
	}

	.shot-face .koma-sfx {
		top: 0.2rem;
		left: 0.2rem;
		writing-mode: vertical-rl;
		transform: rotate(-6deg);
	}

	.shot-close .koma-sfx {
		right: 0.2rem;
		bottom: 0.2rem;
		transform: rotate(-10deg);
	}

	@container (min-width: 480px) {
		.inner {
			grid-template-areas: 'box stage';
			grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
			grid-template-rows: minmax(0, 1fr);
			min-height: 230px;
		}

		.shot-close .inner {
			grid-template-areas: 'stage box';
			grid-template-columns: minmax(0, 1fr) minmax(0, 1.5fr);
			grid-template-rows: minmax(0, 1fr);
		}

		.shot-focus .inner,
		.shot-speed .inner,
		.shot-night .inner {
			grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
		}

		.shot-face .box,
		.shot-focus .box,
		.shot-speed .box,
		.shot-night .box {
			align-self: center;
		}

		.shot-close .box {
			align-self: end;
		}

		.aim {
			inset: 0 -66% 0 0;
		}

		.face {
			inset: calc(var(--pad) * -1) calc(var(--pad) * -1) calc(var(--pad) * -1) 0;
		}
	}

	/* side-by-side panels meet on a slant; the overlap is clipped away, so the gutter stays even */
	@media (min-width: 720px) {
		.koma {
			grid-column: span var(--cols);
			grid-row: span var(--rows);
		}

		.cut-r {
			margin-right: calc(var(--slant) * -0.5);
		}

		.cut-l {
			margin-left: calc(var(--slant) * -0.5);
		}

		.cut-r .cut {
			clip-path: polygon(0 0, 100% 0, calc(100% - var(--slant)) 100%, 0 100%);
		}

		.cut-l .cut {
			clip-path: polygon(var(--slant) 0, 100% 0, 100% 100%, 0 100%);
		}

		.lean.cut-r .cut {
			clip-path: polygon(0 0, calc(100% - var(--slant)) 0, 100% 100%, 0 100%);
		}

		.lean.cut-l .cut {
			clip-path: polygon(0 0, 100% 0, 100% 100%, var(--slant) 100%);
		}

		.cut-r .inner {
			padding-right: calc(var(--pad) + var(--slant));
		}

		.cut-l .inner {
			padding-left: calc(var(--pad) + var(--slant));
		}
	}
</style>
