<script lang="ts">
	import { base } from '$app/paths';
	import { person } from '$lib/data/profile';
	import Silhouette from './Silhouette.svelte';

	interface Props {
		variant?: 'full' | 'bust';
		eager?: boolean;
		class?: string;
	}

	let { variant = 'full', eager = false, class: className = '' }: Props = $props();

	const src = $derived(person.portrait ? `${base}/${person.portrait[variant]}` : null);
</script>

{#if person.portrait && src}
	<picture class="art {className}">
		<source srcset="{src}.webp" type="image/webp" />
		<img
			src="{src}.jpg"
			alt={person.portrait.alt}
			loading={eager ? 'eager' : 'lazy'}
			fetchpriority={eager ? 'high' : 'auto'}
			decoding="async"
		/>
	</picture>
{:else}
	<Silhouette class="silhouette {className}" />
{/if}

<style>
	.art {
		display: block;
	}

	.art img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: var(--art-pos, center);
		/* the art is printed on our paper, not pasted over it */
		mix-blend-mode: multiply;
	}
</style>
