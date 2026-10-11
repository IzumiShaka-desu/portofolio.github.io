<script lang="ts">
	import { seeded } from '$lib/actions';

	interface Props {
		seed?: number;
		rays?: number;
		/** Clear area in the middle, as a fraction of the half-width / half-height. */
		innerX?: number;
		innerY?: number;
		color?: string;
		class?: string;
	}

	let {
		seed = 7,
		rays = 120,
		innerX = 0.55,
		innerY = 0.5,
		color = 'var(--ink)',
		class: className = ''
	}: Props = $props();

	const paths = $derived.by(() => {
		const rnd = seeded(seed);
		const out: string[] = [];
		const R = 170;
		for (let i = 0; i < rays; i++) {
			const a = ((i + rnd() * 0.8) / rays) * Math.PI * 2;
			const w = (0.004 + rnd() * 0.014) * Math.PI;
			const reach = 0.85 + rnd() * 0.5;
			const tx = Math.cos(a) * innerX * 100 * reach;
			const ty = Math.sin(a) * innerY * 100 * reach;
			const x1 = Math.cos(a - w) * R;
			const y1 = Math.sin(a - w) * R;
			const x2 = Math.cos(a + w) * R;
			const y2 = Math.sin(a + w) * R;
			out.push(`M${tx.toFixed(1)} ${ty.toFixed(1)}L${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}Z`);
		}
		return out.join('');
	});
</script>

<svg class="focus {className}" viewBox="-100 -100 200 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
	<path d={paths} fill={color} />
</svg>

<style>
	.focus {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
	}
</style>
