<script lang="ts">
	import { seeded } from '$lib/actions';

	interface Props {
		seed?: number;
		lines?: number;
		color?: string;
		class?: string;
	}

	let { seed = 5, lines = 44, color = 'var(--ink)', class: className = '' }: Props = $props();

	// Horizontal streaks, thick at the right edge and tapering to a point toward the left.
	const paths = $derived.by(() => {
		const rnd = seeded(seed);
		const out: string[] = [];
		for (let i = 0; i < lines; i++) {
			const y = rnd() * 100;
			const w = 0.2 + rnd() * 0.9;
			const tip = 8 + rnd() * 62;
			out.push(`M${tip.toFixed(1)} ${y.toFixed(1)}L100 ${(y - w).toFixed(1)}L100 ${(y + w).toFixed(1)}Z`);
		}
		return out.join('');
	});
</script>

<svg class="speed {className}" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
	<path d={paths} fill={color} />
</svg>

<style>
	.speed {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
