<script lang="ts">
	import { fade } from 'svelte/transition';
	import { arc } from '$lib/arc.svelte';
	import { chapters, sideStories } from '$lib/data/profile';
	import { reveal } from '$lib/actions';
	import ChapterPage from './ChapterPage.svelte';

	const list = $derived(arc.data.chapters.map((id) => chapters[id]));
	const sides = $derived(arc.data.sideStories.map((id) => sideStories[id]));
</script>

<section class="chapters" id="chapters" aria-labelledby="chapters-title">
	<div class="wrap">
		<div class="section-head" use:reveal>
			<h2 id="chapters-title"><span class="jp" lang="ja">収録作品</span>Chapters</h2>
			<p class="sorted lettering">
				sorted for the <span class="arc-name">{arc.data.label}</span> arc · {list.length} chapters
			</p>
		</div>

		{#key arc.current}
			<div class="stack" in:fade={{ duration: 250 }}>
				{#each list as chapter, i (chapter.id)}
					<ChapterPage {chapter} index={i} total={list.length} arcId={arc.current} />
				{/each}
			</div>

			<div class="sides" in:fade={{ duration: 250 }}>
				<h3 class="sides-title"><span class="jp" lang="ja">外伝</span> Side stories</h3>
				<ul>
					{#each sides as story, i (story.id)}
						<li class="side panel" use:reveal style="--delay: {i * 0.07}s; --tilt: {i % 2 ? 1 : -1}deg">
							<p class="kicker kind">{story.kind}</p>
							<h4 class="display">{story.title}</h4>
							<p class="text">{story.text}</p>
							{#if story.link}
								<a class="side-link kicker" href={story.link.href} target="_blank" rel="noopener">{story.link.label} ↗</a>
							{/if}
						</li>
					{/each}
				</ul>
			</div>
		{/key}
	</div>
</section>

<style>
	.chapters {
		padding-block: clamp(40px, 7vw, 96px);
	}

	.sorted {
		font-size: clamp(0.95rem, 1.6vw, 1.15rem);
		color: var(--ink-soft);
	}

	.arc-name {
		color: var(--red);
		border-bottom: 2px solid var(--red);
	}

	.sides {
		margin-top: clamp(48px, 8vw, 96px);
	}

	.sides-title {
		display: flex;
		align-items: baseline;
		gap: 0.7rem;
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(1.5rem, 3vw, 2.2rem);
		margin-bottom: 1.4rem;
	}

	.sides-title .jp {
		color: var(--red);
		font-size: 0.6em;
		letter-spacing: 0.2em;
	}

	.sides ul {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr));
		gap: var(--gutter);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.side {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding: 1.1rem 1.1rem 1.2rem;
		box-shadow: 5px 5px 0 var(--ink);
	}

	.kind {
		color: var(--red);
	}

	h4 {
		font-size: 1.25rem;
		line-height: 1.1;
		margin: 0;
	}

	.text {
		font-size: 0.92rem;
		line-height: 1.5;
		color: var(--ink-soft);
		flex: 1;
	}

	.side-link {
		align-self: flex-start;
		text-decoration: none;
		border-bottom: 2px solid var(--ink);
		padding-bottom: 1px;
	}

	.side-link:hover {
		color: var(--red);
		border-color: var(--red);
	}
</style>
