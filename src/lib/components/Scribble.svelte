<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<!-- hand-drawn loop, drawn on with stroke-dashoffset -->
<svg class="scribble {className}" viewBox="0 0 300 90" preserveAspectRatio="none" aria-hidden="true">
	<path
		pathLength="1"
		d="M24 52 C20 22 110 8 186 12 C252 16 296 32 288 54 C280 78 190 86 120 82 C56 79 8 66 14 44 C19 28 60 18 96 15"
	/>
</svg>

<style>
	.scribble {
		position: absolute;
		left: -9%;
		top: -24%;
		width: 116%;
		height: 150%;
		overflow: visible;
		pointer-events: none;
	}

	path {
		fill: none;
		stroke: var(--red);
		stroke-width: 3.2;
		stroke-linecap: round;
		vector-effect: non-scaling-stroke;
		stroke-dasharray: 1;
		stroke-dashoffset: 1;
		animation: draw 0.7s 0.15s var(--ease-out) forwards;
	}

	@keyframes draw {
		to {
			stroke-dashoffset: 0;
		}
	}
</style>
