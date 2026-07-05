import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'WCSSM2',
  description: 'WooCommerce Scheduled Sale Manager',
  srcDir: '.',
  base: '/wcssm2/',
  cleanUrls: true,
  // Our homepage links ahead to guide/sales pages that aren't authored yet; allow the
  // build to pass until they land. Remove once those pages exist.
  ignoreDeadLinks: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/' },
      { text: 'FAQ', link: '/docs/faq' },
      { text: 'Demo', link: '/docs/guide/setup-demo' }
    ],
    sidebar: {
      // The marketing homepage (/) hides the sidebar via frontmatter; only
      // pages under /docs/ get one.
      '/docs/': [
        {
          text: 'Demos (VitePress starter)',
          items: [
            { text: 'Home demo', link: '/docs/index-demo' },
            { text: 'Setup demo', link: '/docs/guide/setup-demo' }
          ]
        }
      ]
    }
  }
})
