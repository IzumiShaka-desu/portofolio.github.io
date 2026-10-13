<script lang="ts">
	interface Props {
		motif: 'photos' | 'health';
	}

	let { motif }: Props = $props();

	const labels = {
		photos: 'A classified case file: a photo grid with a face detected, the rest redacted',
		health: 'A classified case file: a medical cross and two phones on the iOS 18 SDK, the rest redacted'
	};
	// Both case files can be on the page at once, so the pattern id must be unique.
	const tone = $derived(`cl-tone-${motif}`);
</script>

<!-- NDA work: a case file, its pages redacted, stamped classified. The motif on the page hints at what's inside. -->
<svg viewBox="0 0 320 240" role="img" aria-label={labels[motif]}>
	<defs>
		<pattern id={tone} width="5" height="5" patternUnits="userSpaceOnUse">
			<circle cx="2.5" cy="2.5" r="1.1" fill="var(--ink)" />
		</pattern>
	</defs>
	<!-- folder back -->
	<path d="M38 66 H118 L132 50 H282 V214 H38 Z" fill="var(--paper-deep)" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round" />
	<!-- papers -->
	<g transform="rotate(-5 160 120)" stroke="var(--ink)" stroke-linejoin="round">
		<rect x="70" y="30" width="170" height="150" fill="var(--white)" stroke-width="2.5" />
		{#if motif === 'photos'}
			<!-- eye: computer vision -->
			<path d="M86 58 q16 -14 32 0 q-16 14 -32 0 Z" fill="var(--white)" stroke-width="2.5" />
			<circle cx="102" cy="58" r="4.5" fill="var(--ink)" stroke="none" />
			<!-- photo grid, one face picked out -->
			<g stroke-width="2">
				<rect x="190" y="38" width="20" height="20" fill="var(--white)" />
				<rect x="214" y="38" width="20" height="20" fill="url(#{tone})" />
				<rect x="190" y="62" width="20" height="20" fill="url(#{tone})" />
				<rect x="214" y="62" width="20" height="20" fill="var(--white)" />
				<path d="M191 57 l6 -8 l4 5 l3 -3 l5 6" fill="none" />
				<circle cx="204" cy="44" r="2.5" fill="var(--ink)" stroke="none" />
				<circle cx="224" cy="69" r="3.5" fill="var(--white)" />
				<path d="M217 81 q7 -9 14 0" fill="none" />
				<rect x="216.5" y="63.5" width="15" height="12" fill="none" stroke="var(--red)" stroke-dasharray="3 2" />
			</g>
		{:else}
			<!-- medical cross: healthcare -->
			<path d="M95 46 h8 v9 h9 v8 h-9 v9 h-8 v-9 h-9 v-8 h9 Z" fill="var(--red)" stroke-width="2" />
			<!-- two apps, both moved to the iOS 18 SDK -->
			<rect x="184" y="48" width="24" height="42" rx="5" fill="url(#{tone})" stroke-width="2.5" />
			<rect x="204" y="40" width="26" height="46" rx="5" fill="var(--white)" stroke-width="2.5" />
			<text x="217" y="68" text-anchor="middle" font-family="var(--font-display)" font-size="11" fill="var(--ink)" stroke="none">18</text>
		{/if}
		<!-- lines and redaction bars -->
		<g stroke="none" fill="var(--ink)">
			<rect x={motif === 'photos' ? 128 : 120} y="50" width="54" height="9" />
			<rect x="86" y="98" width="40" height="4" opacity="0.35" />
			<rect x="130" y="95" width="64" height="10" />
			<rect x="86" y="114" width="120" height="4" opacity="0.35" />
			<rect x="86" y="126" width="30" height="10" />
			<rect x="120" y="129" width="80" height="4" opacity="0.35" />
			<rect x="86" y="144" width="96" height="10" />
		</g>
	</g>
	<!-- folder front -->
	<path d="M30 96 H290 L280 222 H40 Z" fill="var(--white)" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round" />
	<path d="M30 96 H290 L280 222 H40 Z" fill="url(#{tone})" opacity="0.35" />
	<g transform="translate(52 112)">
		<rect width="96" height="22" fill="var(--white)" stroke="var(--ink)" stroke-width="2" />
		<text x="48" y="15" text-anchor="middle" font-family="var(--font-mono)" font-size="9" font-weight="500" fill="var(--ink)">CASE FILE · NDA</text>
	</g>
	<!-- stamp -->
	<g transform="rotate(-12 196 168)" fill="none" stroke="var(--red)">
		<rect x="132" y="140" width="128" height="56" stroke-width="4" />
		<rect x="138" y="146" width="116" height="44" stroke-width="1.5" />
		<text x="196" y="174" text-anchor="middle" font-family="var(--font-display)" font-size="22" fill="var(--red)" stroke="none">機密</text>
		<text x="196" y="186" text-anchor="middle" font-family="var(--font-mono)" font-size="8" font-weight="500" letter-spacing="2" fill="var(--red)" stroke="none">TOP SECRET</text>
	</g>
	<!-- paperclip -->
	<path d="M256 26 v40 a8 8 0 0 1 -16 0 v-34 a5 5 0 0 1 10 0 v30" fill="none" stroke="var(--ink)" stroke-width="2.5" stroke-linecap="round" />
</svg>
