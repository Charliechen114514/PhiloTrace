<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  role: string
  name?: string
}>()

// A → 陶土，B → 青灰，其它角色中性。让对话的 A/B 视觉上立刻可分。
const tone = computed<'a' | 'b' | 'o'>(() => {
  const r = props.role.trim().toLowerCase()
  if (r === 'a') return 'a'
  if (r === 'b') return 'b'
  return 'o'
})
const label = computed(() => props.name || props.role)
</script>

<template>
  <div class="dialogue-turn" :data-tone="tone">
    <div class="dialogue-chip">{{ role }}</div>
    <div class="dialogue-body">
      <span class="dialogue-name">{{ label }}</span>
      <div class="dialogue-text"><slot /></div>
    </div>
  </div>
</template>
