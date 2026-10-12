<!-- NDA work: a case file, its pages redacted, stamped classified -->
<svg viewBox="0 0 320 240" role="img" aria-label="A classified case file with redacted pages">
	<defs>
		<pattern id="cl-tone" width="5" height="5" patternUnits="userSpaceOnUse">
			<circle cx="2.5" cy="2.5" r="1.1" fill="var(--ink)" />
		</pattern>
	</defs>
	<!-- folder back -->
	<path d="M38 66 H118 L132 50 H282 V214 H38 Z" fill="var(--paper-deep)" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round" />
	<!-- papers -->
	<g transform="rotate(-5 160 120)" stroke="var(--ink)" stroke-linejoin="round">
		<rect x="70" y="30" width="170" height="150" fill="var(--white)" stroke-width="2.5" />
		<!-- eye: computer vision -->
		<path d="M86 58 q16 -14 32 0 q-16 14 -32 0 Z" fill="var(--white)" stroke-width="2.5" />
		<circle cx="102" cy="58" r="4.5" fill="var(--ink)" stroke="none" />
		<!-- phone: iOS 17 -->
		<rect x="200" y="42" width="26" height="46" rx="5" fill="var(--white)" stroke-width="2.5" />
		<text x="213" y="70" text-anchor="middle" font-family="var(--font-display)" font-size="11" fill="var(--ink)" stroke="none">17</text>
		<!-- lines and redaction bars -->
		<g stroke="none" fill="var(--ink)">
			<rect x="128" y="50" width="56" height="9" />
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
	<path d="M30 96 H290 L280 222 H40 Z" fill="url(#cl-tone)" opacity="0.35" />
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
