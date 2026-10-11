<script lang="ts">
	interface Props {
		class?: string;
	}

	let { class: className = '' }: Props = $props();
</script>

<!-- A "mystery character" in shadow, the manga way. Swap for a real portrait later. -->
<svg class={className} viewBox="0 0 200 240" role="img" aria-label="Character silhouette">
	<defs>
		<pattern id="sil-tone" width="5" height="5" patternUnits="userSpaceOnUse">
			<circle cx="2.5" cy="2.5" r="1.1" fill="var(--white)" />
		</pattern>
		<linearGradient id="sil-fade" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0.45" stop-color="#fff" stop-opacity="0" />
			<stop offset="1" stop-color="#fff" stop-opacity="1" />
		</linearGradient>
		<mask id="sil-mask">
			<rect width="200" height="240" fill="url(#sil-fade)" />
		</mask>
	</defs>
	<g fill="var(--ink)">
		<!-- shoulders, neck, head -->
		<path
			d="M6 240 C10 197 42 177 77 170 L83 150 C66 140 57 120 57 97 C57 63 76 41 100 41 C124 41 143 63 143 97 C143 120 134 140 117 150 L123 170 C158 177 190 197 194 240 Z"
		/>
		<!-- medium hair, side-swept fringe -->
		<path
			d="M54 132 C44 112 42 88 50 68 C60 42 84 30 106 32 C134 34 156 54 158 86 C159 104 154 120 147 134 C146 120 144 110 141 102 C132 90 118 80 100 72 C88 82 72 92 62 100 C58 110 56 120 54 132 Z"
		/>
		<!-- collar -->
		<path d="M80 168 L100 196 L120 168 L126 176 L100 214 L74 176 Z" fill="var(--ink-soft)" />
	</g>
	<!-- screentone highlight on the shoulders -->
	<path
		d="M6 240 C10 197 42 177 77 170 L100 214 L123 170 C158 177 190 197 194 240 Z"
		fill="url(#sil-tone)"
		mask="url(#sil-mask)"
		opacity="0.55"
	/>
	<!-- the glint -->
	<g fill="var(--white)">
		<path d="M74 100 L95 104 L93 109 L76 105 Z" />
		<path d="M126 100 L105 104 L107 109 L124 105 Z" />
	</g>
</svg>
