// All site copy lives here. Edit this file to update the portfolio.

export type ArcId = 'product' | 'mobile';

export interface Arc {
	id: ArcId;
	label: string;
	/** Short line in the hero speech bubble. */
	bubble: string;
	summary: string;
	availability: string;
	/** Big shout bubble on the cover. */
	shout: { value: string; label: string };
	/** Sticky-note captions floating on the cover. */
	notes: string[];
	/** Title shown on the character profile. */
	classTitle: string;
	/** What's in progress right now, shown on the profile. */
	quest: string;
	specialMove: string;
	/** Chapter ids, in the order this arc shows them. */
	chapters: string[];
	sideStories: string[];
	/** Arsenal entries highlighted for this arc. */
	focusTools: string[];
}

export interface Link {
	label: string;
	href: string;
}

/**
 * Text in chapter titles and points may wrap words in [[double brackets]] to
 * render them as a redaction bar. Only the length of the wrapped text is used,
 * so put a placeholder there, never the real name.
 */
export interface Chapter {
	id: string;
	title: string;
	/** Katakana reading, shown next to the entry number. */
	kana: string;
	/** Encyclopedia-style headline, the "!!" line. */
	catchphrase: string;
	/** Speech bubble over the art. */
	quote: string;
	tagline: string;
	/** Parameters box: what I did, and how far it reached. */
	role: string;
	reach: string;
	where: string;
	when: string;
	illustration: 'warehouse' | 'pos' | 'trading' | 'fitting' | 'case-photos' | 'case-health';
	/** Styles the page as a classified file (NDA work). */
	classified?: boolean;
	/** Big shout per arc; falls back to `default`. */
	shout: Partial<Record<ArcId, string>> & { default: string };
	rating?: string;
	points: Partial<Record<ArcId, string[]>> & { default: string[] };
	tags: string[];
	links: Link[];
	/** Shown instead of links when there is nothing public to link to. */
	note?: string;
}

export interface SideStory {
	id: string;
	title: string;
	kind: string;
	text: string;
	link?: Link;
}

export const person = {
	name: 'Sesaka Aji Nursyah Bantani',
	nickname: 'Shaka',
	katakana: 'シャカ',
	location: 'BSD, Tangerang',
	company: 'Sprout Digital Labs',
	title: 'Product Engineer',
	education: 'S.Kom Informatics, Universitas Singaperbangsa Karawang (GPA 3.84)',
	email: 'shakaaji29@gmail.com',
	/**
	 * Manga art in /static/art, each as .webp + .jpg. `full` fills the cover panel,
	 * `bust` is a tighter crop for the profile card. Null shows a silhouette instead.
	 */
	portrait: {
		full: 'art/shaka-sakura',
		bust: 'art/shaka-bust',
		alt: 'Shaka standing under a cherry tree, drawn manga style'
	} as { full: string; bust: string; alt: string } | null,
	links: {
		linkedin: 'https://www.linkedin.com/in/akashaka',
		github: 'https://github.com/IzumiShaka-desu'
	}
};

export const arcs: Record<ArcId, Arc> = {
	product: {
		id: 'product',
		label: 'Product Engineer',
		bubble: 'Schema to screen. I own the whole thing.',
		summary:
			'I own systems end to end, from the data model and backend to the apps people use every day. 4+ years shipping products, including a mobile app with 1M+ downloads.',
		availability: 'Open to product engineering roles',
		shout: { value: 'SOLE', label: 'engineer, full ERP' },
		notes: ['schema-first', 'double-entry, in the DB'],
		classTitle: 'Product Engineer · Sprout Digital Labs',
		quest: 'Leading 3 engineers on a Finance & Accounting module: a 21-table double-entry ledger to replace Accurate.',
		specialMove: 'Schema-first build: one schema, parallel submodules',
		chapters: ['khonic', 'nda-photos', 'labamu', 'nda-health', 'quickpro', 'dressonme'],
		sideStories: ['urails', 'cashkit'],
		focusTools: [
			'Supabase',
			'PostgreSQL',
			'Data modeling',
			'Technical design docs',
			'Estimation',
			'Docker',
			'React',
			'Flutter',
			'Claude'
		]
	},
	mobile: {
		id: 'mobile',
		label: 'Mobile Engineer',
		bubble: 'One codebase, two stores.',
		summary:
			'4+ years building Flutter, iOS, and Android apps, including a POS app with 1M+ downloads and a real-time trading app with 100K+. Architecture, native SDK work, CI/CD, store releases: the full lifecycle.',
		availability: 'Open to mobile engineering roles',
		shout: { value: '1M+', label: 'downloads' },
		notes: ['Flutter · Swift · Kotlin', 'ships to both stores'],
		classTitle: 'Product Engineer (Mobile) · Sprout Digital Labs',
		quest: 'Owning the Khonic mobile apps and PWA that warehouse staff scan with every day.',
		specialMove: 'One codebase, two stores',
		chapters: ['labamu', 'nda-health', 'quickpro', 'khonic', 'nda-photos', 'dressonme'],
		sideStories: ['halotutor', 'urails', 'cashkit'],
		focusTools: [
			'Flutter',
			'Dart',
			'Swift',
			'SwiftUI',
			'Kotlin',
			'Android Jetpack',
			'TFLite',
			'WebSocket',
			'Codemagic',
			'Xcode Cloud'
		]
	}
};

export const arcOrder: ArcId[] = ['product', 'mobile'];

export const chapters: Record<string, Chapter> = {
	khonic: {
		id: 'khonic',
		title: 'Khonic',
		kana: 'コニック',
		catchphrase: 'One engineer, one schema, a whole warehouse!!',
		quote: 'From the racks to the ledger, I own it.',
		tagline: 'Warehouse management & ERP',
		role: 'Sole engineer · leads 3 on accounting',
		reach: 'Warehouse staff, every day',
		where: 'Sprout Digital Labs · sole engineer',
		when: '2023 – now',
		illustration: 'warehouse',
		shout: { default: 'SOLE ENGINEER!' },
		points: {
			product: [
				'Lead a 3-engineer team building a Finance & Accounting module to replace Accurate: a 21-table ledger, double-entry rules enforced in the database, fiscal period closing, multi-entity.',
				'Designed a Smart Racking System: slotting, batch picking, FEFO, and optimized picking routes across a two-tier warehouse.',
				'Auto-assign deliveries with driver clustering and route optimization.'
			],
			default: [
				'Own the mobile apps and PWA warehouse staff use daily: barcode/SKU scanning, stock per rack location, inbound and putaway flows built for low-tech staff.',
				'Auto-assign deliveries with driver clustering and route optimization.',
				'Also own the web dashboard and the Supabase/PostgreSQL backend behind it all.'
			]
		},
		tags: ['Supabase', 'PostgreSQL', 'Flutter', 'PWA', 'Web dashboard'],
		links: [],
		note: 'Internal product: no public link'
	},
	'nda-photos': {
		id: 'nda-photos',
		title: 'Project [[xxxxxx]]',
		kana: 'プロジェクト[[xxx]]',
		catchphrase: 'A private Google Photos, with its own machine learning!!',
		quote: "Can't say. Ask me in an interview.",
		tagline: 'Google Photos–style platform with custom ML',
		role: 'Built the computer vision module',
		reach: 'Government client · NDA',
		where: 'Sprout Digital Labs · client project',
		when: '2023 – now',
		illustration: 'case-photos',
		classified: true,
		shout: { default: 'EYES ONLY!' },
		points: {
			default: [
				'A Google Photos–style platform for [[xxxxxxxxxxxx]], a government client, built on an open-source photo platform and extended with custom machine learning.',
				'Built the computer vision module behind those features and containerized it with Docker.',
				"Wired the module into the platform's backend APIs and frontend."
			]
		},
		tags: ['Computer vision', 'Machine learning', 'Docker', 'REST APIs', 'Open source'],
		links: [],
		note: 'Under NDA. Happy to walk through the engineering in an interview.'
	},
	'nda-health': {
		id: 'nda-health',
		title: 'Client [[xxxxxxx]]',
		kana: 'クライアント[[xxx]]',
		catchphrase: 'Open-heart surgery on two live apps!!',
		quote: "Can't name the patient. The operation went fine.",
		tagline: "Shadowing a healthcare platform's existing product",
		role: 'Led the iOS 17 migration',
		reach: 'Two live apps · NDA',
		where: 'Sprout Digital Labs · client project',
		when: '2023 – now',
		illustration: 'case-health',
		classified: true,
		shout: { default: 'TOP SECRET!' },
		points: {
			default: [
				"Led the native iOS SDK migration for two apps of [[xxxxxxxxxx]], one of Indonesia's largest online healthcare platforms, to support iOS 17.",
				"Shadowing work on the client's existing product: their codebase, their users, their rules."
			]
		},
		tags: ['Swift', 'iOS 17', 'Native SDK'],
		links: [],
		note: "The client's existing product, under NDA. Happy to walk through it in an interview."
	},
	labamu: {
		id: 'labamu',
		title: 'Labamu',
		kana: 'ラバム',
		catchphrase: 'The 1M+ download POS app, now in Singapore!!',
		quote: 'New country, new currency, same app.',
		tagline: 'POS & business app for MSMEs',
		role: 'Led mobile for the SG expansion',
		reach: '1M+ downloads · 4.3★',
		where: 'Sprout Digital Labs',
		when: '2023 – now',
		illustration: 'pos',
		shout: { default: '1M+ DOWNLOADS!' },
		rating: '4.3',
		points: {
			mobile: [
				"Led mobile work for Labamu's expansion to Singapore: multi-language, timezone handling, multi-currency, and 2C2P payments.",
				'Built barcode-based inventory management for better stock accuracy.',
				'Fixed a silent iOS Bluetooth permission bug that blocked receipt printers.'
			],
			default: [
				"Led mobile work for Labamu's expansion to Singapore: multi-language, timezone handling, multi-currency, and 2C2P payments.",
				'Built barcode-based inventory management for better stock accuracy.'
			]
		},
		tags: ['Flutter', '2C2P', 'i18n', 'Barcode', 'Bluetooth printing'],
		links: [
			{ label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=id.co.labamu.app' },
			{ label: 'App Store', href: 'https://apps.apple.com/sg/app/labamu-apps-pembukuan-umkm/id1625291429' }
		]
	},
	quickpro: {
		id: 'quickpro',
		title: 'QuickPro',
		kana: 'クイックプロ',
		catchphrase: 'Market orders, live over WebSocket!!',
		quote: 'The market moves. The screen keeps up.',
		tagline: 'Real-time trading app',
		role: 'Built core modules · freelance',
		reach: '100K+ downloads · 4.5★',
		where: 'Foreximf.com · freelance, remote',
		when: '2022 – 2023',
		illustration: 'trading',
		shout: { default: '100K+ DOWNLOADS!' },
		rating: '4.5',
		points: {
			default: [
				'Built core modules, Market Detector and Trading Base, with real-time orders over WebSocket.',
				'Applied Clean Architecture and turned Figma designs into responsive Flutter UI.'
			]
		},
		tags: ['Flutter', 'WebSocket', 'Clean Architecture', 'Figma'],
		links: [
			{ label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.foreximf.client' }
		]
	},
	dressonme: {
		id: 'dressonme',
		title: 'DressOnMe',
		kana: 'ドレスオンミー',
		catchphrase: 'A fitting room that fits in your pocket!!',
		quote: 'Try it on before you buy it.',
		tagline: 'Virtual fitting app',
		role: 'Mobile engineer · incubation team',
		reach: 'Google Play & App Store',
		where: 'Bangkit Incubation · Dikti & Binus',
		when: '2022 – 2023',
		illustration: 'fitting',
		shout: { default: 'TOP INCUBATION TEAM!' },
		points: {
			default: [
				'Migrated the Kotlin app to Flutter so Android and iOS ship from one codebase.',
				'Set up CI/CD for Android and iOS builds and releases.',
				'Shipped a TFLite virtual dress-fitting feature with designers and ML engineers. Selected as one of the best incubation teams.'
			]
		},
		tags: ['Flutter', 'Kotlin', 'TFLite', 'CI/CD'],
		links: [
			{ label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=id.dressonme.dress_on_me' },
			{ label: 'App Store', href: 'https://apps.apple.com/us/app/dressonme/id1659598377' }
		]
	}
};

export const sideStories: Record<string, SideStory> = {
	urails: {
		id: 'urails',
		title: 'Urails',
		kind: 'Side project · iOS',
		text: 'KRL trip planner using A* pathfinding and Python web scraping.',
		link: { label: 'TestFlight', href: 'https://testflight.apple.com/join/tdXDrHYS' }
	},
	halotutor: {
		id: 'halotutor',
		title: 'Halotutor',
		kind: 'Side project · Android',
		text: 'Student–tutor matching app with Midtrans payments.',
		link: {
			label: 'Google Play',
			href: 'https://play.google.com/store/apps/details?id=com.DarkshanDev.halotutor'
		}
	},
	cashkit: {
		id: 'cashkit',
		title: 'CashKit',
		kind: 'Internal · Flutter package',
		text: "Maintain Sprout's internal Flutter package for networking, UI components, and lint rules."
	}
};

export const special = {
	title: 'HR.AI',
	event: 'Sprout Hackathon 2026',
	text: 'An AI-powered HR support platform: answers employee questions on payroll, leave, and reimbursement, flags sensitive cases for safe escalation, and turns conversations into structured HR tasks.',
	role: 'Shaped the product architecture (conversation layer, action engine, open API and webhooks) and built the pitch.'
};

export const stats = [
	{ value: 4, suffix: '+', label: 'years shipping', note: 'Flutter, Swift, Kotlin' },
	{ value: 1, suffix: 'M+', label: 'downloads', note: 'Labamu, 4.3★' },
	{ value: 500, suffix: '+', label: 'code reviews', note: 'Dicoding, 4.8★ rating' },
	{ value: 25, suffix: '+', label: 'mentees', note: 'Bangkit, 86%+ graduated' }
];

export const storySoFar = [
	{ year: '2016', title: 'Origin', text: 'Starts Software Engineering at SMK Negeri 1 Pandeglang.', sfx: 'ピコン' },
	{ year: '2019', title: 'Training arc', text: 'Informatics at Universitas Singaperbangsa Karawang.', sfx: 'カチッ' },
	{
		year: '2021–22',
		title: 'Licenses earned',
		text: 'Dicoding Flutter, Android & iOS Developer Expert. Google Associate Android Developer.',
		sfx: 'キラッ'
	},
	{
		year: '2022',
		title: 'First real ships',
		text: 'QuickPro (100K+ downloads) as a freelancer. DressOnMe through Bangkit incubation.',
		sfx: 'シュッ'
	},
	{
		year: '2022–23',
		title: 'Sensei mode',
		text: 'Code reviewer at Dicoding (500+ reviews). Mentor at Bangkit Academy (25+ learners).',
		sfx: 'ザッ'
	},
	{
		year: '2023',
		title: 'Graduation',
		text: 'S.Kom, GPA 3.84. Joins Sprout Digital Labs in December.',
		sfx: 'ドン'
	},
	{
		year: 'At Sprout',
		title: 'Boss fights',
		text: 'Takes Labamu to Singapore. Becomes the sole engineer on Khonic.',
		sfx: 'ゴゴゴ'
	},
	{
		year: '2026',
		title: 'Class change',
		text: 'Title becomes Product Engineer. Builds HR.AI at the Sprout Hackathon.',
		sfx: 'バン'
	}
];

export const arsenal: { group: string; items: string[] }[] = [
	{
		group: 'Mobile',
		items: ['Flutter', 'Dart', 'Swift', 'SwiftUI', 'Kotlin', 'Android Jetpack', 'TFLite', 'WebSocket']
	},
	{
		group: 'Backend & data',
		items: ['Supabase', 'PostgreSQL', 'Firebase', 'MySQL', 'SQLite', 'REST APIs', 'Python', 'Docker']
	},
	{ group: 'Web', items: ['React', 'JavaScript', 'Tailwind'] },
	{
		group: 'Product & tooling',
		items: ['Technical design docs', 'Data modeling', 'Estimation', 'Codemagic', 'GitHub Actions', 'Xcode Cloud', 'Git', 'Figma']
	},
	{ group: 'AI-assisted', items: ['Claude', 'AI planning', 'AI test cycles', 'AI code review'] }
];

export const licenses = [
	{ name: 'Associate Android Developer', issuer: 'Google', year: '2022', href: 'https://www.credential.net/9c9b2c84-8217-4bca-b311-264d93b9db29' },
	{ name: 'Android Developer Expert', issuer: 'Dicoding', year: '2022', href: 'https://www.dicoding.com/certificates/QLZ9K9GN9Z5D' },
	{ name: 'iOS Developer Expert', issuer: 'Dicoding', year: '2022', href: 'https://www.dicoding.com/certificates/NVP71RJM4PR0' },
	{ name: 'Flutter Developer Expert', issuer: 'Dicoding', year: '2021', href: 'https://www.dicoding.com/certificates/KEXL3MD00PG2' }
];
