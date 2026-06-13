import type { DefaultTheme } from 'vitepress'

// 顶部导航。门类与 content/ 下的目录一一对应。
export const nav: DefaultTheme.NavItem[] = [
  { text: '首页', link: '/' },
  { text: '随笔', link: '/passages/' },
  { text: '对话', link: '/dialogues/' },
  { text: '概念', link: '/concepts/' },
  { text: '笔记', link: '/notes/' },
  { text: '图谱', link: '/maps/' },
  { text: '反思', link: '/reflections/' },
  { text: '关于', link: '/about/' },
]
