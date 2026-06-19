import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'WCSSM2',
  description: 'WCSSM2 documentation',
  base: '/wcssm2/docs/',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Guide', link: '/guide/setup' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Setup', link: '/guide/setup' }
        ]
      }
    ]
  }
})
