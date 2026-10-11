import { replaceState } from '$app/navigation';
import { arcs, type ArcId } from '$lib/data/profile';

function isArc(value: string | null): value is ArcId {
	return value !== null && value in arcs;
}

class ArcState {
	current = $state<ArcId>('product');
	/** Bumps on every user-initiated switch so the page can play an SFX. */
	switches = $state(0);

	get data() {
		return arcs[this.current];
	}

	/** Pick up ?arc= from the URL once the page is running in the browser. */
	hydrate() {
		const fromUrl = new URLSearchParams(location.search).get('arc');
		if (isArc(fromUrl)) this.current = fromUrl;
	}

	set(id: ArcId) {
		if (id === this.current) return;
		this.current = id;
		this.switches += 1;
		const url = new URL(location.href);
		url.searchParams.set('arc', id);
		replaceState(url, {});
	}
}

export const arc = new ArcState();
