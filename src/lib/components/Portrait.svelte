<script lang="ts">
	import { base } from '$app/paths';
	import { person } from '$lib/data/profile';
	import Silhouette from './Silhouette.svelte';

	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

{#if person.portrait}
	<img
		class="portrait {className}"
		src="{base}/{person.portrait}"
		alt="{person.nickname}, drawn manga style"
		loading="eager"
		decoding="async"
	/>
{:else}
	<Silhouette class="portrait {className}" />
{/if}

<style>
	img.portrait {
		mix-blend-mode: multiply;
		object-fit: cover;
	}
</style>
