import { cubicOut } from 'svelte/easing';

/** Diagonal ink-wipe reveal, like a new panel being inked in. */
export function ink(_node: Element, { duration = 420, delay = 0 } = {}) {
	if (matchMedia('(prefers-reduced-motion: reduce)').matches) return { duration: 0 };
	return {
		duration,
		delay,
		easing: cubicOut,
		css: (t: number) => {
			const p = t * 130;
			return `clip-path: polygon(0 0, ${p}% 0, ${p - 30}% 100%, 0 100%);`;
		}
	};
}
