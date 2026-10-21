<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		/** Page number, printed in the bottom outer corner. */
		no: number;
		/** Running line down the outer margin, as in a manga magazine. */
		hashira?: string;
		class?: string;
		children: Snippet;
	}

	let { no, hashira = '', class: className = '', children }: Props = $props();

	// As in a printed book, odd pages sit on the right, so their outer edge is the right one.
	const side = $derived(no % 2 ? 'r' : 'l');
</script>

<!-- One printed page of the chapter: white margins around the panels, a page number, and a running line. -->
<div class="page side-{side} {className}">
	{#if hashira}
		<span class="hashira" aria-hidden="true"><span class="hashira-mark" lang="ja">読切</span>{hashira}</span>
	{/if}
	{@render children()}
	<span class="nombre" aria-hidden="true">{no}</span>
</div>

<style>
	.page {
		position: relative;
		padding: clamp(12px, 2.6vw, 28px);
		padding-bottom: 2.6rem;
		background: var(--white);
		border: var(--line-thin) solid var(--ink);
		box-shadow: 6px 6px 0 var(--ink);
	}

	.nombre {
		position: absolute;
		bottom: 0.7rem;
		font-family: var(--font-display);
		font-size: 0.85rem;
		line-height: 1;
	}

	.side-r .nombre {
		right: 1.1rem;
	}

	.side-l .nombre {
		left: 1.1rem;
	}

	.hashira {
		display: none;
	}

	@media (min-width: 900px) {
		.page {
			padding-inline: 44px;
		}

		.hashira {
			position: absolute;
			top: 44px;
			display: flex;
			align-items: center;
			gap: 0.6em;
			writing-mode: vertical-rl;
			font-family: var(--font-mono);
			font-size: 0.64rem;
			letter-spacing: 0.14em;
			text-transform: uppercase;
			color: var(--ink-faint);
			white-space: nowrap;
		}

		.side-r .hashira {
			right: 13px;
		}

		.side-l .hashira {
			left: 13px;
		}

		.hashira-mark {
			padding: 0.4em 0.15em;
			background: var(--red);
			color: var(--white);
			font-family: var(--font-display);
			font-size: 1.15em;
			letter-spacing: 0.1em;
		}
	}
</style>
