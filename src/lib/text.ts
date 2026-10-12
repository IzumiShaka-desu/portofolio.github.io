const REDACTION = /\[\[([^\]]+)\]\]/g;

export type TextPart = { text: string } | { redacted: number };

/** Splits copy into plain runs and [[redacted]] runs (kept only as a length). */
export function parseRedactions(text: string): TextPart[] {
	const parts: TextPart[] = [];
	let last = 0;
	for (const match of text.matchAll(REDACTION)) {
		if (match.index > last) parts.push({ text: text.slice(last, match.index) });
		parts.push({ redacted: match[1].length });
		last = match.index + match[0].length;
	}
	if (last < text.length) parts.push({ text: text.slice(last) });
	return parts;
}

/** Text with redactions spelled out, for labels and screen readers. */
export function plainText(text: string) {
	return text.replace(REDACTION, '[redacted]');
}
