import { error } from '@sveltejs/kit';
import { chapters } from '$lib/data/profile';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () => Object.keys(chapters).map((slug) => ({ slug }));

export const load: PageLoad = ({ params }) => {
	const chapter = chapters[params.slug];
	if (!chapter) error(404, 'No such chapter');
	return { chapter };
};
