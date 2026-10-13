<script lang="ts">
	import type { Snippet } from 'svelte';
	import { seeded } from '$lib/actions';

	interface Props {
		seed?: number;
		spikes?: number;
		tone?: 'white' | 'red' | 'ink';
		/** `burst` for a word or two; `box` keeps the jagged edge but fits a paragraph. */
		shape?: 'burst' | 'box';
		class?: string;
		children: Snippet;
	}

	let {
		seed = 3,
		spikes = 22,
		tone = 'white',
		shape = 'burst',
		class: className = '',
		children
	}: Props = $props();

	const points = $derived.by(() => {
		const rnd = seeded(seed);
		const pts: string[] = [];
		const add = (x: number, y: number) => pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
		if (shape === 'box') {
			// Spikes along each edge of a rectangle, `spikes` per edge, pointing outward.
			const c = 44;
			const corners = [
				[-c, -c],
				[c, -c],
				[c, c],
				[-c, c]
			];
			for (let e = 0; e < 4; e++) {
				const [x0, y0] = corners[e];
				const [x1, y1] = corners[(e + 1) % 4];
				const nx = (y1 - y0) / (2 * c);
				const ny = (x0 - x1) / (2 * c);
				for (let i = 0; i < spikes; i++) {
					const valley = i / spikes;
					const peak = (i + 0.35 + rnd() * 0.3) / spikes;
					const sink = rnd() * 1.2;
					const reach = 5 + rnd() * 3.5;
					add(x0 + (x1 - x0) * valley - nx * sink, y0 + (y1 - y0) * valley - ny * sink);
					add(x0 + (x1 - x0) * peak + nx * reach, y0 + (y1 - y0) * peak + ny * reach);
				}
			}
		} else {
			for (let i = 0; i < spikes * 2; i++) {
				const a = (i / (spikes * 2)) * Math.PI * 2;
				const r = i % 2 === 0 ? 48 + rnd() * 3 : 37 + rnd() * 4;
				add(Math.cos(a) * r, Math.sin(a) * r);
			}
		}
		return pts.join(' ');
	});
</script>

<div class="shout tone-{tone} shape-{shape} {className}">
	<svg viewBox="-52 -52 104 104" preserveAspectRatio="none" aria-hidden="true">
		<polygon {points} />
	</svg>
	<div class="text display">{@render children()}</div>
</div>

<style>
	.shout {
		position: relative;
		display: inline-grid;
		place-items: center;
	}

	svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	polygon {
		fill: var(--white);
		stroke: var(--ink);
		stroke-width: 3;
		stroke-linejoin: miter;
		vector-effect: non-scaling-stroke;
	}

	.tone-red polygon {
		fill: var(--red);
	}

	.tone-ink polygon {
		fill: var(--ink);
		stroke: var(--white);
	}

	.text {
		position: relative;
		padding: 1.5em 1.9em;
		text-align: center;
		line-height: 1;
	}

	/* the spikes' inner edge sits about 9% in from each side, so keep the text clear of it */
	.shape-box .text {
		padding: 2.2em 13%;
		line-height: 1.4;
		text-align: left;
	}

	.tone-red .text,
	.tone-ink .text {
		color: var(--white);
	}
</style>
