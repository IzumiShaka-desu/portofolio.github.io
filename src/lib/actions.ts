/** Adds `.in` the first time the element scrolls into view. */
export function reveal(node: HTMLElement, threshold = 0.15) {
	node.classList.add('reveal');
	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('in');
					io.disconnect();
				}
			}
		},
		{ threshold, rootMargin: '0px 0px -8% 0px' }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
}

/** Same trigger as `reveal`, without the default fade styles. */
export function inView(node: HTMLElement, threshold = 0.25) {
	const io = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.classList.add('in');
					io.disconnect();
				}
			}
		},
		{ threshold }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
}

/** Counts a number up from 0 when it scrolls into view. */
export function countUp(node: HTMLElement, target: number) {
	const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduce) return;
	node.textContent = '0';
	const io = new IntersectionObserver(
		(entries) => {
			if (!entries[0].isIntersecting) return;
			io.disconnect();
			const start = performance.now();
			const duration = 1100;
			const tick = (now: number) => {
				const t = Math.min(1, (now - start) / duration);
				const eased = 1 - Math.pow(1 - t, 3);
				node.textContent = String(Math.round(target * eased));
				if (t < 1) requestAnimationFrame(tick);
			};
			requestAnimationFrame(tick);
		},
		{ threshold: 0.6 }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
}

/** Small deterministic PRNG so server and client render the same "random" shapes. */
export function seeded(seed: number) {
	let s = seed >>> 0;
	return () => {
		s = (s + 0x6d2b79f5) >>> 0;
		let t = s;
		t = Math.imul(t ^ (t >>> 15), t | 1);
		t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}
