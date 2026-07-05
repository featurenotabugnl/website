# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The static website for **featurenotabug.nl**. The root site is plain hand-written HTML — no build step, no package manager, no framework, no tests. Each page is a single self-contained `index.html` file with its CSS inlined in a `<style>` block. The one exception is the VitePress docs under `wcssm2/` (see [Docs](#docs-wcssm2docs) below).

## Running locally

There is nothing to build. Open a file directly (`open index.html`) or serve the directory over HTTP:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Structure

- `index.html` — the landing page (just the logo).
- `<slug>/index.html` — one directory per sub-page, each linking to an external project (e.g. `wcssm2/`, `maybe-perma-delete/`). URLs are clean paths (`/wcssm2/`) because each lives in its own folder.

## Conventions

- The `<head>` and the entire `<style>` block are **duplicated verbatim** across every page rather than shared via a stylesheet. When changing the logo styling or shared look, update every `index.html`, or the pages will drift apart.
- The logo is a CSS-only hover gag: the markup spells "feature not a bug" with `👏` separators, and hovering the `.bug` span swaps the clapping emojis (`.👏`) for a bug emoji (`.🐛`) using a sibling (`~`) selector. Keep the `.bug` / `.👏` / `.🐛` class structure intact when editing the logo.
- Indentation is tabs.
- `.DS_Store` and other macOS cruft are gitignored — do not commit them.

## The wcssm2 site (`wcssm2/`)

A [VitePress](https://vitepress.dev/) site serving the whole `/wcssm2/` path: the marketing landing page at `/wcssm2/` and the documentation under `/wcssm2/docs/`. It is **not built locally** — Vercel builds it on deploy via the `buildCommand` in `vercel.json`.

The folders, easy to confuse:

- `wcssm2/docs-src/` — **the source you edit.** Committed. Holds `package.json`, `.vitepress/config.js` (`srcDir` is the repo root of the site, `base` is `/wcssm2/`), the landing page `index.md`, and the docs Markdown under `docs/`.
- `wcssm2/docs-src/docs/` — the docs content. File path = URL path under `/wcssm2/docs/`.
- Everything else under `wcssm2/` (`index.html`, `docs/`, `assets/`, `404.html`, `hashmap.json`, `vp-icons.css`) — **generated build output.** Gitignored, wiped and recreated on every deploy (the dist is copied into `wcssm2/`). Never hand-edit it.

The source folder is deliberately named `docs-src`, not `docs`: the build deletes and recreates the generated output under `wcssm2/`, so source and output must not share a path.

Conventions when working in the site:

- `base` is `/wcssm2/` in `.vitepress/config.js`. Internal links resolve relative to that base, so `link: '/'` is the landing page and `link: '/docs/'` is the docs home.
- Adding a page under `docs-src/docs/` usually means also adding a matching entry to the `sidebar` (and optionally `nav`) in `.vitepress/config.js` — the sidebar is scoped to `/docs/` paths; the landing page hides it via frontmatter. Update both in the same change so they don't drift.
- The build runs `cd wcssm2/docs-src && npm install && npm run build`, then copies `.vitepress/dist/.` into `wcssm2/`. To reproduce the deploy build locally: run those steps and serve the repo root.
- `cleanUrls` is enabled both in VitePress (pages build to `faq.html`, linked as `/docs/faq`) and in `vercel.json` (so direct hits to extensionless URLs serve the `.html` file).
