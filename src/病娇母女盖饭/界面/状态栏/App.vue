<template>
  <div class="status-bar">
    <div class="header">
      <span class="title">🏠 {{ data.世界.当前地点 }}</span>
      <span class="time">{{ data.世界.当前时间 }}</span>
    </div>

    <div class="characters">
      <CharacterPanel
        name="诗雨"
        :role="'妹妹'"
        :dependence="data.诗雨.依存度"
        :yandere="data.诗雨.病娇度"
        :jealousy="data.诗雨.嫉妒值"
        :mood="data.诗雨.心情"
        :phase="data.诗雨.$病娇阶段"
        :behavior="data.诗雨.当前行为"
        :outfit="data.诗雨.着装"
        theme-color="#ff6b9d"
        icon="🌸"
      />

      <div class="vs-divider">
        <div class="vs-line"></div>
        <span class="vs-text">VS</span>
        <div class="competition-bar">
          <div
            class="competition-fill"
            :style="{ width: data.母女关系.竞争指数 + '%', background: competitionColor }"
          ></div>
        </div>
        <span class="competition-label">竞争指数 {{ data.母女关系.竞争指数 }}</span>
        <span class="advantage">优势: {{ advantageText }}</span>
      </div>

      <CharacterPanel
        name="婉清"
        :role="'妈妈'"
        :dependence="data.婉清.依存度"
        :yandere="data.婉清.病娇度"
        :jealousy="data.婉清.嫉妒值"
        :mood="data.婉清.心情"
        :phase="data.婉清.$病娇阶段"
        :behavior="data.婉清.当前行为"
        :outfit="data.婉清.着装"
        theme-color="#c084fc"
        icon="🌹"
      />
    </div>

    <div class="relation-event">
      <span class="event-label">📌 当前事件</span>
      <span class="event-text">{{ data.母女关系.当前事件 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from './store';
import CharacterPanel from './components/CharacterPanel.vue';

const data = useDataStore();

const competitionColor = computed(() => {
  const val = data.value.母女关系.竞争指数;
  if (val < 30) return '#4ade80';
  if (val < 60) return '#fbbf24';
  return '#ef4444';
});

const advantageText = computed(() => {
  const adv = data.value.母女关系.当前优势方;
  if (adv === '诗雨') return '🌸 诗雨领先';
  if (adv === '婉清') return '🌹 婉清领先';
  if (adv === '僵持') return '⚡ 势均力敌';
  return '— 暂无';
});
</script>

<style scoped>
.status-bar {
  background: linear-gradient(135deg, #1a0a1a 0%, #2d1b2e 100%);
  border-radius: 12px;
  padding: 12px 16px;
  color: #f3e8ff;
  font-size: 13px;
  border: 1px solid rgba(255, 107, 157, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.title {
  font-weight: 600;
  color: #ff6b9d;
  font-size: 14px;
}

.time {
  color: rgba(255, 255, 255, 0.5);
  font-size: 12px;
}

.characters {
  display: flex;
  gap: 12px;
  align-items: stretch;
}

.vs-divider {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 60px;
  gap: 6px;
}

.vs-line {
  width: 1px;
  flex: 1;
  background: linear-gradient(to bottom, transparent, rgba(255, 255, 255, 0.2), transparent);
}

.vs-text {
  font-weight: 700;
  font-size: 16px;
  color: #fbbf24;
  text-shadow: 0 0 10px rgba(251, 191, 36, 0.4);
}

.competition-bar {
  width: 50px;
  height: 4px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
  overflow: hidden;
}

.competition-fill {
  height: 100%;
  border-radius: 2px;
  transition: width 0.5s ease;
}

.competition-label {
  font-size: 10px;
  color: rgba(255, 255, 255, 0.4);
}

.advantage {
  font-size: 10px;
  color: #fbbf24;
  white-space: nowrap;
}

.relation-event {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.event-label {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
  white-space: nowrap;
  font-weight: 500;
}

.event-text {
  color: #ddd6fe;
  font-size: 12px;
  line-height: 1.5;
}
</style>
