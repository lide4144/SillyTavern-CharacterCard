<template>
  <div class="six-dim">
    <div class="dim-item" v-for="(val, key) in data.主角.六维" :key="key">
      <div class="dim-name">{{ key }}</div>
      <div class="dim-bar">
        <div class="dim-fill" :style="{ width: val + '%' }"></div>
      </div>
      <div class="dim-value" :class="tierClass(val)">{{ val }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const data = useDataStore().data;

function tierClass(val: number) {
  if (val >= 86) return 'legendary';
  if (val >= 71) return 'epic';
  if (val >= 51) return 'rare';
  if (val >= 31) return 'common';
  return 'poor';
}
</script>

<style lang="scss" scoped>
.six-dim {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px 10px;
  padding: 10px 14px;
  border-bottom: 1px dashed var(--c-bronze);
}

.dim-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.dim-name {
  font-size: 11px;
  color: var(--c-stone);
  width: 28px;
  flex-shrink: 0;
}

.dim-bar {
  flex: 1;
  height: 6px;
  background: rgba(44, 36, 27, 0.06);
  border-radius: 3px;
  overflow: hidden;
}

.dim-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--c-bronze), var(--c-gold));
  border-radius: 3px;
  transition: width 0.5s ease;
}

.dim-value {
  width: 24px;
  text-align: right;
  font-size: 11px;
  font-weight: 600;
  color: var(--c-ink);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}

.dim-value.poor { color: #8b7d6b; }
.dim-value.common { color: var(--c-ink); }
.dim-value.rare { color: var(--c-jade); }
.dim-value.epic { color: #4a7c9c; }
.dim-value.legendary { color: var(--c-cinnabar); }
</style>
