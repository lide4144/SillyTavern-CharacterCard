<template>
  <div class="quest-panel">
    <section class="q-section" v-if="Object.keys(data.任务.主线).length > 0">
      <h3><i class="fas fa-crown"></i> 主线</h3>
      <div class="q-list">
        <div class="q-item main" v-for="(q, name) in data.任务.主线" :key="name">
          <div class="q-header">
            <span class="q-name">{{ name }}</span>
            <span class="q-stage">{{ q.阶段 }}</span>
          </div>
          <div class="q-desc">{{ q.描述 }}</div>
          <div class="q-target"><i class="fas fa-crosshairs"></i> {{ q.目标 }}</div>
        </div>
      </div>
    </section>

    <section class="q-section" v-if="Object.keys(data.任务.支线).length > 0">
      <h3><i class="fas fa-route"></i> 支线</h3>
      <div class="q-list">
        <div class="q-item side" v-for="(q, name) in data.任务.支线" :key="name">
          <div class="q-header">
            <span class="q-name">{{ name }}</span>
            <span class="q-reward">{{ q.奖励 }}</span>
          </div>
          <div class="q-desc">{{ q.描述 }}</div>
          <div class="q-target"><i class="fas fa-crosshairs"></i> {{ q.目标 }}</div>
        </div>
      </div>
    </section>

    <section class="q-section" v-if="Object.keys(data.任务.随机事件).length > 0">
      <h3><i class="fas fa-dice"></i> 江湖际遇</h3>
      <div class="q-list">
        <div class="q-item rand" v-for="(q, name) in data.任务.随机事件" :key="name">
          <div class="q-header">
            <span class="q-name">{{ name }}</span>
            <span class="q-status" :class="q.状态">{{ q.状态 }}</span>
          </div>
          <div class="q-desc">{{ q.描述 }}</div>
        </div>
      </div>
    </section>

    <div class="empty" v-if="totalQuests === 0">
      暂无任务，且去江湖走走。
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const data = useDataStore().data;

const totalQuests = computed(() =>
  Object.keys(data.value.任务.主线).length +
  Object.keys(data.value.任务.支线).length +
  Object.keys(data.value.任务.随机事件).length
);
</script>

<style lang="scss" scoped>
.quest-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.q-section h3 {
  font-size: 13px;
  font-weight: 600;
  color: var(--c-bronze);
  margin: 0 0 8px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.q-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.q-item {
  padding: 8px 10px;
  background: rgba(139, 105, 20, 0.04);
  border: 1px solid rgba(139, 105, 20, 0.12);
  border-radius: 3px;
}

.q-item.main {
  border-left: 3px solid var(--c-cinnabar);
}

.q-item.side {
  border-left: 3px solid var(--c-gold);
}

.q-item.rand {
  border-left: 3px solid #7c4a8c;
}

.q-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.q-name {
  font-weight: 600;
  font-size: 12px;
}

.q-stage {
  font-size: 10px;
  padding: 1px 6px;
  background: var(--c-cinnabar);
  color: white;
  border-radius: 2px;
}

.q-reward {
  font-size: 10px;
  color: var(--c-gold);
}

.q-status {
  font-size: 10px;
  padding: 1px 6px;
  border-radius: 2px;
  background: rgba(44, 36, 27, 0.08);
  color: var(--c-stone);
}

.q-status.进行中 {
  background: rgba(74, 124, 89, 0.12);
  color: var(--c-jade);
}

.q-status.已解决 {
  background: rgba(139, 105, 20, 0.1);
  color: var(--c-bronze);
}

.q-desc {
  font-size: 11px;
  color: var(--c-stone);
  line-height: 1.4;
  margin-bottom: 4px;
}

.q-target {
  font-size: 11px;
  color: var(--c-ink);
  font-weight: 500;
}

.empty {
  font-size: 11px;
  color: var(--c-stone);
  font-style: italic;
  text-align: center;
  padding: 16px 0;
}
</style>
