<script lang="ts">
	import { arc } from '$lib/arc.svelte';
	import { arcs, arcOrder, type ArcId } from '$lib/data/profile';
	import Scribble from './Scribble.svelte';

	interface Props {
		size?: 'hero' | 'inline';
	}

	let { size = 'hero' }: Props = $props();

	let open = $state(false);
	let root: HTMLElement;
	const listId = $derived(`arc-list-${size}`);

	function choose(id: ArcId) {
		arc.set(id);
		open = false;
	}

	function onWindowClick(event: MouseEvent) {
		if (open && root && !root.contains(event.target as Node)) open = false;
	}

	function onKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') open = false;
	}
</script>

<svelte:window onclick={onWindowClick} onkeydown={onKeydown} />

<span class="switcher {size}" bind:this={root}>
	<button
		type="button"
		class="trigger"
		aria-haspopup="true"
		aria-expanded={open}
		aria-controls={listId}
		onclick={() => (open = !open)}
	>
		{#key arc.current}
			<span class="label">{arc.data.label}</span>
			{#if size === 'hero'}<Scribble />{/if}
		{/key}
		<svg class="caret" viewBox="0 0 12 8" aria-hidden="true"><path d="M1 1.5 L6 6.5 L11 1.5" /></svg>
		<span class="sr-only">, switch arc</span>
	</button>

	{#if open}
		<span class="menu" id={listId}>
			<span class="menu-title kicker">Choose an arc</span>
			{#each arcOrder as id (id)}
				<button
					type="button"
					class="option"
					aria-pressed={arc.current === id}
					onclick={() => choose(id)}
				>
					<span class="dot" aria-hidden="true"></span>
					{arcs[id].label}
				</button>
			{/each}
		</span>
	{/if}
</span>

<style>
	.switcher {
		position: relative;
		display: inline-block;
	}

	.trigger {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: 0.25em;
		padding: 0;
		border: 0;
		background: none;
		color: var(--red);
		font: inherit;
		cursor: pointer;
		text-align: left;
	}

	.hero .trigger {
		color: var(--ink);
	}

	.label {
		position: relative;
		white-space: nowrap;
	}

	.hero .label {
		color: var(--ink);
		background: linear-gradient(transparent 62%, rgba(224, 38, 27, 0.18) 62%);
	}

	.inline .trigger {
		font-family: var(--font-mono);
		font-size: 0.75rem;
		font-weight: 500;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		padding: 0.35em 0.7em;
		border: var(--line-thin) solid var(--ink);
		background: var(--white);
		color: var(--ink);
		box-shadow: 2px 2px 0 var(--ink);
	}

	.caret {
		width: 0.42em;
		min-width: 10px;
		height: auto;
		margin-left: 0.15em;
		transition: transform 0.2s var(--ease-out);
	}

	.inline .caret {
		width: 10px;
	}

	.caret path {
		fill: none;
		stroke: var(--red);
		stroke-width: 2.2;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	[aria-expanded='true'] .caret {
		transform: rotate(180deg);
	}

	.menu {
		position: absolute;
		z-index: 30;
		top: calc(100% + 14px);
		left: 0;
		display: flex;
		flex-direction: column;
		gap: 2px;
		min-width: 15rem;
		padding: 0.7rem;
		background: var(--white);
		border: var(--line) solid var(--ink);
		box-shadow: 6px 6px 0 var(--ink);
		font-size: 1rem;
		animation: pop 0.22s var(--ease-snap);
		transform-origin: 1.5rem 0;
	}

	.inline .menu {
		left: auto;
		right: 0;
		transform-origin: calc(100% - 1.5rem) 0;
	}

	/* little speech-bubble tail */
	.menu::before {
		content: '';
		position: absolute;
		top: -13px;
		left: 1.4rem;
		width: 18px;
		height: 18px;
		background: var(--white);
		border-left: var(--line) solid var(--ink);
		border-top: var(--line) solid var(--ink);
		transform: rotate(45deg) skew(8deg, 8deg);
	}

	.inline .menu::before {
		left: auto;
		right: 1.4rem;
	}

	.menu-title {
		color: var(--ink-faint);
		padding: 0.1rem 0.5rem 0.4rem;
	}

	.option {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.55rem 0.6rem;
		border: 0;
		background: none;
		font-family: var(--font-display);
		font-size: 1.05rem;
		color: var(--ink);
		text-align: left;
		cursor: pointer;
	}

	.option:hover {
		background: var(--paper);
	}

	.dot {
		width: 12px;
		height: 12px;
		border: var(--line-thin) solid var(--ink);
		border-radius: 50%;
		flex: none;
	}

	.option[aria-pressed='true'] .dot {
		background: var(--red);
		border-color: var(--red);
	}

	@keyframes pop {
		from {
			opacity: 0;
			transform: scale(0.85) translateY(-6px);
		}
	}
</style>
