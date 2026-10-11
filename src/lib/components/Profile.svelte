<script lang="ts">
	import { arc } from '$lib/arc.svelte';
	import { person, stats, storySoFar } from '$lib/data/profile';
	import { countUp, reveal } from '$lib/actions';
	import Portrait from './Portrait.svelte';

	const facts = $derived([
		{ k: 'Name', v: person.name },
		{ k: 'Alias', v: person.nickname },
		{ k: 'Class', v: arc.data.classTitle },
		{ k: 'Base', v: person.location },
		{ k: 'Education', v: person.education },
		{ k: 'Special move', v: arc.data.specialMove },
		{
			k: 'Sidekick',
			v: 'Claude. Plans, drafts and tests with me; I review every line and make the calls.'
		}
	]);
</script>

<section class="profile" id="profile" aria-labelledby="profile-title">
	<div class="wrap">
		<div class="section-head" use:reveal>
			<h2 id="profile-title"><span class="jp" lang="ja">キャラ紹介</span>Character profile</h2>
			<p class="lettering sub">from the official databook (it's this page)</p>
		</div>

		<div class="databook">
			<div class="card panel" use:reveal>
				<div class="card-art tone" aria-hidden="true">
					<Portrait class="card-portrait" />
					<span class="sfx card-sfx" lang="ja">ドドド</span>
				</div>
				<dl class="facts">
					{#each facts as fact (fact.k)}
						<div class="fact">
							<dt class="kicker">{fact.k}</dt>
							<dd>{fact.v}</dd>
						</div>
					{/each}
				</dl>
			</div>

			<div class="stats">
				{#each stats as stat, i (stat.label)}
					<div class="stat panel" use:reveal style="--delay: {i * 0.08}s; --tilt: {i % 2 ? 1.2 : -1.2}deg">
						<p class="num display">
							<span use:countUp={stat.value}>{stat.value}</span><span class="suffix">{stat.suffix}</span>
						</p>
						<p class="stat-label lettering">{stat.label}</p>
						<p class="stat-note kicker">{stat.note}</p>
					</div>
				{/each}
			</div>
		</div>

		<div class="story">
			<h3 class="story-title" use:reveal>
				<span class="jp" lang="ja">これまでのあらすじ</span>
				The story so far
			</h3>
			<div class="strips">
				{#each [storySoFar.slice(0, 4), storySoFar.slice(4)] as strip, s (s)}
					<ol class="strip" start={s * 4 + 1}>
						{#each strip as beat, i (beat.year + beat.title)}
							<li class="beat panel" use:reveal style="--delay: {i * 0.08}s">
								<span class="beat-no kicker">{s * 4 + i + 1}</span>
								<p class="year display">{beat.year}</p>
								<p class="beat-title lettering">{beat.title}</p>
								<p class="beat-text">{beat.text}</p>
								<span class="sfx beat-sfx" lang="ja" aria-hidden="true">{beat.sfx}</span>
							</li>
						{/each}
					</ol>
				{/each}
			</div>
			<p class="tbc lettering" use:reveal>…and the current chapter is still being drawn.</p>
		</div>
	</div>
</section>

<style>
	.profile {
		padding-block: clamp(56px, 9vw, 120px);
	}

	.sub {
		color: var(--ink-faint);
		font-size: 0.95rem;
	}

	.databook {
		display: grid;
		gap: clamp(20px, 3vw, 32px);
	}

	.card {
		display: grid;
		box-shadow: 8px 8px 0 var(--ink);
	}

	.card-art {
		position: relative;
		min-height: 260px;
		border-bottom: var(--line) solid var(--ink);
		background-color: var(--paper);
		background-size: 6px 6px;
		overflow: hidden;
	}

	.card-art::before {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(to bottom, var(--paper) 10%, transparent 90%);
	}

	.card-art :global(.card-portrait) {
		position: absolute;
		bottom: 0;
		left: 50%;
		width: min(70%, 240px);
		height: auto;
		transform: translateX(-50%);
	}

	.card-sfx {
		position: absolute;
		top: 14px;
		left: 12px;
		z-index: 1;
		font-size: 2.2rem;
		writing-mode: vertical-rl;
		letter-spacing: -0.08em;
	}

	.facts {
		margin: 0;
		padding: clamp(16px, 2.4vw, 26px);
		display: grid;
		gap: 0.75rem;
	}

	.fact {
		display: grid;
		grid-template-columns: 7.5rem 1fr;
		gap: 0.8rem;
		align-items: baseline;
		padding-bottom: 0.7rem;
		border-bottom: 1.5px dashed rgba(20, 20, 20, 0.25);
	}

	.fact:last-child {
		border-bottom: 0;
		padding-bottom: 0;
	}

	dt {
		color: var(--red);
	}

	dd {
		margin: 0;
		font-size: 0.98rem;
	}

	.stats {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: var(--gutter);
		align-content: start;
	}

	.stat {
		container-type: inline-size;
		padding: clamp(14px, 2.2vw, 22px);
		box-shadow: 5px 5px 0 var(--ink);
	}

	.num {
		font-size: min(4.2rem, 27cqi);
		line-height: 1;
	}

	.suffix {
		color: var(--red);
	}

	.stat-label {
		margin-top: 0.4rem;
		font-size: 1.05rem;
	}

	.stat-note {
		margin-top: 0.3rem;
		color: var(--ink-faint);
		font-size: 0.66rem;
	}

	.story {
		margin-top: clamp(56px, 9vw, 110px);
	}

	.story-title {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(1.8rem, 4vw, 2.8rem);
		line-height: 1;
		margin-bottom: 1.6rem;
	}

	.story-title .jp {
		display: block;
		color: var(--red);
		font-size: 0.4em;
		letter-spacing: 0.2em;
		margin-bottom: 0.5rem;
	}

	.strips {
		display: grid;
		gap: var(--gutter);
	}

	.strip {
		display: grid;
		gap: var(--gutter);
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.beat {
		min-height: 150px;
		padding: 1rem 1.1rem 1.1rem;
	}

	.beat:nth-child(even) {
		background-image: radial-gradient(rgba(20, 20, 20, 0.12) 26%, transparent 28%);
		background-size: 5px 5px;
		background-color: var(--white);
	}

	.beat-no {
		position: absolute;
		top: 0;
		right: 0;
		padding: 0.2rem 0.55rem;
		background: var(--ink);
		color: var(--white);
	}

	.year {
		font-size: 1.6rem;
		color: var(--red);
	}

	.beat-title {
		margin-top: 0.3rem;
		font-size: 1.05rem;
	}

	.beat-text {
		position: relative;
		z-index: 1;
		margin-top: 0.35rem;
		font-size: 0.92rem;
		line-height: 1.5;
		color: var(--ink-soft);
		max-width: 40ch;
	}

	.beat-sfx {
		position: absolute;
		right: 12px;
		bottom: 10px;
		font-size: 1.35rem;
		transform: rotate(-8deg);
		-webkit-text-stroke: 5px var(--white);
	}

	.tbc {
		margin-top: 1.4rem;
		text-align: right;
		color: var(--ink-faint);
	}

	@media (min-width: 900px) {
		.databook {
			grid-template-columns: 1.15fr 0.85fr;
			align-items: start;
		}

		.card {
			grid-template-columns: 0.75fr 1fr;
		}

		.card-art {
			border-bottom: 0;
			border-right: var(--line) solid var(--ink);
		}

		.stats {
			grid-template-columns: 1fr 1fr;
		}

		.strips {
			grid-template-columns: 1fr 1fr;
		}
	}
</style>
