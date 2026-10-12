<script lang="ts">
	import { parseRedactions } from '$lib/text';

	interface Props {
		text: string;
	}

	let { text }: Props = $props();

	const parts = $derived(parseRedactions(text));
</script>

{#each parts as part, i (i)}{#if 'redacted' in part}<span
			class="redact"
			style="--len: {part.redacted}"
			title="Redacted: under NDA"><span class="sr-only">[redacted]</span></span
		>{:else}{part.text}{/if}{/each}

<style>
	.redact {
		display: inline-block;
		width: calc(var(--len) * 0.52em);
		height: 0.92em;
		margin-inline: 0.08em;
		vertical-align: -0.12em;
		background: var(--ink);
		transform: rotate(-0.8deg) skewX(-4deg);
		box-shadow: 0.08em 0.06em 0 var(--red);
		cursor: help;
	}
</style>
