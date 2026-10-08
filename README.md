# website

featurenotabug.nl

## Running locally

The root site is plain hand-written HTML — no build step. Open a file directly
(`open index.html`) or serve the directory over HTTP:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Rebuilding the wcssm2 VitePress site

The `/wcssm2/` path is a [VitePress](https://vitepress.dev/) site. It is **not
built locally** in normal operation — Vercel builds it on deploy via the
`buildCommand` in `vercel.json`. You only edit the committed source in
`wcssm2/docs-src/`; everything else under `wcssm2/` is generated output that is
gitignored and wiped/recreated on every build, so never hand-edit it.

To iterate on content with hot reload:

```sh
cd wcssm2/docs-src && npm install && npm run dev
```

To reproduce the full deploy build locally (from the repo root):

```sh
# 1. Build the VitePress site
cd wcssm2/docs-src && npm install && npm run build && cd ../..

# 2. Wipe the old generated output and copy the fresh dist into wcssm2/
rm -rf wcssm2/docs wcssm2/assets wcssm2/index.html wcssm2/404.html \
	wcssm2/hashmap.json wcssm2/vp-icons.css
cp -r wcssm2/docs-src/.vitepress/dist/. wcssm2/

# 3. Serve the repo root and visit http://localhost:8000/wcssm2/
python3 -m http.server 8000
```

See `CLAUDE.md` for more detail on the `wcssm2/` source/output split.
