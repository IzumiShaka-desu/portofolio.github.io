<script lang="ts">
	import { arc } from '$lib/arc.svelte';
	import FocusLines from './FocusLines.svelte';

	const words = ['ドン!', 'バン!', 'ズバッ!'];
	let shown = $state<{ id: number; word: string } | null>(null);
	let timer: ReturnType<typeof setTimeout> | undefined;
	// Only switches made while this page is open get a burst, not ones from a page visited before.
	const initial = arc.switches;

	$effect(() => {
		const n = arc.switches;
		if (n === initial) return;
		if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
		shown = { id: n, word: words[n % words.length] };
		clearTimeout(timer);
		timer = setTimeout(() => (shown = null), 750);
	});
</script>

{#if shown}
	{#key shown.id}
		<div class="burst" aria-hidden="true">
			<FocusLines seed={shown.id * 13} rays={90} innerX={0.42} innerY={0.36} />
			<span class="sfx red word">{shown.word}</span>
		</div>
	{/key}
{/if}

<style>
	.burst {
		position: fixed;
		inset: 0;
		z-index: 100;
		display: grid;
		place-items: center;
		pointer-events: none;
		animation: burst-fade 0.75s ease-out forwards;
	}

	.burst :global(.focus) {
		opacity: 0.85;
		animation: burst-lines 0.75s var(--ease-out) forwards;
	}

	.word {
		position: relative;
		font-size: clamp(5rem, 18vw, 13rem);
		-webkit-text-stroke: 10px var(--white);
		transform: rotate(-8deg);
		animation: burst-word 0.75s var(--ease-snap) forwards;
	}

	@keyframes burst-fade {
		0%,
		70% {
			opacity: 1;
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes burst-lines {
		from {
			transform: scale(1.25);
		}
		to {
			transform: scale(1);
		}
	}

	@keyframes burst-word {
		0% {
			transform: rotate(-8deg) scale(2.2);
			opacity: 0;
		}
		30% {
			transform: rotate(-8deg) scale(0.95);
			opacity: 1;
		}
		45% {
			transform: rotate(-6deg) scale(1.04);
		}
		100% {
			transform: rotate(-8deg) scale(1);
		}
	}
</style>
