<script lang="ts">
	import type { Chapter } from '$lib/data/profile';
	import { illustrations } from '$lib/illustrations';
	import Redactable from './Redactable.svelte';
	import SpeechBubble from './SpeechBubble.svelte';

	interface Props {
		chapter: Chapter;
		/** Entry number, already padded. */
		num: string;
		heading: 'h1' | 'h3';
		headingId: string;
	}

	let { chapter, num, heading, headingId }: Props = $props();

	const Illo = $derived(illustrations[chapter.illustration]);
</script>

<!-- The chapter's art panel: entry number, quote, illustration, and the outlined name across the bottom.
     Set --art-min on a parent to size it. -->
<div class="art panel" class:classified={chapter.classified}>
	<div class="art-tone" aria-hidden="true"></div>
	<p class="entry">
		<span class="entry-no display">{num}</span>
		<span class="entry-kana" lang="ja"><Redactable text={chapter.kana} /></span>
	</p>
	<div class="art-bubble">
		<SpeechBubble tail="bl">{chapter.quote}</SpeechBubble>
	</div>
	<div class="illo"><Illo /></div>
	<svelte:element this={heading} id={headingId} class="art-title"><Redactable text={chapter.title} /></svelte:element>
</div>

<style>
	.art {
		container-type: inline-size;
		display: flex;
		flex-direction: column;
		height: 100%;
		min-height: var(--art-min, 340px);
		background: var(--white);
	}

	.art-tone {
		position: absolute;
		inset: 0;
		background-image: radial-gradient(var(--ink) 30%, transparent 32%);
		background-size: 6px 6px;
		-webkit-mask-image: radial-gradient(ellipse at 50% 46%, transparent 32%, #000 88%);
		mask-image: radial-gradient(ellipse at 50% 46%, transparent 32%, #000 88%);
		opacity: 0.6;
	}

	.classified .art-tone {
		opacity: 0.85;
	}

	.entry {
		position: absolute;
		top: 12px;
		left: 12px;
		z-index: 2;
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
		padding: 0.2rem 0.65rem 0.3rem;
		background: var(--white);
		border: var(--line-thin) solid var(--ink);
	}

	.entry-no {
		font-size: 1.7rem;
		line-height: 1;
		color: var(--red);
	}

	.entry-kana {
		font-family: var(--font-display);
		font-size: 1rem;
	}

	.art-bubble {
		position: absolute;
		top: 3.9rem;
		right: 10px;
		z-index: 2;
		max-width: 56%;
	}

	.art-bubble :global(.body) {
		font-size: 0.8rem;
		padding: 0.9em 1.2em;
	}

	.illo {
		position: relative;
		z-index: 1;
		flex: 1;
		display: grid;
		place-items: center;
		padding: 6.2rem 0.6rem 3.4rem;
	}

	.illo :global(svg) {
		width: min(100%, 360px);
		height: auto;
	}

	/* outlined name across the bottom, encyclopedia style */
	.art-title {
		position: absolute;
		left: 12px;
		right: 8px;
		bottom: 4px;
		z-index: 2;
		margin: 0;
		font-family: var(--font-display);
		font-weight: 400;
		font-size: min(4rem, 15cqi);
		line-height: 0.95;
		letter-spacing: 0.02em;
		text-transform: uppercase;
		color: var(--white);
		-webkit-text-stroke: 7px var(--ink);
		paint-order: stroke fill;
		text-shadow: 4px 4px 0 var(--ink);
		transform: rotate(-3deg);
		transform-origin: left bottom;
	}
</style>
