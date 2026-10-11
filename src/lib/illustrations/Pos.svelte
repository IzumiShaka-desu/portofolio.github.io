<!-- Labamu: POS screen, two currencies, receipt printer over Bluetooth -->
<svg viewBox="0 0 320 240" role="img" aria-label="Point-of-sale app sending a receipt to a Bluetooth printer">
	<defs>
		<pattern id="pos-tone" width="5" height="5" patternUnits="userSpaceOnUse">
			<circle cx="2.5" cy="2.5" r="1.2" fill="var(--ink)" />
		</pattern>
	</defs>
	<g stroke="var(--ink)" stroke-width="3" stroke-linejoin="round">
		<!-- phone -->
		<rect x="56" y="14" width="112" height="212" rx="18" fill="var(--white)" />
		<rect x="66" y="30" width="92" height="178" rx="6" fill="var(--paper)" stroke-width="2" />
		<rect x="96" y="20" width="32" height="6" rx="3" fill="var(--ink)" stroke="none" />
		<rect x="66" y="30" width="92" height="20" fill="url(#pos-tone)" stroke-width="2" />
		<!-- product tiles -->
		<g fill="var(--white)" stroke-width="2">
			<rect x="72" y="58" width="38" height="34" rx="3" />
			<rect x="114" y="58" width="38" height="34" rx="3" />
			<rect x="72" y="98" width="38" height="34" rx="3" />
			<rect x="114" y="98" width="38" height="34" rx="3" fill="url(#pos-tone)" />
			<rect x="72" y="138" width="38" height="34" rx="3" fill="url(#pos-tone)" />
			<rect x="114" y="138" width="38" height="34" rx="3" />
		</g>
		<rect x="72" y="180" width="80" height="22" rx="3" fill="var(--ink)" stroke-width="2" />
	</g>
	<text x="112" y="195" text-anchor="middle" fill="var(--white)" font-family="var(--font-mono)" font-size="10" font-weight="500">S$ 12.40</text>
	<!-- bluetooth link -->
	<g fill="none" stroke="var(--red)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
		<path d="M190 96 l12 10 l-6 5 v-26 l6 5 l-12 10" />
		<path d="M212 88 q8 9 0 18" />
		<path d="M220 82 q14 15 0 30" />
	</g>
	<!-- receipt -->
	<g stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round">
		<path d="M220 66 H282 V144 H220 Z" fill="var(--white)" />
		<path d="M228 80 H272 M228 92 H262 M228 104 H274 M228 116 H256" stroke-width="2" />
		<path d="M228 130 H274" stroke-width="3" />
		<!-- printer -->
		<rect x="204" y="138" width="94" height="58" rx="8" fill="var(--white)" stroke-width="3" />
		<rect x="214" y="138" width="74" height="10" fill="var(--ink)" />
		<circle cx="282" cy="180" r="5" fill="var(--red)" stroke="none" />
		<rect x="216" y="168" width="40" height="14" fill="url(#pos-tone)" stroke-width="2" />
	</g>
	<!-- coins -->
	<g font-family="var(--font-display)" text-anchor="middle">
		<circle cx="30" cy="70" r="18" fill="var(--white)" stroke="var(--ink)" stroke-width="3" />
		<text x="30" y="75" font-size="13" fill="var(--ink)">Rp</text>
		<circle cx="32" cy="160" r="18" fill="var(--ink)" stroke="var(--ink)" stroke-width="3" />
		<text x="32" y="165" font-size="13" fill="var(--white)">S$</text>
	</g>
</svg>
