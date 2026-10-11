# Shaka · portfolio

A manga-styled portfolio for Sesaka Aji Nursyah Bantani, built with SvelteKit and deployed as a static site to GitHub Pages.

The site has two **arcs**, one for each role. Picking an arc rewrites the cover, re-sorts the chapters (projects), and highlights the matching tools. The choice is saved in the URL, so you can send a role-specific link:

- `…/?arc=product`: Product Engineer
- `…/?arc=mobile`: Mobile Engineer

## Editing content

All copy lives in [`src/lib/data/profile.ts`](src/lib/data/profile.ts): arcs, chapters, side stories, stats, timeline, tools, and licenses. Each arc lists which chapters it shows and in what order.

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
