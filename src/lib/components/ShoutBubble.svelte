<script lang="ts">
	import type { Snippet } from 'svelte';
	import { seeded } from '$lib/actions';

	interface Props {
		seed?: number;
		spikes?: number;
		tone?: 'white' | 'red' | 'ink';
		class?: string;
		children: Snippet;
	}

	let { seed = 3, spikes = 22, tone = 'white', class: className = '', children }: Props = $props();

	const points = $derived.by(() => {
		const rnd = seeded(seed);
		const pts: string[] = [];
		for (let i = 0; i < spikes * 2; i++) {
			const a = (i / (spikes * 2)) * Math.PI * 2;
			const r = i % 2 === 0 ? 48 + rnd() * 3 : 37 + rnd() * 4;
			pts.push(`${(Math.cos(a) * r).toFixed(1)},${(Math.sin(a) * r).toFixed(1)}`);
		}
		return pts.join(' ');
	});
</script>

<div class="shout tone-{tone} {className}">
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

	.tone-red .text,
	.tone-ink .text {
		color: var(--white);
	}
</style>
