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

/** A screenshot or screen recording in /static, shown on the chapter's own page. */
export interface Media {
	type: 'image' | 'video';
	/** Path under /static, without a leading slash, e.g. `shots/labamu-cashier.webp`. */
	src: string;
	alt: string;
	caption?: string;
}

/**
 * Each chapter has an overview (on the home page) and its own page at /chapters/<id>/.
 *
 * Any chapter text may wrap words in [[double brackets]] to render them as a
 * redaction bar. Only the length of the wrapped text is used, so put a
 * placeholder there, never the real name.
 */
export interface Chapter {
	id: string;
	title: string;
	/** Katakana reading, shown next to the entry number. */
	kana: string;
	/** Encyclopedia-style headline, the "!!" line. */
	catchphrase: string;
	/** What the project is, in plain words: the overview's description. */
	summary: string;
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
	/** Up to three points for the overview, per arc; falls back to `default`. */
	highlights: Partial<Record<ArcId, string[]>> & { default: string[] };
	/** The full list for the chapter's own page. */
	whatIDid: string[];
	impact: string;
	learned: string;
	/** The whole stack. The overview shows the first five. */
	tags: string[];
	links: Link[];
	/** Never shown on classified chapters. */
	media?: Media[];
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
	/** Shown as "Title earned" on the character profile. */
	honor: {
		name: 'The Walking Encyclopedia',
		from: 'Sprout Gala Dinner 2025',
		why: 'for the person who can answer and explain anything about work and the world. Picked from four nominees.'
	},
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
		shout: { value: 'CORE', label: 'engineer & PIC, ERP' },
		notes: ['schema-first', 'double-entry, in the DB'],
		classTitle: 'Product Engineer · Sprout Digital Labs',
		quest: 'Directing 3 engineers on a Finance & Accounting module: a double-entry ledger to replace Accurate, now in staged user validation.',
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
		catchphrase: "Routes, racks, and a ledger that can't lie!!",
		summary:
			'Khonic runs the warehouses and deliveries of a multi-company business, where each company has its own warehouse, many SKUs, and many suppliers. It\'s four apps on one backend: a sales app, a back-office dashboard, a warehouse app for staff on the floor, and a driver app, now gaining a finance and accounting module to replace Accurate.',
		quote: 'From the racks to the ledger, I own it.',
		tagline: 'Warehouse management & ERP',
		role: 'Core engineer & PIC · directs 3 on accounting',
		reach: 'Warehouse staff & drivers, every day',
		where: 'Sprout Digital Labs · core engineer & PIC',
		when: 'Dec 2023 – now',
		illustration: 'warehouse',
		shout: { default: 'PERSON IN CHARGE!' },
		highlights: {
			default: [
				"Solved Khonic's routing problems: capacitated pickup-and-delivery routing (CVRP + VRPPD) for drivers, and picker routing for warehouse staff.",
				'Built the demand–supply allocation engine that turns sales orders into FEFO-first, volume-capped pick batches.',
				'Directed the engineers assigned to the Finance & Accounting module, and built a stock-ledger overhaul that flags every stock change made outside the app.'
			],
			mobile: [
				'Built batch picking end to end, replacing single-order picking with a batch-picking model across the warehouse app and backend.',
				'Built the inbound flow, from pallet intake through SKU assignment to rack placement.',
				'Solved the picker routing problem as a closed-tour TSP, so staff walk one efficient loop instead of an arbitrary order; the same approach drives putaway and returns.'
			]
		},
		whatIDid: [
			"Built delivery route planning as a capacitated vehicle routing problem with pickups and deliveries (CVRP + VRPPD): one route per vehicle mixes delivery drop-offs and return pickups, and is checked against the vehicle's weight and volume limits before it's created.",
			'Wrote a hybrid route solver that picks its method by problem size — exact dynamic programming for small routes, a genetic algorithm for medium ones, nearest-neighbor + 2-opt for large ones — with K-means clustering to group delivery stops by location.',
			'Built batch picking end to end, replacing single-order picking with a batch-picking model across the warehouse app and backend.',
			'Solved the picker routing problem as a closed-tour TSP (exact Held-Karp for up to 12 stops, nearest-neighbor + 2-opt beyond), so staff walk one efficient loop instead of an arbitrary order; the same approach drives putaway and returns.',
			'Built the demand–supply allocation engine: matches sales-order demand against pallet and lot stock FEFO-first (earliest expiry leaves first), then packs orders into pick batches by SKU overlap under a volume cap.',
			'Built the warehouse floor-plan and graph system: rack/slot/zone schema, Dijkstra shortest paths, and reverse lookup from SKU to rack location.',
			'Overhauled stock reconciliation over four milestones: every stock movement, including each pick, now writes a traceable ledger row; a database trigger flags any change that bypasses the app; and a variance view compares system, physical, and ledger stock.',
			'Made the stock ledger append-only with a database trigger, chosen over revoking privileges because the app connects as the table owner, so a revoke would have silently done nothing.',
			'Built the inbound flow, from pallet intake through SKU assignment to rack placement.',
			'Directed the three engineers assigned to the Finance & Accounting module and built it with them: Chart of Accounts (315 accounts, 17 account types) and cash & bank transactions reconciled against account balances; now rolling out through staged user validation.',
			'Built the journal-entry engine (Draft → Review → Posted → Reversed) with row locking, so two simultaneous "post" actions can\'t both succeed, plus a database balance check as a backstop.',
			'Restructured the backend from a layered layout into a feature-first one, organized around the four apps it serves.'
		],
		impact:
			'Core engineer and PIC for nearly three years on a multi-company operation where each company runs its own warehouse, with many SKUs and many suppliers per company. Brought stock reconciliation to zero product mismatches in the latest audit, and built the finance ledger core — now in staged user validation — while directing the three engineers assigned to it.',
		learned:
			"A rule that only holds by coincidence isn't a rule. If data must never change, enforce it where nothing can bypass it — the database — and check that the enforcement can't be silently skipped.",
		tags: [
			'Flutter',
			'Node.js',
			'PostgreSQL',
			'Supabase',
			'Route optimization',
			'CVRP',
			'VRPPD',
			'TSP',
			'Picker routing',
			'FEFO',
			'K-means',
			'Dijkstra',
			'Double-entry accounting',
			'Feature-first architecture'
		],
		links: [],
		note: 'Internal product: no public link'
	},
	'nda-photos': {
		id: 'nda-photos',
		title: 'Project [[xxxxxx]]',
		kana: 'プロジェクト[[xxx]]',
		catchphrase: 'A private Google Photos, with its own machine learning!!',
		summary:
			'A private, self-hosted photo and video library for a government client, in the spirit of Google Photos: search by people, places, and folders, a map of where photos were taken, and custom computer vision that estimates age and gender, recognizes landmarks, and spots notable figures.',
		quote: "Can't say. Ask me in an interview.",
		tagline: 'Google Photos–style platform with custom ML',
		role: 'Built 3 of 4 detection pipelines',
		reach: 'Government client · NDA',
		where: 'Sprout Digital Labs · client project',
		when: 'Nov 2024 – Sep 2025',
		illustration: 'case-photos',
		classified: true,
		shout: { default: 'EYES ONLY!' },
		highlights: {
			default: [
				'Built three of the four detection pipelines (age/gender, landmark, notable figure) in a computer-vision service for a government media platform.',
				'Swapped a TensorFlow classifier for YOLO + ONNX, and fixed a PyTorch upgrade that stopped every model from loading.',
				'Reworked search and map UX, including restoring semantic search ranking that a regression had switched off.'
			]
		},
		whatIDid: [
			'Built the age/gender estimation, landmark recognition, and notable-figure recognition pipelines of a computer-vision microservice (FastAPI, Docker), inside a service a colleague had scaffolded.',
			'Ported an earlier Flask prototype into the production service, replacing stubbed endpoints with real model inference.',
			'Integrated an open-source age/gender model (MiVOLO) with a YOLO-based face and person detector.',
			'Replaced a TensorFlow/Keras landmark classifier with a lighter YOLO + ONNX pipeline, removing the TensorFlow dependency entirely.',
			'Fixed model loading after a PyTorch 2.6 upgrade changed a default and broke every model.',
			'Added GPU detection and traceback-level error logging for production debugging, plus container and ARM64 build fixes.',
			'Wrote a retraining guide for the two custom-trained models.',
			'Extended the analysis results page with similar-photos and detail views, in English and Indonesian.',
			'Reworked global search into people, places, and folders with debouncing and caching, and fixed a regression that had switched off semantic search ranking.',
			'Made the map auto-center and zoom to fit photo locations.',
			'Removed an overly strict request-size limit in a production hotfix.'
		],
		impact:
			"Took the platform's photo-analysis features from mock responses to real model inference, and kept them running through a framework upgrade that broke model loading.",
		learned:
			'In production ML the model is the easy part. What breaks is the runtime around it — one changed PyTorch default was enough to stop every model from loading.',
		tags: ['Python', 'FastAPI', 'YOLOv8', 'ONNX', 'PyTorch', 'Docker', 'SvelteKit', 'Computer vision'],
		links: [],
		note: 'Under NDA. Happy to walk through the engineering in an interview.'
	},
	'nda-health': {
		id: 'nda-health',
		title: 'Client [[xxxxxxx]]',
		kana: 'クライアント[[xxx]]',
		catchphrase: 'Open-heart surgery on two live apps!!',
		summary:
			'Two live iOS apps of an online healthcare platform, one for patients and one for doctors. From April 2025, Apple only accepted App Store uploads built with Xcode 16 and the iOS 18 SDK, so both apps had to make the jump without breaking.',
		quote: "Can't name the patient. The operation went fine.",
		tagline: "Shadowing a healthcare platform's existing product",
		role: 'Sole iOS engineer on the migration',
		reach: 'Two live apps · NDA',
		where: 'Sprout Digital Labs · client project',
		when: 'Apr – May 2025',
		illustration: 'case-health',
		classified: true,
		shout: { default: 'TOP SECRET!' },
		highlights: {
			default: [
				"Brought two live healthcare iOS apps onto Xcode 16 and the iOS 18 SDK to meet Apple's App Store submission requirement.",
				'Cleared the deprecation, concurrency, and dependency breakages the new toolchain surfaced across both codebases.',
				'Fixed two build-breaking issues: a socket-library regression and a failing CocoaPods install script.'
			]
		},
		whatIDid: [
			"Brought two live iOS apps of a healthcare platform (patient-facing and doctor-facing) onto Xcode 16 and the iOS 18 SDK to meet Apple's April 2025 App Store submission requirement.",
			'Upgraded the toolchain and CocoaPods dependencies, then cleared the errors and deprecations the new SDK surfaced.',
			'Replaced deprecated Apple APIs, such as legacy data unarchiving, with their current secure equivalents.',
			'Resolved new Swift concurrency and access-control warnings introduced by the stricter compiler.',
			'Updated dozens of delegate protocols for modern weak-reference rules and moved view-model state off a deprecated RxSwift type, across roughly 90 files.',
			'Diagnosed a regression in a real-time socket library, pinned it to a known-good version, and updated the call sites to match.',
			'Fixed a CocoaPods post-install script that broke installs on unset shell variables.',
			'Updated push-notification and analytics SDK integrations to versions compatible with the new toolchain.',
			'Cleaned up a corrupted Xcode project file left behind by merge conflicts.',
			'Added a naming-conventions rules file for AI-assisted coding to both codebases.'
		],
		impact:
			"Kept two live healthcare apps shippable on the App Store through Apple's Xcode 16 requirement, in about six weeks — and neither build fix needed a redo afterward.",
		learned:
			'A forced toolchain upgrade collects years of postponed deprecations into one bill. Sometimes the safest fix is pinning a dependency, not chasing its newest version.',
		tags: ['Swift', 'iOS', 'Xcode 16', 'iOS 18 SDK', 'CocoaPods', 'RxSwift', 'Swift Concurrency', 'Socket.IO'],
		links: [],
		note: "The client's existing product, under NDA. Happy to walk through it in an interview."
	},
	labamu: {
		id: 'labamu',
		title: 'Labamu',
		kana: 'ラバム',
		catchphrase: 'The 1M+ download POS app, now in Singapore!!',
		summary:
			'Labamu is a point-of-sale and bookkeeping app for small businesses: cashier, catalog, invoices and quotes, and receipts printed over a Bluetooth printer. Past a million downloads, it now also runs for merchants in Singapore.',
		quote: 'New country, new currency, same app.',
		tagline: 'POS & business app for MSMEs',
		role: 'Core mobile engineer · Singapore launch',
		reach: '1M+ downloads · 4.3★',
		where: 'Sprout Digital Labs',
		when: 'Jul 2024 – May 2026',
		illustration: 'pos',
		shout: { default: 'SECOND COUNTRY!' },
		rating: '4.3',
		highlights: {
			default: [
				'As core mobile engineer, adapted Labamu to Singapore: SingPass login, rounding-safe SGD pricing, 2C2P payments, and local business validation.',
				'Designed a configurable, feature-flagged home screen so one codebase serves both Indonesia and Singapore.',
				'Tracked down a silent iOS bug that stopped receipts from printing.'
			]
		},
		whatIDid: [
			'Core mobile engineer on the workstream that made Labamu work for Singapore merchants — local identity, payments, pricing, and business rules — on a codebase shared with Indonesia.',
			"Built SingPass (Singapore's national digital ID) sign-up and login, including resuming an interrupted registration, plus a manual registration path alongside it — on top of a migration to v3 auth APIs with OTP rate limits and lockouts.",
			'Designed a configurable home screen driven by region and feature flags, replacing duplicated per-region screens on phone and tablet, documented with nine design docs.',
			'Built a price-calculation and currency engine that avoids rounding errors between currencies with cents (SGD, MYR) and without (IDR), covered by unit tests.',
			'Integrated 2C2P as a payment method in the cashier flow, alongside QRIS improvements.',
			"Built region-aware validation: business-profile completeness rules per country and entity type (including Singapore's UEN), and a phone-number normalizer with country-specific rules.",
			'Adapted invoices, quotes, cashier, and receipts to show the right currency per region, and gated barcode features where Singapore needed different behavior.',
			'Tracked down why receipts silently wouldn\'t print on iOS — a Bluetooth permission flag disabled in the iOS build config — and hardened printer and scanner connections on iOS and Android.',
			"Kept the Singapore branches in sync with the shared main codebase through repeated rebases, worked through UAT feedback for the rollout, and handed the workstream over to Labamu's in-house team.",
			'Earlier: refactored the community feature and moved onboarding date pickers onto the shared CashKit component library.'
		],
		impact:
			"Core mobile engineer on Labamu's launch in Singapore, its second country: national-ID sign-in, rounding-safe SGD pricing, and 2C2P payments, all in the same app Indonesian merchants use — then handed the workstream over to Labamu's in-house team.",
		learned:
			'Going multi-country is mostly configuration, not features. Building one switchable screen instead of copying per region is what kept two markets shippable from one codebase.',
		tags: [
			'Flutter',
			'Dart',
			'GetX',
			'iOS',
			'Android',
			'SingPass',
			'2C2P',
			'QRIS',
			'Feature flags',
			'Localization',
			'Bluetooth printing'
		],
		links: [
			{ label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=id.co.labamu.app' },
			{ label: 'App Store', href: 'https://apps.apple.com/sg/app/labamu-apps-pembukuan-umkm/id1625291429' },
			{ label: 'Singapore site', href: 'https://labamu.sg' }
		]
	},
	quickpro: {
		id: 'quickpro',
		title: 'QuickPro',
		kana: 'クイックプロ',
		catchphrase: 'Read the market while it moves!!',
		summary:
			'QuickPro is FOREXimf\'s trading app: a watchlist with live charts, placing and managing trades, an economic calendar, and Market Detector for reading the market as it moves.',
		quote: 'The market moves. The screen keeps up.',
		tagline: 'Real-time trading app',
		role: 'Freelance mobile engineer · team of 4',
		reach: '100K+ downloads · 4.5★',
		where: 'Foreximf.com · freelance, remote',
		when: 'Jul 2022 – Apr 2023',
		illustration: 'trading',
		shout: { default: 'FIVE-MONTH BUILD!' },
		rating: '4.5',
		highlights: {
			default: [
				'Built Market Detector, the feature traders use to read current market information, from API client to UI.',
				'Laid the base for the real-time market-order flow, which teammates kept extending after my part ended.',
				'Wrote the order logic and per-pair decimal precision on the trade screen.'
			]
		},
		whatIDid: [
			'Built Market Detector end to end on the client: a feed for reading current market information, with type filters, notifications, and charts on the detail screen.',
			'Laid the base for the real-time market-order flow: the trade module that hosts every trading screen, the market-execution screen, and the early trade service layer.',
			'Helped design the initial WebSocket approach for live trading data; teammates later built reconnect handling and further improvements on top of it.',
			"Wrote the trade screen's order logic: buy/sell and pending-order condition checks, and the calculator formulas.",
			"Made prices follow each currency pair's own number of decimal places instead of one fixed setting.",
			'Fixed clashes between screens listening to the same live data by adding a shared listener bridge, plus a listener bug on position history.',
			'Built the economic calendar: moved it to a CMS-backed API, added a timeline that scrolls to the current event, finished-event states, and deep links to a specific event.',
			'Built the home screen: currency flags, login dialog, and a watchlist timeframe kept in sync with the chart.'
		],
		impact:
			"Initiated two core pieces of QuickPro — Market Detector and the base of the real-time market-order flow — in a five-month build with Foreximf's team, and left a foundation other engineers kept building on.",
		learned:
			"I wrote the first version of the real-time order flow, then watched other people keep building on it. That's when it clicked for me: a good base isn't the cleverest code, it's the one the next person can extend without having to ask me.",
		tags: ['Flutter', 'Dart', 'flutter_bloc', 'flutter_modular', 'WebSocket', 'Dio', 'fl_chart', 'Firebase', 'Hive'],
		links: [
			{ label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=com.foreximf.client' }
		]
	},
	dressonme: {
		id: 'dressonme',
		title: 'DressOnMe',
		kana: 'ドレスオンミー',
		catchphrase: 'A fitting room that fits in your pocket!!',
		summary:
			'DressOnMe is a camera-based virtual fitting room: try clothes on virtually, keep a wardrobe of what you own, and save and share outfit ideas. Built as a Bangkit Academy 2022 capstone project.',
		quote: 'Try it on before you buy it.',
		tagline: 'Virtual fitting app',
		role: 'Sole mobile engineer · team of 7',
		reach: 'Public store releases · now delisted',
		where: 'Bangkit Incubation · Dikti & Binus',
		when: 'Sep 2022 – Jan 2023',
		illustration: 'fitting',
		shout: { default: 'ONLY MOBILE DEV!' },
		highlights: {
			default: [
				'Only mobile engineer on a 7-person Bangkit capstone team; rebuilt the app from Kotlin to Flutter for Android and iOS.',
				"Built the camera try-on flow and connected it to the ML team's server-side model.",
				"Took it to public store releases (v0.9.34) during Bangkit's capstone incubation program."
			]
		},
		whatIDid: [
			'Rebuilt the app in Flutter from an existing Kotlin version made by an earlier team member, so it could ship on Android and iOS from one codebase.',
			'Set up the foundation with clean architecture (domain, data, presentation), BLoC/Cubit for state, go_router, get_it, and Hive.',
			'Built the camera flow for virtual try-on: live preview, front/back switching, and fixes for aspect ratio and mirrored images.',
			"Integrated the ML team's try-on service: the app uploads the user's photo, the server runs the model, and the result comes back to the app.",
			'Built the wardrobe: add, edit, delete, and reorder clothing items, with auto-crop on upload.',
			'Integrated Firebase Analytics, Crashlytics, and push notifications.',
			'Set up localization for multiple languages.',
			'Migrated navigation to go_router 6.',
			'Set up the Codemagic CI/CD pipeline and fixed its build failures.',
			'Profiled the release build for jank (dropped frames).'
		],
		impact:
			"As the only mobile engineer on a team of seven, took DressOnMe from an Android-only Kotlin app to a cross-platform Flutter app with public store releases, as part of Bangkit's capstone incubation program.",
		learned:
			"I was the only mobile dev on a team of seven, so if the app broke, nobody else could fix it. That's why I set up the structure before the screens: future me needed code he could still read at 2 AM before a demo.",
		tags: ['Flutter', 'Dart', 'Clean Architecture', 'BLoC/Cubit', 'go_router', 'Firebase', 'Hive', 'Codemagic', 'Camera'],
		links: [],
		note: 'No longer listed on the stores'
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
		text: 'Takes Labamu to Singapore. Becomes core engineer and PIC on Khonic.',
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
