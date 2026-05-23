<template>
  <div class="character-panel" :style="panelStyle">
    <div class="char-header">
      <span class="char-icon">{{ icon }}</span>
      <div class="char-info">
        <span class="char-name">{{ name }}</span>
        <span class="char-role">{{ role }}</span>
      </div>
      <span class="char-phase">{{ phase }}</span>
    </div>

    <div class="stats">
      <StatBar label="依存" :value="dependence" :color="themeColor" />
      <StatBar label="病娇" :value="yandere" color="#ef4444" />
      <StatBar label="嫉妒" :value="jealousy" color="#f97316" />
    </div>

    <div class="mood">
      <span class="mood-label">心情</span>
      <span class="mood-value" :style="moodStyle">{{ moodEmoji }} {{ mood }}</span>
    </div>

    <div class="behavior">
      <span class="behavior-label">行为</span>
      <span class="behavior-text">{{ behavior }}</span>
    </div>

    <div class="outfit" v-if="outfit && Object.keys(outfit).length > 0">
      <span class="outfit-label">着装</span>
      <div class="outfit-items">
        <span v-for="(desc, key) in outfit" :key="key" class="outfit-item">
          <span class="outfit-key">{{ key }}</span>
          <span class="outfit-desc">{{ desc }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import StatBar from './StatBar.vue';

const props = defineProps<{
  name: string;
  role: string;
  dependence: number;
  yandere: number;
  jealousy: number;
  mood: string;
  phase: string;
  behavior: string;
  outfit?: Record<string, string>;
  themeColor: string;
  icon: string;
}>();

const panelStyle = computed(() => ({
  borderColor: props.themeColor + '30',
}));

const moodEmoji = computed(() => {
  const map: Record<string, string> = {
    平静: '😌',
    焦虑: '😰',
    兴奋: '😍',
    愤怒: '😠',
    悲伤: '😢',
    甜蜜: '🥰',
  };
  return map[props.mood] || '😐';
});

const moodStyle = computed(() => {
  const map: Record<string, string> = {
    平静: '#93c5fd',
    焦虑: '#fbbf24',
    兴奋: '#f472b6',
    愤怒: '#ef4444',
    悲伤: '#60a5fa',
    甜蜜: '#f9a8d4',
  };
  return { color: map[props.mood] || '#ccc' };
});
</script>

<style scoped>
.character-panel {
  flex: 1;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 10px;
  border: 1px solid;
  min-width: 0;
}

.char-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 10px;
}

.char-icon {
  font-size: 20px;
}

.char-info {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-width: 0;
}

.char-name {
  font-weight: 700;
  font-size: 14px;
  color: #fff;
}

.char-role {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
}

.char-phase {
  font-size: 10px;
  padding: 2px 8px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
}

.stats {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
}

.mood {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;
  font-size: 12px;
}

.mood-label {
  color: rgba(255, 255, 255, 0.4);
  font-size: 11px;
}

.behavior {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
}

.behavior-label {
  color: rgba(255, 255, 255, 0.4);
  font-size: 11px;
}

.behavior-text {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
}

.outfit {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.outfit-label {
  color: rgba(255, 255, 255, 0.4);
  font-size: 11px;
}

.outfit-items {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.outfit-item {
  display: flex;
  gap: 4px;
  font-size: 11px;
  background: rgba(255, 255, 255, 0.05);
  padding: 2px 6px;
  border-radius: 4px;
}

.outfit-key {
  color: rgba(255, 255, 255, 0.5);
}

.outfit-desc {
  color: rgba(255, 255, 255, 0.7);
}
</style>
