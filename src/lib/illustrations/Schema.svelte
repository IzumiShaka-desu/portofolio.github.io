<!-- Product arc prop: a ledger schema that has to balance -->
<svg viewBox="0 0 320 220" role="img" aria-label="Database schema for a double-entry ledger">
	<g font-family="var(--font-mono)" font-size="9" font-weight="500">
		<g transform="translate(14 22)">
			<rect width="108" height="86" fill="var(--white)" stroke="var(--ink)" stroke-width="3" />
			<rect width="108" height="20" fill="var(--ink)" />
			<text x="8" y="14" fill="var(--white)">journal_entries</text>
			<text x="8" y="38" fill="var(--ink)">id</text>
			<text x="8" y="54" fill="var(--ink)">period_id</text>
			<text x="8" y="70" fill="var(--ink)">entity_id</text>
		</g>
		<g transform="translate(196 14)">
			<rect width="110" height="86" fill="var(--white)" stroke="var(--ink)" stroke-width="3" />
			<rect width="110" height="20" fill="var(--ink)" />
			<text x="8" y="14" fill="var(--white)">accounts</text>
			<text x="8" y="38" fill="var(--ink)">id</text>
			<text x="8" y="54" fill="var(--ink)">code</text>
			<text x="8" y="70" fill="var(--ink)">type</text>
		</g>
		<g transform="translate(92 124)">
			<rect width="128" height="86" fill="var(--white)" stroke="var(--ink)" stroke-width="3" />
			<rect width="128" height="20" fill="var(--red)" />
			<text x="8" y="14" fill="var(--white)">journal_lines</text>
			<text x="8" y="38" fill="var(--ink)">entry_id → </text>
			<text x="8" y="54" fill="var(--ink)">account_id →</text>
			<text x="8" y="70" fill="var(--ink)">debit | credit</text>
		</g>
	</g>
	<g fill="none" stroke="var(--ink)" stroke-width="2.5">
		<path d="M68 108 V150 H92" />
		<path d="M250 100 V166 H220" />
		<circle cx="68" cy="108" r="4" fill="var(--white)" />
		<circle cx="250" cy="100" r="4" fill="var(--white)" />
	</g>
	<text x="158" y="119" text-anchor="middle" fill="var(--red)" font-family="var(--font-letter)" font-weight="700" font-size="12" transform="rotate(-4 158 119)">Σ debit = Σ credit</text>
</svg>
