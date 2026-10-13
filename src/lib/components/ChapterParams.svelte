<script lang="ts">
	import type { Chapter } from '$lib/data/profile';
	import Redactable from './Redactable.svelte';

	interface Props {
		chapter: Chapter;
	}

	let { chapter }: Props = $props();

	const params = $derived([
		{ k: 'Role', v: chapter.role },
		{ k: 'Reach', v: chapter.reach },
		{ k: 'Period', v: chapter.when }
	]);
</script>

<!-- Parameters box: what I did, how far it reached, and when. -->
<dl class="params panel">
	<div class="params-head kicker"><span lang="ja">能力</span> Parameters</div>
	{#each params as param (param.k)}
		<div class="param">
			<dt class="kicker">{param.k}</dt>
			<dd><Redactable text={param.v} /></dd>
		</div>
	{/each}
</dl>

<style>
	.params {
		display: grid;
		align-content: start;
		gap: 0.4rem;
		margin: 0;
		padding: 0.7rem 0.9rem 0.8rem;
	}

	.params-head {
		padding-bottom: 0.35rem;
		margin-bottom: 0.15rem;
		border-bottom: var(--line-thin) solid var(--ink);
	}

	.params-head span {
		color: var(--red);
		font-family: var(--font-display);
		letter-spacing: 0.1em;
	}

	.param {
		display: grid;
		grid-template-columns: 4.4rem minmax(0, 1fr);
		gap: 0.5rem;
		align-items: baseline;
	}

	dt {
		color: var(--ink-faint);
	}

	dd {
		margin: 0;
		font-size: 0.88rem;
		font-weight: 700;
		line-height: 1.35;
	}
</style>
