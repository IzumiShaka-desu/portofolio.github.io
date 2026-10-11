<!-- Mobile arc prop: one codebase, two stores -->
<svg viewBox="0 0 320 220" role="img" aria-label="Two phones running the same app">
	<defs>
		<pattern id="ph-tone" width="5" height="5" patternUnits="userSpaceOnUse">
			<circle cx="2.5" cy="2.5" r="1.2" fill="var(--ink)" />
		</pattern>
		<g id="ph-screen">
			<rect x="0" y="0" width="72" height="16" fill="url(#ph-tone)" />
			<rect x="6" y="24" width="60" height="30" rx="3" fill="var(--white)" stroke="var(--ink)" stroke-width="2" />
			<rect x="6" y="60" width="28" height="26" rx="3" fill="var(--ink)" />
			<rect x="38" y="60" width="28" height="26" rx="3" fill="var(--white)" stroke="var(--ink)" stroke-width="2" />
			<path d="M6 96 H66 M6 106 H50 M6 116 H58" stroke="var(--ink)" stroke-width="2" />
		</g>
	</defs>
	<!-- bracket -->
	<g fill="none" stroke="var(--red)" stroke-width="3" stroke-linecap="round">
		<path d="M70 40 V26 H250 V40" />
		<path d="M160 26 V12" />
	</g>
	<text x="160" y="10" text-anchor="middle" fill="var(--red)" font-family="var(--font-letter)" font-weight="700" font-size="15">one codebase</text>
	<!-- iOS-ish -->
	<g transform="rotate(-6 100 130)" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round">
		<rect x="52" y="48" width="96" height="166" rx="18" fill="var(--white)" />
		<rect x="60" y="58" width="80" height="146" rx="10" fill="var(--paper)" stroke-width="2" />
		<rect x="84" y="62" width="32" height="9" rx="4.5" fill="var(--ink)" stroke="none" />
		<use href="#ph-screen" x="64" y="76" stroke="none" />
	</g>
	<!-- Android-ish -->
	<g transform="rotate(6 220 130)" stroke="var(--ink)" stroke-width="3" stroke-linejoin="round">
		<rect x="172" y="48" width="96" height="166" rx="10" fill="var(--white)" />
		<rect x="180" y="58" width="80" height="146" rx="4" fill="var(--paper)" stroke-width="2" />
		<circle cx="220" cy="66" r="4" fill="var(--ink)" stroke="none" />
		<use href="#ph-screen" x="184" y="76" stroke="none" />
	</g>
</svg>
