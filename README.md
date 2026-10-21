# Shaka · portfolio

A manga-styled portfolio for Sesaka Aji Nursyah Bantani, built with SvelteKit and deployed as a static site to GitHub Pages.

The site has two **arcs**, one for each role. Picking an arc rewrites the cover, re-sorts the chapters (projects), and highlights the matching tools. The choice is saved in the URL, so you can send a role-specific link:

- `…/?arc=product`: Product Engineer
- `…/?arc=mobile`: Mobile Engineer

## Editing content

All copy lives in [`src/lib/data/profile.ts`](src/lib/data/profile.ts): arcs, chapters, side stories, stats, timeline, tools, and licenses. Each arc lists which chapters it shows and in what order.

Chapters are laid out like entries in a manga encyclopedia and read one page at a time. When a whole page fits on screen, the book pins in place and scrolling turns the pages; otherwise the pages are stacked and each one flips in as it scrolls into view. The contents tabs and the folded corner scroll to a chapter, and in pinned mode ← / → work too (← is next, as in manga).

Each chapter on the home page is an overview: up to three `highlights` (per arc if you like), the first five tags with a `+N` chip for the rest, and a **Read the full chapter** button. That leads to the chapter's own page at `/chapters/<id>/`, laid out as a one-shot manga (読切): a title spread, then numbered pages of panels.

- `whatIDid`: the story, one panel per item and up to four panels a page. Each panel puts the text in a narration box over a "shot" (the chapter's art, a close-up of it, the portrait, or speed and focus lines) with a sound effect. The layouts, shots, and sound effects are picked in `ChapterDetail.svelte`; the close-up's aim for each illustration is in `src/lib/illustrations/index.ts`.
- `impact`: the climax, a splash panel with the text in a jagged shout box
- `learned`: the epilogue, a speech bubble under the cherry tree, ending with 完
- `media`: screenshots or screen recordings, taped in as panels after the story. Put the files in `static/` (e.g. `static/shots/`) and list them with a path relative to it. Leave it out and the section disappears.
- every tag, the store/website links, and a **Next chapter** card that follows the current arc's order

For NDA work, set `classified: true` and wrap anything confidential in `[[double brackets]]`; it renders as a black redaction bar. Only the length of the bracketed text is used, so put a placeholder like `[[xxxxxxxx]]` there, never the real name. Classified chapters never show media, even if some is listed.

## Portrait art

The manga art lives in `static/art/` as `.webp` with a `.jpg` fallback:

- `shaka-sakura`: the full panel on the cover
- `shaka-bust`: a tighter crop for the character profile

To swap it, replace those files (keep both formats) or point `person.portrait` in `profile.ts` at new ones. Setting `portrait: null` brings back the silhouette.

## Development

```sh
npm install
npm run dev      # local dev server
npm run check    # type-check
npm run build    # static build into ./build
```

## Deploying

`.github/workflows/deploy.yml` builds and deploys on every push to `master`. One-time setup: in the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.

The site is served at `https://izumishaka-desu.github.io/portofolio.github.io/`. The workflow sets `BASE_PATH` to the repo name so asset paths resolve under that prefix.
