<script lang="ts">
	import { seeded } from '$lib/actions';

	interface Props {
		count?: number;
		seed?: number;
	}

	let { count = 9, seed = 5 }: Props = $props();

	const petals = $derived.by(() => {
		const rnd = seeded(seed);
		return Array.from({ length: count }, () => ({
			x: Math.round(rnd() * 100),
			drift: Math.round(20 + rnd() * 70),
			size: Math.round(9 + rnd() * 9),
			dur: (7 + rnd() * 7).toFixed(1),
			delay: (-rnd() * 14).toFixed(1),
			spin: Math.round(180 + rnd() * 360)
		}));
	});
</script>

<!-- サァァ… a few petals drifting through the panel -->
<div class="petals" aria-hidden="true">
	{#each petals as p, i (i)}
		<svg
			class="petal"
			viewBox="0 0 20 20"
			style="--x: {p.x}%; --drift: -{p.drift}px; --size: {p.size}px; --dur: {p.dur}s; --delay: {p.delay}s; --spin: {p.spin}deg"
		>
			<path d="M10 19 C4.5 15.5 2 10 4.2 5.2 C5.6 2.4 8 2.4 10 5 C12 2.4 14.4 2.4 15.8 5.2 C18 10 15.5 15.5 10 19 Z" />
		</svg>
	{/each}
</div>

<style>
	.petals {
		position: absolute;
		inset: 0;
		overflow: hidden;
		pointer-events: none;
		z-index: 1;
		container-type: size;
	}

	.petal {
		position: absolute;
		top: -24px;
		left: var(--x);
		width: var(--size);
		height: var(--size);
		animation: fall var(--dur) linear var(--delay) infinite;
	}

	path {
		fill: var(--white);
		stroke: var(--ink);
		stroke-width: 1.6;
		stroke-linejoin: round;
	}

	@keyframes fall {
		from {
			transform: translate(0, 0) rotate(0deg);
		}
		50% {
			transform: translate(calc(var(--drift) * 0.4), 55cqh) rotate(calc(var(--spin) * 0.5));
		}
		to {
			transform: translate(var(--drift), 110cqh) rotate(var(--spin));
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.petals {
			display: none;
		}
	}
</style>
