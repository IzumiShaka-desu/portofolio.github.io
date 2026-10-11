<script lang="ts">
	import { special } from '$lib/data/profile';
	import { reveal } from '$lib/actions';
	import FocusLines from './FocusLines.svelte';
</script>

<section class="special" aria-labelledby="special-title">
	<FocusLines seed={23} rays={110} innerX={0.8} innerY={0.7} color="rgba(255,253,248,0.07)" />
	<div class="wrap grid">
		<div class="copy" use:reveal>
			<p class="caption narration">Meanwhile, at the {special.event}…</p>
			<p class="label"><span class="jp" lang="ja">番外編</span> <span class="kicker">Special episode</span></p>
			<h2 id="special-title" class="display">{special.title}</h2>
			<p class="text">{special.text}</p>
			<p class="role"><span class="kicker">My part</span>{special.role}</p>
		</div>

		<div class="scene" use:reveal style="--delay: 0.12s" aria-hidden="true">
			<div class="chat">
				<div class="msg user lettering">How many leave days do I have left?</div>
				<div class="msg bot lettering">8 days. Want me to file a request for Friday?</div>
				<div class="msg user lettering">Yes please. Also… a question about my payslip.</div>
				<div class="flag">
					<span class="kicker">Sensitive · escalated to HR</span>
				</div>
				<div class="task">
					<span class="kicker">HR task created</span>
					<strong>Leave request · Fri</strong>
					<span class="kicker muted">via action engine → webhook</span>
				</div>
			</div>
			<span class="sfx zz" lang="ja">カタカタ</span>
		</div>
	</div>
</section>

<style>
	.special {
		position: relative;
		overflow: hidden;
		background: var(--ink);
		color: var(--white);
		padding-block: clamp(64px, 10vw, 130px);
		border-block: var(--line) solid var(--ink);
	}

	.grid {
		position: relative;
		display: grid;
		gap: clamp(36px, 6vw, 72px);
		align-items: center;
	}

	.caption {
		display: inline-block;
		background: var(--white);
		color: var(--ink);
		font-family: var(--font-letter);
		font-weight: 700;
		transform: rotate(-1.5deg);
		margin-bottom: 1.4rem;
	}

	.label {
		display: flex;
		align-items: center;
		gap: 0.8rem;
		color: var(--red);
	}

	.label .jp {
		font-family: var(--font-display);
		font-size: 1.1rem;
		letter-spacing: 0.2em;
	}

	.label .kicker {
		color: rgba(255, 253, 248, 0.6);
	}

	h2 {
		font-size: clamp(3.6rem, 11vw, 7.5rem);
		margin: 0.3rem 0 1.2rem;
		color: var(--white);
	}

	.text {
		max-width: 52ch;
		font-size: 1.05rem;
		color: rgba(255, 253, 248, 0.85);
	}

	.role {
		max-width: 52ch;
		margin-top: 1.2rem;
		padding-left: 1rem;
		border-left: 3px solid var(--red);
		color: rgba(255, 253, 248, 0.85);
	}

	.role .kicker {
		display: block;
		color: var(--red);
		margin-bottom: 0.2rem;
	}

	.scene {
		position: relative;
	}

	.chat {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 0.9rem;
		padding: clamp(18px, 3vw, 28px);
		background: var(--white);
		color: var(--ink);
		border: var(--line) solid var(--white);
		outline: var(--line) solid var(--ink);
		outline-offset: -8px;
		transform: rotate(1.5deg);
	}

	.msg {
		position: relative;
		max-width: 82%;
		padding: 0.8em 1.1em;
		border: var(--line) solid var(--ink);
		border-radius: 22px;
		font-size: 0.95rem;
	}

	.user {
		align-self: flex-end;
		background: var(--white);
		border-bottom-right-radius: 4px;
	}

	.bot {
		align-self: flex-start;
		background: var(--ink);
		color: var(--white);
		border-bottom-left-radius: 4px;
	}

	.flag {
		align-self: center;
		padding: 0.2rem 0.7rem;
		border: 2px dashed var(--red);
		color: var(--red);
		transform: rotate(-2deg);
	}

	.task {
		display: flex;
		flex-direction: column;
		gap: 0.15rem;
		padding: 0.8rem 1rem;
		border: var(--line) solid var(--ink);
		background-image: radial-gradient(rgba(20, 20, 20, 0.18) 26%, transparent 28%);
		background-size: 5px 5px;
		box-shadow: 4px 4px 0 var(--red);
	}

	.task strong {
		font-family: var(--font-display);
		font-weight: 400;
		font-size: 1.15rem;
	}

	.muted {
		color: var(--ink-faint);
	}

	.zz {
		position: absolute;
		right: -6px;
		bottom: -26px;
		font-size: clamp(2rem, 4vw, 3rem);
		color: var(--white);
		-webkit-text-stroke: 6px var(--ink);
		transform: rotate(-8deg);
	}

	@media (min-width: 900px) {
		.grid {
			grid-template-columns: 1.1fr 0.9fr;
		}
	}
</style>
