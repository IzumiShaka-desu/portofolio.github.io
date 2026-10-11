<script lang="ts">
	import { person } from '$lib/data/profile';
	import ArcSwitcher from './ArcSwitcher.svelte';

	let scrolled = $state(false);
</script>

<svelte:window onscroll={() => (scrolled = window.scrollY > 24)} />

<nav class:scrolled aria-label="Main">
	<div class="wrap bar">
		<a class="brand" href="#top">
			<span class="display">{person.nickname.toUpperCase()}</span><span class="dot">.</span>
			<span class="vol kicker">Vol.01</span>
		</a>
		<div class="links kicker">
			<a href="#chapters">Chapters</a>
			<a href="#profile">Profile</a>
			<a href="#arsenal">Arsenal</a>
			<a href="#contact">Contact</a>
		</div>
		<div class="arc">
			<span class="arc-label kicker">Arc</span>
			<ArcSwitcher size="inline" />
		</div>
	</div>
</nav>

<style>
	nav {
		position: sticky;
		top: 0;
		z-index: 50;
		background: color-mix(in srgb, var(--paper) 92%, transparent);
		backdrop-filter: blur(6px);
		border-bottom: var(--line) solid transparent;
		transition: border-color 0.2s;
	}

	nav.scrolled {
		border-bottom-color: var(--ink);
	}

	.bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		height: 60px;
	}

	.brand {
		display: inline-flex;
		align-items: baseline;
		gap: 0.1rem;
		text-decoration: none;
		font-size: 1.35rem;
	}

	.dot {
		color: var(--red);
		font-family: var(--font-display);
	}

	.vol {
		margin-left: 0.5rem;
		color: var(--ink-faint);
	}

	.links {
		display: none;
		gap: 1.6rem;
	}

	.links a {
		text-decoration: none;
		position: relative;
	}

	.links a::after {
		content: '';
		position: absolute;
		left: 0;
		right: 100%;
		bottom: -4px;
		height: 2px;
		background: var(--red);
		transition: right 0.2s var(--ease-out);
	}

	.links a:hover::after {
		right: 0;
	}

	.arc {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.arc-label {
		color: var(--ink-faint);
	}

	@media (min-width: 820px) {
		.links {
			display: flex;
		}
	}

	@media (max-width: 420px) {
		.vol,
		.arc-label {
			display: none;
		}
	}
</style>
