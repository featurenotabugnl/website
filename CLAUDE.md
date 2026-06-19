# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

The static website for **featurenotabug.nl**. It is plain hand-written HTML — no build step, no package manager, no framework, no tests. Each page is a single self-contained `index.html` file with its CSS inlined in a `<style>` block.

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
