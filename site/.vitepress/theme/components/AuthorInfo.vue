<script setup>
import { useData } from 'vitepress'

const { frontmatter } = useData()
</script>

<template>
  <div v-if="frontmatter.author" class="author-block">
    <div class="author-line">
      <span class="author-label">作者</span>
      <span class="author-name">{{ frontmatter.author }}</span>
      <span v-if="frontmatter.date" class="author-sep">·</span>
      <span v-if="frontmatter.date" class="author-date">{{ frontmatter.date }}</span>
    </div>
  </div>
</template>

<style scoped>
.author-block {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--vp-c-divider);
}
.author-line {
  color: var(--vp-c-text-2);
  font-size: 0.875rem;
  line-height: 1.6;
}
.author-label {
  font-weight: 600;
  margin-right: 0.25rem;
}
.author-name {
  color: var(--vp-c-text-1);
}
.author-sep {
  margin: 0 0.5rem;
}
</style>
