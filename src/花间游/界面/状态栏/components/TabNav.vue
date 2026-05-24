<template>
  <div class="tab-nav">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="tab-btn"
      :class="{ active: modelValue === tab.id }"
      @click="$emit('update:modelValue', tab.id)"
    >
      {{ tab.label }}
    </button>
  </div>
</template>

<script setup lang="ts">
interface Tab {
  id: string;
  label: string;
}

defineProps<{
  modelValue: string | null;
  tabs: Tab[];
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();
</script>

<style lang="scss" scoped>
.tab-nav {
  display: flex;
  border-bottom: 2px solid var(--c-rose-dark);
  background: var(--c-rose);
}

.tab-btn {
  flex: 1;
  padding: 10px 8px;
  border: none;
  background: transparent;
  font-family: var(--font-serif);
  font-size: 13px;
  font-weight: 600;
  color: var(--c-ink-light);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.tab-btn:hover {
  color: var(--c-ink);
  background: rgba(255, 255, 255, 0.4);
}

.tab-btn.active {
  color: var(--c-ink);
  background: var(--c-parchment);
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 20%;
  right: 20%;
  height: 2px;
  background: var(--c-gold);
}
</style>
