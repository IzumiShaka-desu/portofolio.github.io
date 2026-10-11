<!-- QuickPro: live candlesticks streaming over WebSocket -->
<svg viewBox="0 0 320 240" role="img" aria-label="Trading app with a live candlestick chart">
	<defs>
		<pattern id="tr-tone" width="5" height="5" patternUnits="userSpaceOnUse">
			<circle cx="2.5" cy="2.5" r="1.2" fill="var(--ink)" />
		</pattern>
	</defs>
	<g stroke="var(--ink)" stroke-width="3" stroke-linejoin="round">
		<rect x="98" y="10" width="124" height="220" rx="18" fill="var(--white)" />
		<rect x="108" y="26" width="104" height="188" rx="6" fill="var(--paper)" stroke-width="2" />
		<rect x="144" y="16" width="32" height="6" rx="3" fill="var(--ink)" stroke="none" />
	</g>
	<text x="116" y="44" fill="var(--ink)" font-family="var(--font-mono)" font-size="9" font-weight="500">XAU/USD</text>
	<circle cx="196" cy="41" r="4" fill="var(--red)" />
	<text x="190" y="44" text-anchor="end" fill="var(--red)" font-family="var(--font-mono)" font-size="8" font-weight="500">LIVE</text>
	<!-- candles -->
	<g stroke="var(--ink)" stroke-width="2">
		<path d="M122 120v40M134 104v44M146 112v36M158 88v42M170 96v30M182 70v40M194 62v34" />
		<rect x="118" y="128" width="8" height="22" fill="var(--white)" />
		<rect x="130" y="112" width="8" height="26" fill="var(--ink)" />
		<rect x="142" y="118" width="8" height="20" fill="var(--white)" />
		<rect x="154" y="96" width="8" height="26" fill="var(--ink)" />
		<rect x="166" y="102" width="8" height="16" fill="var(--white)" />
		<rect x="178" y="78" width="8" height="24" fill="var(--ink)" />
		<rect x="190" y="68" width="8" height="20" fill="var(--ink)" />
	</g>
	<path d="M112 74 H208" stroke="var(--red)" stroke-width="2" stroke-dasharray="4 3" />
	<rect x="112" y="160" width="96" height="10" fill="url(#tr-tone)" />
	<!-- order buttons -->
	<g stroke="var(--ink)" stroke-width="2">
		<rect x="114" y="180" width="44" height="24" rx="4" fill="var(--ink)" />
		<rect x="162" y="180" width="44" height="24" rx="4" fill="var(--white)" />
	</g>
	<g font-family="var(--font-display)" font-size="11" text-anchor="middle">
		<text x="136" y="196" fill="var(--white)">BUY</text>
		<text x="184" y="196" fill="var(--ink)">SELL</text>
	</g>
	<!-- websocket arrows -->
	<g fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
		<path d="M28 98 H82 M70 86 l12 12 l-12 12" />
		<path d="M82 142 H28 M40 130 l-12 12 l12 12" />
	</g>
	<text x="55" y="126" text-anchor="middle" fill="var(--red)" font-family="var(--font-display)" font-size="14">WS</text>
	<g fill="none" stroke="var(--ink)" stroke-width="3" stroke-linecap="round">
		<path d="M238 60 l22 -10 M240 82 l28 0 M238 104 l22 10" />
	</g>
</svg>
