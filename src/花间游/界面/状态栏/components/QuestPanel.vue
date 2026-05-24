<template>
  <div class="quest-panel">
    <div v-if="Object.keys(data.任务.主线).length > 0" class="section">
      <div class="section-title">📜 主线任务</div>
      <div class="quest-list">
        <div v-for="(quest, name) in data.任务.主线" :key="name" class="quest-item main">
          <div class="quest-name">{{ name }}</div>
          <div class="quest-phase">{{ quest.阶段 }}</div>
          <div class="quest-desc">{{ quest.描述 }}</div>
        </div>
      </div>
    </div>

    <div v-if="Object.keys(data.任务.支线).length > 0" class="section">
      <div class="section-title">📋 支线任务</div>
      <div class="quest-list">
        <div v-for="(quest, name) in data.任务.支线" :key="name" class="quest-item side">
          <div class="quest-name">{{ name }}</div>
          <div class="quest-desc">{{ quest.描述 }}</div>
          <div class="quest-target">目标: {{ quest.目标 }}</div>
        </div>
      </div>
    </div>

    <div v-if="Object.keys(data.任务.主线).length === 0 && Object.keys(data.任务.支线).length === 0" class="empty">
      暂无任务
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const data = useDataStore();
</script>

<style lang="scss" scoped>
.quest-panel {
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
  margin-bottom: 8px;
  border-bottom: 1px dashed var(--c-rose-dark);
  padding-bottom: 4px;
}

.quest-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.quest-item {
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
}

.quest-item.main {
  background: rgba(218, 165, 32, 0.1);
  border-left: 3px solid var(--c-gold);
}

.quest-item.side {
  background: rgba(255, 182, 193, 0.2);
  border-left: 3px solid var(--c-rose-dark);
}

.quest-name {
  font-weight: 700;
  color: var(--c-ink);
  margin-bottom: 2px;
}

.quest-phase {
  font-size: 11px;
  color: var(--c-gold);
  font-weight: 600;
  margin-bottom: 2px;
}

.quest-desc {
  color: var(--c-ink-light);
  font-size: 11px;
  line-height: 1.4;
}

.quest-target {
  color: var(--c-ink);
  font-size: 11px;
  margin-top: 4px;
  font-style: italic;
}

.empty {
  text-align: center;
  color: var(--c-ink-light);
  font-size: 12px;
  padding: 20px;
}
</style>
