import DefaultTheme from 'vitepress/theme'
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DialogueTurn from './components/DialogueTurn.vue'
import OrganizerNote from './components/OrganizerNote.vue'
import ConceptCard from './components/ConceptCard.vue'
import RecentPosts from './components/RecentPosts.vue'
import { setupMermaid } from './mermaid-client'
import './custom.css'

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      // 首页 features 之后注入"最近更新"列表（内容流演示）
      'home-features-after': () => h(RecentPosts),
    })
  },
  setup() {
    setupMermaid()
  },
  enhanceApp({ app }) {
    app.component('DialogueTurn', DialogueTurn)
    app.component('OrganizerNote', OrganizerNote)
    app.component('ConceptCard', ConceptCard)
  },
} satisfies Theme
