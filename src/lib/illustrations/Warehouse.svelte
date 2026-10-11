<!-- Khonic: racks, labelled boxes, a scanner reading a location barcode -->
<svg viewBox="0 0 320 240" role="img" aria-label="Warehouse racks with barcoded boxes being scanned">
	<defs>
		<pattern id="wh-tone" width="5" height="5" patternUnits="userSpaceOnUse">
			<circle cx="2.5" cy="2.5" r="1.2" fill="var(--ink)" />
		</pattern>
		<g id="wh-code">
			<rect width="22" height="12" fill="var(--white)" stroke="var(--ink)" stroke-width="1.5" />
			<path d="M3 2v8M5 2v8M8 2v8M9.5 2v8M12 2v8M15 2v8M16.5 2v8M19 2v8" stroke="var(--ink)" stroke-width="1.1" />
		</g>
	</defs>
	<g fill="var(--white)" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round">
		<line x1="8" y1="214" x2="312" y2="214" />
		<!-- rack frame -->
		<rect x="22" y="34" width="8" height="180" />
		<rect x="176" y="34" width="8" height="180" />
		<rect x="22" y="86" width="162" height="7" fill="var(--ink)" />
		<rect x="22" y="140" width="162" height="7" fill="var(--ink)" />
		<rect x="22" y="196" width="162" height="7" fill="var(--ink)" />
		<!-- top shelf -->
		<rect x="36" y="48" width="46" height="38" />
		<rect x="88" y="58" width="38" height="28" fill="url(#wh-tone)" />
		<rect x="132" y="52" width="38" height="34" />
		<!-- middle shelf -->
		<rect x="36" y="104" width="58" height="36" fill="url(#wh-tone)" />
		<rect x="100" y="110" width="70" height="30" />
		<!-- bottom shelf -->
		<rect x="38" y="160" width="42" height="36" />
		<rect x="86" y="166" width="36" height="30" fill="url(#wh-tone)" />
		<rect x="128" y="156" width="42" height="40" />
	</g>
	<use href="#wh-code" x="48" y="62" />
	<use href="#wh-code" x="140" y="64" />
	<use href="#wh-code" x="124" y="118" />
	<use href="#wh-code" x="48" y="174" />
	<use href="#wh-code" x="138" y="170" />
	<!-- rack location tag -->
	<g transform="translate(34 18)">
		<rect width="56" height="16" fill="var(--ink)" />
		<text x="28" y="11.5" text-anchor="middle" fill="var(--white)" font-family="var(--font-mono)" font-size="9" font-weight="500">A-02-3</text>
	</g>
	<!-- scan beam -->
	<path d="M232 108 L134 124" stroke="var(--red)" stroke-width="3" stroke-dasharray="6 5" stroke-linecap="round" />
	<circle cx="135" cy="124" r="5" fill="none" stroke="var(--red)" stroke-width="2.5" />
	<!-- handheld -->
	<g transform="rotate(-10 262 150)" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round">
		<rect x="226" y="96" width="70" height="118" rx="12" fill="var(--white)" />
		<rect x="234" y="108" width="54" height="72" rx="4" fill="var(--paper-deep)" stroke-width="2" />
		<path d="M246 140 l8 8 l16 -18" fill="none" stroke="var(--red)" stroke-width="4" stroke-linecap="round" />
		<rect x="252" y="190" width="18" height="8" rx="4" fill="var(--ink)" />
	</g>
	<!-- FEFO tag -->
	<g transform="translate(232 30) rotate(8)">
		<path d="M0 0 H58 L70 13 L58 26 H0 Z" fill="var(--white)" stroke="var(--ink)" stroke-width="2.5" stroke-linejoin="round" />
		<circle cx="58" cy="13" r="3" fill="var(--ink)" />
		<text x="26" y="18" text-anchor="middle" fill="var(--ink)" font-family="var(--font-display)" font-size="13">FEFO</text>
	</g>
</svg>
