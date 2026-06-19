# Setup

This page is a quick tour of the Markdown features VitePress gives you. Edit
`docs-src/guide/setup.md` to replace it with real content.

## Headings build the outline

Every `##` heading on a page automatically appears in the right-hand "On this
page" outline and gets an anchor link on hover.

## Callouts

> [!TIP]
> Use callouts to draw attention to the important bits.

> [!WARNING]
> Never hand-edit anything inside the generated `docs/` folder — it's wiped on
> every build.

## Code blocks with highlighting

Line highlighting, focus, and a copy button come for free:

```js {2}
export default {
  base: '/wcssm2/docs/', // highlighted line
  cleanUrls: true
}
```

## Code groups

Tabbed code blocks for showing the same thing across tools:

::: code-group

```sh [npm]
npm install
npm run build
```

```sh [pnpm]
pnpm install
pnpm run build
```

:::

## Tables and the rest of Markdown

| Feature       | Supported |
| ------------- | --------- |
| Tables        | ✅        |
| Task lists    | ✅        |
| Footnotes     | ✅        |

- [x] Scaffold VitePress
- [ ] Write real docs

That's the whirlwind tour — see the [VitePress docs](https://vitepress.dev/)
for the full set.
