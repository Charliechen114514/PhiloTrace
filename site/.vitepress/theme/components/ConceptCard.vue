<script setup lang="ts">
defineProps<{
  title: string
  tag?: string
}>()
</script>

<template>
  <section class="concept-card">
    <header class="concept-card__head">
      <h3 class="concept-card__title">{{ title }}</h3>
      <span v-if="tag" class="concept-card__tag">{{ tag }}</span>
    </header>
    <div class="concept-card__body"><slot /></div>
  </section>
</template>
