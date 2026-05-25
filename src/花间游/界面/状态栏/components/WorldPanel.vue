<template>
  <div class="world-panel">
    <div class="world-row">
      <span class="world-icon">📍</span>
      <span class="world-text">{{ data.世界.当前地点 }}</span>
    </div>
    <div class="world-row">
      <span class="world-icon">🕐</span>
      <span class="world-text">{{ data.世界.当前时间 }}</span>
      <span class="world-divider">|</span>
      <span class="world-icon">🌤</span>
      <span class="world-text">{{ data.世界.天气 }}</span>
    </div>
    <div v-if="data.世界.区域信息" class="world-desc">
      {{ data.世界.区域信息 }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const data = useDataStore().data;
</script>

<style lang="scss" scoped>
.world-panel {
  padding: 10px 12px;
  background: linear-gradient(135deg, var(--c-rose) 0%, var(--c-parchment) 100%);
  border-bottom: 1px solid var(--c-rose-dark);
}

.world-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
  font-size: 12px;
}

.world-icon {
  font-size: 13px;
}

.world-text {
  color: var(--c-ink);
  font-weight: 600;
}

.world-divider {
  color: var(--c-rose-dark);
  margin: 0 4px;
}

.world-desc {
  font-size: 11px;
  color: var(--c-ink-light);
  margin-top: 4px;
  font-style: italic;
}
</style>
