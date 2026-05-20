<template>
  <div class="tab-nav">
    <button
      v-for="tab in tabs"
      :key="tab.id"
      class="tab-btn"
      :class="{ active: modelValue === tab.id }"
      @click="$emit('update:modelValue', tab.id)"
    >
      <i :class="`fas ${tab.icon}`"></i>
      <span>{{ tab.label }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
interface Tab {
  id: string;
  label: string;
  icon: string;
}

defineProps<{
  modelValue: string | null;
  tabs: Tab[];
}>();

defineEmits<{
  'update:modelValue': [value: string];
}>();
</script>

<style lang="scss" scoped>
.tab-nav {
  display: flex;
  border-bottom: 2px solid var(--c-bronze);
  background: rgba(139, 105, 20, 0.04);
}

.tab-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 8px 0;
  background: none;
  border: none;
  font-family: var(--font-wuxia);
  font-size: 12px;
  color: var(--c-stone);
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
}

.tab-btn:hover {
  color: var(--c-ink);
  background: rgba(139, 105, 20, 0.06);
}

.tab-btn.active {
  color: var(--c-ink);
  font-weight: 600;
}

.tab-btn.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 15%;
  right: 15%;
  height: 2px;
  background: var(--c-cinnabar);
}
</style>
