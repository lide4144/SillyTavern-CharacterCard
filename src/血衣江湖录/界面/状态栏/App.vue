<template>
  <div class="wuxia-card">
    <!-- 顶部世界信息 -->
    <header class="card-header">
      <div class="title-row">
        <h1 class="game-title">血衣江湖录</h1>
        <span class="realm-badge">{{ data.主角.$境界 }}</span>
      </div>
      <div class="world-info">
        <span class="info-item"><i class="fas fa-clock"></i> {{ data.世界.当前时间 }}</span>
        <span class="info-item"><i class="fas fa-map-marker-alt"></i> {{ data.世界.当前地点 }}</span>
        <span class="info-item"><i class="fas fa-cloud"></i> {{ data.世界.天气 }}</span>
      </div>
    </header>

    <!-- 核心状态条 -->
    <StatusBars />

    <!-- 六维速览 -->
    <SixDimensions />

    <!-- Tab 导航 -->
    <TabNav v-model="active_tab" :tabs="tabs" />

    <!-- 内容区域 -->
    <div v-if="active_tab" class="content-area">
      <div v-show="active_tab === '武学'" class="tab-pane">
        <MartialPanel />
      </div>
      <div v-show="active_tab === '行囊'" class="tab-pane">
        <InventoryPanel />
      </div>
      <div v-show="active_tab === '任务'" class="tab-pane">
        <QuestPanel />
      </div>
      <div v-show="active_tab === '江湖'" class="tab-pane">
        <WorldPanel />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import MartialPanel from './components/MartialPanel.vue';
import InventoryPanel from './components/InventoryPanel.vue';
import QuestPanel from './components/QuestPanel.vue';
import WorldPanel from './components/WorldPanel.vue';
import StatusBars from './components/StatusBars.vue';
import SixDimensions from './components/SixDimensions.vue';
import TabNav from './components/TabNav.vue';
import { useDataStore } from './store';

const data = useDataStore().data;

const tabs = [
  { id: '武学', label: '武学', icon: 'fa-khanda' },
  { id: '行囊', label: '行囊', icon: 'fa-sack-dollar' },
  { id: '任务', label: '任务', icon: 'fa-scroll' },
  { id: '江湖', label: '江湖', icon: 'fa-users' },
];

const active_tab = useLocalStorage<string | null>('wuxia_status:active_tab', '武学');
</script>

<style lang="scss" scoped>
.wuxia-card {
  width: 100%;
  max-width: 720px;
  background: linear-gradient(180deg, var(--c-parchment) 0%, #ebe4d6 100%);
  border: 2px solid var(--c-bronze);
  border-radius: 4px;
  box-shadow: 0 0 0 1px rgba(139, 105, 20, 0.3), 0 4px 12px rgba(44, 36, 27, 0.15);
  display: flex;
  flex-direction: column;
  font-family: var(--font-wuxia);
  color: var(--c-ink);
  font-size: 13px;
  line-height: 1.5;
  margin: 0 auto;
  overflow: hidden;
}

.card-header {
  background: linear-gradient(90deg, var(--c-ink) 0%, #3d3025 100%);
  color: var(--c-parchment);
  padding: 10px 14px;
}

.title-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.game-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
  letter-spacing: 2px;
  color: var(--c-gold);
}

.realm-badge {
  font-size: 11px;
  padding: 2px 8px;
  border: 1px solid var(--c-cinnabar);
  color: var(--c-cinnabar);
  border-radius: 2px;
}

.world-info {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 11px;
  opacity: 0.85;
}

.info-item {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}

.content-area {
  padding: 10px 14px 14px;
  min-height: 0;
}

.tab-pane {
  animation: fadeIn 0.35s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
