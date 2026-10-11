<!-- DressOnMe: on-device model fitting a dress -->
<svg viewBox="0 0 320 240" role="img" aria-label="Virtual fitting app scanning a dress">
	<defs>
		<pattern id="ft-tone" width="5" height="5" patternUnits="userSpaceOnUse">
			<circle cx="2.5" cy="2.5" r="1.2" fill="var(--ink)" />
		</pattern>
	</defs>
	<g stroke="var(--ink)" stroke-width="3" stroke-linejoin="round">
		<rect x="98" y="10" width="124" height="220" rx="18" fill="var(--white)" />
		<rect x="108" y="26" width="104" height="188" rx="6" fill="url(#ft-tone)" stroke-width="2" />
		<rect x="144" y="16" width="32" height="6" rx="3" fill="var(--ink)" stroke="none" />
		<!-- dress -->
		<path
			d="M148 50 q12 10 24 0 l6 26 l-6 8 l22 98 q-28 10 -68 0 l22 -98 l-6 -8 Z"
			fill="var(--white)"
		/>
		<path d="M142 84 q18 8 36 0" fill="none" stroke-width="2" />
	</g>
	<!-- scan brackets + line -->
	<g fill="none" stroke="var(--red)" stroke-width="3.5" stroke-linecap="round">
		<path d="M118 44 v-10 h12 M202 44 v-10 h-12 M118 196 v10 h12 M202 196 v10 h-12" />
		<path d="M114 128 H206" stroke-width="2.5" />
	</g>
	<!-- hanger -->
	<g fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
		<path d="M56 64 q0 -12 10 -12 q10 0 10 10 q0 8 -10 12 v8 L24 112 H108 L66 82" />
	</g>
	<g transform="translate(236 150) rotate(-6)">
		<rect width="68" height="26" fill="var(--ink)" />
		<text x="34" y="18" text-anchor="middle" fill="var(--white)" font-family="var(--font-mono)" font-size="11" font-weight="500">TFLite</text>
	</g>
	<g fill="var(--ink)">
		<path d="M262 56 l4 12 l12 4 l-12 4 l-4 12 l-4 -12 l-12 -4 l12 -4 Z" />
		<path d="M286 104 l2.5 7 l7 2.5 l-7 2.5 l-2.5 7 l-2.5 -7 l-7 -2.5 l7 -2.5 Z" />
	</g>
</svg>
