<script lang="ts">
	import { arc } from '$lib/arc.svelte';
	import { arsenal, licenses } from '$lib/data/profile';
	import { inView, reveal, seeded } from '$lib/actions';

	// Each tag starts scattered and snaps into its column when the section scrolls in.
	const scatter = (() => {
		const rnd = seeded(42);
		const map = new Map<string, string>();
		for (const group of arsenal) {
			for (const item of group.items) {
				const x = Math.round((rnd() - 0.5) * 260);
				const y = Math.round((rnd() - 0.5) * 200);
				const r = Math.round((rnd() - 0.5) * 50);
				map.set(item, `--x: ${x}px; --y: ${y}px; --r: ${r}deg; --d: ${(rnd() * 0.35).toFixed(2)}s`);
			}
		}
		return map;
	})();

	const focus = $derived(new Set(arc.data.focusTools));
</script>

<section class="arsenal" id="arsenal" aria-labelledby="arsenal-title">
	<div class="wrap">
		<div class="section-head" use:reveal>
			<h2 id="arsenal-title"><span class="jp" lang="ja">武器一覧</span>Arsenal</h2>
			<p class="legend lettering">
				<span class="swatch" aria-hidden="true"></span> = main weapons in the {arc.data.label} arc
			</p>
		</div>

		<div class="board" use:inView={0.2}>
			{#each arsenal as group (group.group)}
				<div class="group">
					<h3 class="kicker">{group.group}</h3>
					<ul>
						{#each group.items as item (item)}
							<li class="tag" class:focus={focus.has(item)} style={scatter.get(item)}>{item}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>

		<div class="licenses">
			<h3 class="lic-title" use:reveal><span class="jp" lang="ja">免許</span> Licenses</h3>
			<ul>
				{#each licenses as lic, i (lic.href)}
					<li use:reveal style="--delay: {i * 0.08}s; --tilt: {[-6, 4, -3, 7][i % 4]}deg">
						<a class="seal" href={lic.href} target="_blank" rel="noopener" style="--rot: {[-6, 4, -3, 7][i % 4]}deg">
							<span class="issuer">{lic.issuer}</span>
							<span class="lic-name">{lic.name}</span>
							<span class="year">{lic.year}</span>
						</a>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>

<style>
	.arsenal {
		/* scattered tags start outside their columns */
		overflow-x: clip;
		padding-block: clamp(56px, 9vw, 120px);
		border-top: var(--line) solid var(--ink);
		background-image: repeating-linear-gradient(0deg, transparent 0 31px, rgba(20, 20, 20, 0.05) 31px 32px);
	}

	.legend {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--ink-soft);
	}

	.swatch {
		display: inline-block;
		width: 1.6rem;
		height: 1rem;
		background: var(--red);
		border: var(--line-thin) solid var(--ink);
	}

	.board {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
		gap: clamp(20px, 3vw, 32px) var(--gutter);
	}

	.group h3 {
		margin: 0 0 0.8rem;
		padding-bottom: 0.4rem;
		border-bottom: var(--line) solid var(--ink);
	}

	.group ul {
		display: flex;
		flex-wrap: wrap;
		gap: 0.45rem;
		margin: 0;
		padding: 0;
		list-style: none;
	}

	.tag {
		padding: 0.3rem 0.65rem;
		background: var(--white);
		border: var(--line-thin) solid var(--ink);
		font-family: var(--font-mono);
		font-size: 0.78rem;
		font-weight: 500;
		box-shadow: 2px 2px 0 var(--ink);
		transition:
			transform 0.7s var(--ease-snap) var(--d),
			opacity 0.4s ease var(--d),
			background-color 0.25s,
			color 0.25s;
	}

	.tag.focus {
		background: var(--red);
		color: var(--white);
	}

	:global(.js) .board:not(:global(.in)) .tag {
		opacity: 0;
		transform: translate(var(--x), var(--y)) rotate(var(--r));
	}

	.licenses {
		margin-top: clamp(56px, 8vw, 96px);
	}

	.lic-title {
		display: flex;
		align-items: baseline;
		gap: 0.7rem;
		font-family: var(--font-display);
		font-weight: 400;
		font-size: clamp(1.5rem, 3vw, 2.2rem);
		margin-bottom: 1.6rem;
	}

	.lic-title .jp {
		color: var(--red);
		font-size: 0.6em;
		letter-spacing: 0.2em;
	}

	.licenses ul {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
		gap: clamp(16px, 3vw, 32px);
		margin: 0;
		padding: 0;
		list-style: none;
		justify-items: center;
	}

	.seal {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 0.3rem;
		width: 150px;
		aspect-ratio: 1;
		padding: 1rem;
		border: 4px solid var(--red);
		border-radius: 50%;
		outline: 1.5px solid var(--red);
		outline-offset: -10px;
		color: var(--red);
		text-align: center;
		text-decoration: none;
		transform: rotate(var(--rot));
		transition: transform 0.25s var(--ease-snap);
		mix-blend-mode: multiply;
	}

	.seal:hover {
		transform: rotate(0deg) scale(1.06);
	}

	.issuer {
		font-family: var(--font-mono);
		font-size: 0.62rem;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}

	.lic-name {
		font-family: var(--font-display);
		font-size: 0.92rem;
		line-height: 1.1;
	}

	.year {
		font-family: var(--font-mono);
		font-size: 0.7rem;
		font-weight: 500;
	}
</style>
