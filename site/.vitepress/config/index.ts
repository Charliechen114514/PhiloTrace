import { defineConfig } from 'vitepress'
import { nav } from './nav'
import { buildSidebar } from './sidebar'
import { mermaidPlugin } from '../plugins/mermaid-plugin'

// 本地开发用 '/'；CI 部署到 GitHub Pages 项目站时由 BASE_PATH 注入 '/<repo>/'，
// 这样本地与线上共用同一份配置，无需手动改。
export default defineConfig({
  srcDir: '../content',

  title: 'PhiloTrace · 哲思留痕',
  description: '开放式哲学学习与对话笔记站 — 记录思想的生成痕迹',
  lang: 'zh-CN',
  base: process.env.BASE_PATH || '/',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
  ],

  markdown: {
    lineNumbers: false,
    theme: {
      light: 'github-light',
      dark: 'github-dark',
    },
    config(md) {
      md.use(mermaidPlugin)
    },
  },

  themeConfig: {
    nav,
    sidebar: buildSidebar(),

    search: {
      provider: 'local',
    },

    editLink: {
      // 建好仓库后改成真实地址
      pattern: 'https://github.com/charliechen/PhiloTrace/edit/main/content/:path',
      text: '在 GitHub 上编辑此页',
    },

    footer: {
      message: '基于 VitePress 构建 · 内容采用 CC BY-SA 4.0',
      copyright: 'Copyright 2026 PhiloTrace',
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/charliechen/PhiloTrace' },
    ],

    outline: {
      label: '本页导航',
      level: [2, 3],
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    lastUpdatedText: '最后更新',
  },
})
