<script lang="ts">
	import { onMount } from 'svelte';
	import { arc } from '$lib/arc.svelte';
	import { person } from '$lib/data/profile';
	import Nav from '$lib/components/Nav.svelte';
	import Cover from '$lib/components/Cover.svelte';
	import Chapters from '$lib/components/Chapters.svelte';
	import Special from '$lib/components/Special.svelte';
	import Profile from '$lib/components/Profile.svelte';
	import Arsenal from '$lib/components/Arsenal.svelte';
	import Finale from '$lib/components/Finale.svelte';
	import SfxBurst from '$lib/components/SfxBurst.svelte';

	const title = `${person.nickname} · ${person.title} | ${person.name}`;
	const description =
		'Product Engineer with 4+ years shipping mobile apps and the systems behind them: a 1M+ download POS app, a real-time trading app, and a warehouse ERP built end to end.';

	onMount(() => arc.hydrate());
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta name="twitter:card" content="summary" />
</svelte:head>

<a class="skip" href="#chapters">Skip to chapters</a>
<Nav />
<main>
	<Cover />
	<Chapters />
	<Special />
	<Profile />
	<Arsenal />
	<Finale />
</main>
<SfxBurst />
