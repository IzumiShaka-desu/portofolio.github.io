<script lang="ts">
	import { onMount } from 'svelte';
	import { arc } from '$lib/arc.svelte';
	import { person } from '$lib/data/profile';
	import { plainText } from '$lib/text';
	import Nav from '$lib/components/Nav.svelte';
	import ChapterDetail from '$lib/components/ChapterDetail.svelte';
	import Finale from '$lib/components/Finale.svelte';
	import SfxBurst from '$lib/components/SfxBurst.svelte';

	let { data } = $props();

	const chapter = $derived(data.chapter);
	const title = $derived(`${plainText(chapter.title)} · ${person.nickname} | ${person.name}`);
	const description = $derived(plainText(`${chapter.tagline}. ${chapter.impact}`));

	onMount(() => arc.hydrate());
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:type" content="article" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<a class="skip" href="#chapter">Skip to the chapter</a>
<Nav />
<main>
	{#key chapter.id}
		<ChapterDetail {chapter} />
	{/key}
	<Finale />
</main>
<SfxBurst />
