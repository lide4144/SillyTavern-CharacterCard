<template>
  <nav class="tabs">
    <button
      v-for="tab in props.tabs"
      :key="tab.id"
      class="tab-button"
      :class="{ active: model === tab.id }"
      @click="toggleTab(tab.id)"
    >
      {{ tab.label }}
    </button>
  </nav>
</template>

<script setup lang="ts">
const props = defineProps<{
  tabs: { id: string; label: string }[];
}>();

const model = defineModel<string | null>({ required: true });

function toggleTab(id: string) {
  model.value = model.value === id ? null : id;
}
</script>

<style lang="scss" scoped>
.tabs {
  display: flex;
  background-color: var(--c-obsidian);
  border-bottom: 3px solid var(--c-gold);
}

.tab-button {
  flex: 1;
  padding: 8px;
  border: none;
  background: transparent;
  color: var(--c-silver);
  font-size: 0.85rem;
  font-weight: bold;
  font-family: var(--font-display);
  cursor: pointer;
  transition: all 0.2s;
  letter-spacing: 0.1em;
  border-right: 1px solid rgba(184, 134, 11, 0.2);
}

.tab-button:last-child {
  border-right: none;
}

.tab-button:hover {
  background-color: var(--c-amethyst);
  color: var(--c-parchment);
}

.tab-button.active {
  background-color: var(--c-parchment);
  color: var(--c-obsidian);
  position: relative;
  top: 1px;
  padding-bottom: 10px;
}
</style>
