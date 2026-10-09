import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'WCSSM2',
  description: 'Scheduled Sale Manager',
  srcDir: '.',
  base: '/scheduled-sale-manager/',
  cleanUrls: true,
  head: [
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&family=Caveat:wght@600&display=swap' }]
  ],
  themeConfig: {
    logo: { light: '/logo-light.svg', dark: '/logo-dark.svg', alt: '' },
    siteTitle: 'Scheduled Sale Manager 2',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Docs', link: '/docs/' },
      { text: 'FAQ', link: '/docs/faq' }
    ],
    sidebar: {
      // The marketing homepage (/) hides the sidebar via frontmatter; only
      // pages under /docs/ get one.
      '/docs/': [
        {
          text: 'Basics',
          items: [
            { text: 'Introduction', link: '/docs/basics/introduction' },
            { text: 'Getting started', link: '/docs/basics/getting-started' },
            { text: 'How it works', link: '/docs/basics/how-it-works' }
          ]
        },
        {
          text: 'Configuring a sale',
          items: [
            { text: 'Overview', link: '/docs/sales/overview' },
            { text: 'Scheduling', link: '/docs/sales/scheduling' },
            { text: 'Choosing products', link: '/docs/sales/targeting-products' },
            { text: 'Discounts', link: '/docs/sales/discounts' },
            { text: 'Sale settings', link: '/docs/sales/sale-settings' }
          ]
        },
        {
          text: 'Settings',
          items: [
            { text: 'Settings tab', link: '/docs/settings' },
            { text: 'Pricing modes', link: '/docs/pricing-modes' },
            { text: 'Deactivating and uninstalling', link: '/docs/uninstalling' }
          ]
        },
        {
          text: 'Reference',
          items: [
            { text: 'FAQ', link: '/docs/faq' },
            { text: 'Troubleshooting', link: '/docs/reference/troubleshooting' },
            { text: 'Hooks', link: '/docs/reference/hooks' }
          ]
        }
      ]
    }
  }
})
