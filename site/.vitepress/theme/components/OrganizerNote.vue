<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <aside class="organizer-note">
    <p class="organizer-note__title">{{ title || '整理者注' }}</p>
    <div class="organizer-note__body"><slot /></div>
  </aside>
</template>
