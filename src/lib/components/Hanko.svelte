<script lang="ts">
	interface Props {
		top?: string;
		main: string;
		bottom?: string;
		round?: boolean;
		class?: string;
	}

	let { top = '', main, bottom = '', round = false, class: className = '' }: Props = $props();
</script>

<div class="hanko {round ? 'round' : ''} {className}" aria-hidden="true">
	{#if top}<span class="small">{top}</span>{/if}
	<span class="main">{main}</span>
	{#if bottom}<span class="small">{bottom}</span>{/if}
</div>

<style>
	.hanko {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.15em;
		padding: 0.45em 0.55em;
		border: 3px solid var(--red);
		outline: 1.5px solid var(--red);
		outline-offset: -7px;
		border-radius: 6px;
		color: var(--red);
		text-align: center;
		mix-blend-mode: multiply;
		/* worn-ink texture */
		-webkit-mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.3 1.55'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23m)'/%3E%3C/svg%3E");
		mask-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='m'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='2'/%3E%3CfeColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 -1.3 1.55'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23m)'/%3E%3C/svg%3E");
		user-select: none;
	}

	.round {
		border-radius: 50%;
		aspect-ratio: 1;
		padding: 0.6em;
	}

	.main {
		font-family: var(--font-display);
		font-size: 1.5em;
		line-height: 1;
	}

	.small {
		font-family: var(--font-mono);
		font-size: 0.5em;
		font-weight: 500;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		line-height: 1.2;
	}
</style>
