<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		tail?: 'bl' | 'br' | 'l' | 'r' | 'none';
		class?: string;
		children: Snippet;
	}

	let { tail = 'bl', class: className = '', children }: Props = $props();
</script>

<div class="bubble tail-{tail} {className}">
	<div class="body lettering">{@render children()}</div>
	{#if tail !== 'none'}
		<svg class="tail" viewBox="0 0 34 30" aria-hidden="true">
			<path d="M3 0 Q 10 16 1 29 Q 20 20 29 0" />
		</svg>
	{/if}
</div>

<style>
	.bubble {
		position: relative;
		display: inline-block;
		max-width: 100%;
	}

	.body {
		position: relative;
		background: var(--white);
		border: var(--line) solid var(--ink);
		border-radius: 50%;
		padding: 1.1em 1.6em;
		text-align: center;
		font-size: clamp(0.85rem, 1.4vw, 1.05rem);
	}

	.tail {
		position: absolute;
		width: 34px;
		height: 30px;
		overflow: visible;
	}

	.tail path {
		fill: var(--white);
		stroke: var(--ink);
		stroke-width: 3;
		stroke-linejoin: round;
	}

	.tail-bl .tail {
		top: calc(100% - 4px);
		left: 24%;
	}

	.tail-br .tail {
		top: calc(100% - 4px);
		right: 24%;
		transform: scaleX(-1);
	}

	.tail-l .tail {
		top: 55%;
		right: calc(100% - 6px);
		transform: rotate(90deg);
	}

	.tail-r .tail {
		top: 55%;
		left: calc(100% - 6px);
		transform: rotate(-90deg) scaleX(-1);
	}
</style>
