import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'WCSSM2',
  description: 'WCSSM2 documentation',
  srcDir: './docs',
  base: '/wcssm2/docs/',
  cleanUrls: true,
  // Our homepage links ahead to guide/sales pages that aren't authored yet; allow the
  // build to pass until they land. Remove once those pages exist.
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: 'Plugin', link: '/landing' },
      { text: 'Home', link: '/' },
      { text: 'Demo', link: '/guide/setup-demo' }
    ],
    sidebar: [
      {
        text: 'Demos (VitePress starter)',
        items: [
          { text: 'Home demo', link: '/index-demo' },
          { text: 'Setup demo', link: '/guide/setup-demo' }
        ]
      }
    ]
  }
})
