# website

featurenotabug.nl

## Running locally

The root site is plain hand-written HTML — no build step. Open a file directly
(`open index.html`) or serve the directory over HTTP:

```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Rebuilding the Scheduled Sale Manager VitePress site

The `/scheduled-sale-manager/` path is a [VitePress](https://vitepress.dev/) site. It is **not
built locally** in normal operation — Vercel builds it on deploy via the
`buildCommand` in `vercel.json`. You only edit the committed source in
`scheduled-sale-manager/docs-src/`; everything else under `scheduled-sale-manager/` is generated output that is
gitignored and wiped/recreated on every build, so never hand-edit it.

To iterate on content with hot reload:

```sh
cd scheduled-sale-manager/docs-src && npm install && npm run dev
```

To reproduce the full deploy build locally (from the repo root):

```sh
# 1. Build the VitePress site
cd scheduled-sale-manager/docs-src && npm install && npm run build && cd ../..

# 2. Wipe the old generated output (everything but docs-src) and copy the fresh
#    dist into scheduled-sale-manager/
cd scheduled-sale-manager
find . -mindepth 1 -maxdepth 1 ! -name docs-src -exec rm -rf {} +
cp -r docs-src/.vitepress/dist/. . && cd ..

# 3. Serve the repo root and visit http://localhost:8000/scheduled-sale-manager/
python3 -m http.server 8000
```

See `CLAUDE.md` for more detail on the `scheduled-sale-manager/` source/output split.
