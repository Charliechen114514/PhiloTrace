<script setup lang="ts">
import { withBase } from 'vitepress'
import { data as posts } from '../../data/posts.data'

const recent = posts.slice(0, 6)

const typeLabel: Record<string, string> = {
  passage: '随笔',
  idea: '想法',
  dialogue: '对话',
  reflection: '反思',
  note: '笔记',
  concept: '概念',
  map: '图谱',
}

function fmt(date: unknown): string {
  const d = new Date(date as string)
  return `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()}`
}
</script>

<template>
  <section v-if="recent.length > 0" class="recent-posts">
    <h2>最近更新</h2>
    <ul>
      <li v-for="p in recent" :key="p.url">
        <a :href="withBase(p.url)">{{ p.frontmatter.title }}</a>
        <span class="recent-meta">
          <em class="recent-type">{{ typeLabel[p.frontmatter.type as string] || '笔记' }}</em>
          <time>{{ fmt(p.frontmatter.date) }}</time>
        </span>
        <p v-if="p.frontmatter.summary" class="recent-summary">
          {{ p.frontmatter.summary }}
        </p>
      </li>
    </ul>
  </section>
</template>
