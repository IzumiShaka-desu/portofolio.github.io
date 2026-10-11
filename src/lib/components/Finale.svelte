<script lang="ts">
	import { arc } from '$lib/arc.svelte';
	import { person } from '$lib/data/profile';
	import { reveal } from '$lib/actions';
	import FocusLines from './FocusLines.svelte';
	import SpeechBubble from './SpeechBubble.svelte';
</script>

<section class="finale" id="contact" aria-labelledby="contact-title">
	<div class="wrap">
		<div class="spread panel" use:reveal>
			<FocusLines seed={99} rays={130} innerX={0.95} innerY={0.85} />
			<span class="tsuzuku" lang="ja" aria-hidden="true">つづく</span>
			<div class="inner">
				<p class="kicker eyebrow">Next chapter</p>
				<h2 id="contact-title" class="display">To be<br />continued…</h2>
				<div class="bubble">
					<SpeechBubble tail="l">Let's write the next chapter together.</SpeechBubble>
				</div>
				<a class="email lettering" href="mailto:{person.email}">{person.email}</a>
				<p class="avail kicker">● {arc.data.availability}</p>
				<div class="links">
					<a class="btn ink" href="mailto:{person.email}">Email ↗</a>
					<a class="btn" href={person.links.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
					<a class="btn" href={person.links.github} target="_blank" rel="noopener">GitHub ↗</a>
				</div>
			</div>
		</div>
	</div>
</section>

<footer class="footer">
	<div class="wrap foot">
		<span class="kicker">© {new Date().getFullYear()} {person.name}</span>
		<span class="kicker">Built with SvelteKit · inked in CSS &amp; SVG · this manga reads top to bottom</span>
	</div>
</footer>

<style>
	.finale {
		padding-block: clamp(40px, 7vw, 96px);
	}

	.spread {
		min-height: 520px;
		display: flex;
		align-items: center;
		padding: clamp(36px, 7vw, 88px) clamp(20px, 6vw, 80px);
		box-shadow: 10px 10px 0 var(--ink);
	}

	.tsuzuku {
		position: absolute;
		right: clamp(10px, 4vw, 56px);
		top: 50%;
		transform: translateY(-50%) rotate(4deg);
		writing-mode: vertical-rl;
		font-family: var(--font-display);
		font-size: clamp(4rem, 13vw, 10rem);
		line-height: 1;
		color: var(--red);
		-webkit-text-stroke: 8px var(--white);
		paint-order: stroke fill;
		white-space: nowrap;
		z-index: 1;
	}

	.inner {
		position: relative;
		z-index: 2;
		max-width: 640px;
	}

	.eyebrow,
	h2,
	.email,
	.avail {
		-webkit-text-stroke: 7px var(--white);
		paint-order: stroke fill;
	}

	.eyebrow {
		color: var(--red);
	}

	h2 {
		margin-top: 0.6rem;
		font-size: clamp(3rem, 9vw, 6.4rem);
	}

	.bubble {
		margin: 1.6rem 0 1.2rem 2.5rem;
		max-width: 26rem;
	}

	.email {
		display: inline-block;
		font-size: clamp(1.15rem, 3.4vw, 2rem);
		text-decoration: none;
		text-transform: none;
		border-bottom: 4px solid var(--red);
		word-break: break-all;
	}

	.email:hover {
		color: var(--red);
	}

	.avail {
		margin-top: 1rem;
		color: var(--ink-soft);
	}

	.avail::first-letter {
		color: var(--red);
	}

	.links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.8rem;
		margin-top: 1.6rem;
	}

	.footer {
		border-top: var(--line) solid var(--ink);
		padding-block: 1.4rem 2rem;
	}

	.foot {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		gap: 0.6rem 1.5rem;
		color: var(--ink-faint);
	}

	@media (max-width: 640px) {
		.tsuzuku {
			top: auto;
			right: 16px;
			bottom: 12px;
			writing-mode: horizontal-tb;
			transform: rotate(-6deg);
			font-size: 3.4rem;
		}

		.spread {
			padding-bottom: 120px;
		}
	}
</style>
