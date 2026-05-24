<template>
  <div class="card">
    <WorldPanel />

    <TabNav v-model="active_tab" :tabs="tabs" />

    <div class="content-area">
      <div v-if="active_tab === '状态'" class="tab-pane active">
        <StatusPanel />
      </div>
      <div v-else-if="active_tab === '必吃榜'" class="tab-pane active">
        <HaremPanel />
      </div>
      <div v-else-if="active_tab === '任务'" class="tab-pane active">
        <QuestPanel />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import HaremPanel from './components/HaremPanel.vue';
import QuestPanel from './components/QuestPanel.vue';
import StatusPanel from './components/StatusPanel.vue';
import TabNav from './components/TabNav.vue';
import WorldPanel from './components/WorldPanel.vue';

const tabs = [
  { id: '状态', label: '主角状态' },
  { id: '必吃榜', label: '必吃榜' },
  { id: '任务', label: '任务' },
];

const active_tab = useLocalStorage<string | null>('status_bar:active_tab', '状态');
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 720px;
  background-color: var(--c-parchment);
  border: 2px solid var(--c-rose-dark);
  box-shadow: 4px 4px 0px rgba(218, 165, 32, 0.2);
  display: flex;
  flex-direction: column;
  font-family: var(--font-serif);
  color: var(--c-ink);
  font-size: 13px;
  line-height: 1.4;
  margin: 0 auto;
  border-radius: 8px;
  overflow: hidden;
}

.content-area {
  padding: 12px;
  min-height: 0;
}

.tab-pane {
  display: none;
  animation: fadeEffect 0.4s;
}

.tab-pane.active {
  display: block;
}

@keyframes fadeEffect {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
