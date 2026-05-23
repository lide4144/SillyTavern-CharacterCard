<template>
  <div class="stat-bar">
    <span class="stat-label">{{ label }}</span>
    <div class="stat-track">
      <div class="stat-fill" :style="fillStyle"></div>
    </div>
    <span class="stat-value">{{ value }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string;
  value: number;
  color?: string;
}>();

const fillStyle = computed(() => ({
  width: Math.min(100, Math.max(0, props.value)) + '%',
  background: props.color || '#60a5fa',
}));
</script>

<style scoped>
.stat-bar {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
}

.stat-label {
  color: rgba(255, 255, 255, 0.5);
  min-width: 28px;
}

.stat-track {
  flex: 1;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.5s ease;
}

.stat-value {
  color: rgba(255, 255, 255, 0.7);
  min-width: 20px;
  text-align: right;
}
</style>
