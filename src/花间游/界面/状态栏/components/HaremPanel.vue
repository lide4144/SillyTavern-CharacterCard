<template>
  <div class="harem-panel">
    <div class="section">
      <div class="section-title">🌸 必吃榜进度</div>
      <div class="progress-summary">
        <span class="progress-text">已攻略: {{ conqueredCount }} / 10</span>
        <span class="progress-text">总亲密: {{ totalIntimacy }}</span>
      </div>
    </div>

    <div class="character-list">
      <div v-for="(char, name) in data.必吃榜" :key="name" class="character-card">
        <div class="char-header">
          <span class="char-name">{{ name }}</span>
          <span class="phase-badge" :class="'phase-' + char.攻略阶段">{{ char.攻略阶段 }}</span>
          <span v-if="char.已攻略" class="conquered-mark">❤️</span>
        </div>
        <div class="char-bars">
          <div class="char-bar-row">
            <span class="bar-label">好感</span>
            <div class="char-bar">
              <div class="char-bar-fill affection" :style="{ width: getPercent(char.好感度, -100, 100) + '%', marginLeft: char.好感度 < 0 ? 0 : '50%' }"></div>
            </div>
            <span class="bar-value" :class="{ negative: char.好感度 < 0 }">{{ char.好感度 }}</span>
          </div>
          <div class="char-bar-row">
            <span class="bar-label">亲密</span>
            <div class="char-bar">
              <div class="char-bar-fill intimacy" :style="{ width: char.亲密值 + '%' }"></div>
            </div>
            <span class="bar-value">{{ char.亲密值 }}</span>
          </div>
        </div>
        <div v-if="char.关系 !== '路人'" class="char-relation">{{ char.关系 }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const data = useDataStore();

const conqueredCount = computed(() => {
  return Object.values(data.必吃榜).filter(c => c.已攻略).length;
});

const totalIntimacy = computed(() => {
  return Object.values(data.必吃榜).reduce((sum, c) => sum + c.亲密值, 0);
});

function getPercent(value: number, min: number, max: number) {
  const range = max - min;
  const normalized = value - min;
  return Math.max(0, Math.min(100, (normalized / range) * 100));
}
</script>

<style lang="scss" scoped>
.harem-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section {
  background: rgba(255, 255, 255, 0.6);
  border-radius: 6px;
  padding: 10px;
  border: 1px solid var(--c-rose-dark);
}

.section-title {
  font-size: 12px;
  font-weight: 700;
  color: var(--c-gold);
  margin-bottom: 6px;
}

.progress-summary {
  display: flex;
  gap: 16px;
  font-size: 12px;
}

.progress-text {
  color: var(--c-ink);
}

.character-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.character-card {
  background: rgba(255, 255, 255, 0.8);
  border-radius: 6px;
  padding: 10px;
  border: 1px solid var(--c-rose-dark);
}

.char-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.char-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--c-ink);
}

.conquered-mark {
  margin-left: auto;
  font-size: 14px;
}

.char-bars {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.char-bar-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
}

.bar-label {
  width: 28px;
  color: var(--c-ink-light);
}

.char-bar {
  flex: 1;
  height: 6px;
  background: #e8e0e0;
  border-radius: 3px;
  overflow: hidden;
  position: relative;
}

.char-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.4s ease;
}

.char-bar-fill.affection {
  background: #e91e63;
  min-width: 2px;
}

.char-bar-fill.intimacy {
  background: #9c27b0;
}

.bar-value {
  width: 30px;
  text-align: right;
  color: var(--c-ink);
  font-weight: 600;
}

.bar-value.negative {
  color: var(--c-danger);
}

.char-relation {
  font-size: 11px;
  color: var(--c-ink-light);
  margin-top: 4px;
  font-style: italic;
}
</style>
