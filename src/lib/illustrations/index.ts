import type { Component } from 'svelte';
import type { Chapter } from '$lib/data/profile';
import Warehouse from './Warehouse.svelte';
import Pos from './Pos.svelte';
import Trading from './Trading.svelte';
import Fitting from './Fitting.svelte';
import CasePhotos from './CasePhotos.svelte';
import CaseHealth from './CaseHealth.svelte';

/** The art for each chapter, shared by the overview page and the chapter's own page. */
export const illustrations: Record<Chapter['illustration'], Component> = {
	warehouse: Warehouse,
	pos: Pos,
	trading: Trading,
	fitting: Fitting,
	'case-photos': CasePhotos,
	'case-health': CaseHealth
};

/** Where a close-up panel aims on each illustration, as % of its width and height. */
export const closeUps: Record<Chapter['illustration'], [number, number]> = {
	warehouse: [80, 60],
	pos: [76, 70],
	trading: [50, 42],
	fitting: [54, 46],
	'case-photos': [62, 72],
	'case-health': [62, 72]
};
