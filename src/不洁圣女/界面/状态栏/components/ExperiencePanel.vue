<template>
  <div class="experience-layout">
    <div class="section-head">
      <span class="head-icon">☿</span> 禁忌历程
    </div>

    <!-- 初体验里程碑 -->
    <div class="section-subhead">初体验记录</div>
    <div class="milestone-grid">
      <div v-for="ms in milestones" :key="ms.key" class="milestone-item" :class="{ achieved: ms.achieved }">
        <span class="milestone-icon">{{ ms.achieved ? '✦' : '◇' }}</span>
        <span class="milestone-name">{{ ms.name }}</span>
      </div>
    </div>

    <!-- 累计统计 -->
    <div class="section-subhead">累计统计</div>
    <div class="stat-grid">
      <div class="stat-card">
        <span class="stat-value">{{ store.data.修女.性经验.累计高潮次数 }}</span>
        <span class="stat-label">累计高潮</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">{{ store.data.修女.性经验.累计性交对象数 }}</span>
        <span class="stat-label">性交对象</span>
      </div>
      <div class="stat-card" :class="{ achieved: store.data.修女.性经验.初次受孕 === 1 }">
        <span class="stat-value">{{ store.data.修女.性经验.初次受孕 ? '是' : '否' }}</span>
        <span class="stat-label">已受孕</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const milestones = computed(() => [
  { key: '初吻', name: '初吻', achieved: store.data.修女.性经验.初吻 === 1 },
  { key: '初次触碰', name: '初次被触碰', achieved: store.data.修女.性经验.初次触碰 === 1 },
  { key: '初次插入', name: '初次插入', achieved: store.data.修女.性经验.初次插入 === 1 },
  { key: '初次高潮', name: '初次高潮', achieved: store.data.修女.性经验.初次高潮 === 1 },
  { key: '初次触手', name: '初次触手交合', achieved: store.data.修女.性经验.初次触手 === 1 },
  { key: '初次群交', name: '初次群交', achieved: store.data.修女.性经验.初次群交 === 1 },
  { key: '初次精神操控', name: '初次被精神操控', achieved: store.data.修女.性经验.初次精神操控 === 1 },
  { key: '初次露出', name: '初次公开露出', achieved: store.data.修女.性经验.初次露出 === 1 },
]);
</script>

<style lang="scss" scoped>
.experience-layout {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-head {
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  border-bottom: 2px solid var(--c-crimson);
  padding-bottom: 4px;
  display: inline-block;
  margin-bottom: 4px;
}

.head-icon {
  font-size: 0.75rem;
}

.section-subhead {
  font-size: 0.78rem;
  font-weight: bold;
  font-family: var(--font-display);
  color: var(--c-ash);
  letter-spacing: 0.05em;
}

.milestone-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
}

.milestone-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 5px 8px;
  border: 1px solid var(--c-silver);
  background: #fff;
  opacity: 0.45;
  transition: opacity 0.3s;
}

.milestone-item.achieved {
  opacity: 1;
  border-color: var(--c-crimson);
  background: linear-gradient(135deg, #fff, #fef5f5);
}

.milestone-icon {
  font-size: 0.75rem;
  width: 16px;
  text-align: center;
}

.milestone-item.achieved .milestone-icon {
  color: var(--c-crimson);
}

.milestone-name {
  font-size: 0.72rem;
  font-family: var(--font-display);
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 7px;
}

.stat-card {
  border: 1.5px solid var(--c-silver);
  padding: 8px 6px;
  background: #fff;
  text-align: center;
}

.stat-card.achieved {
  border-color: var(--c-crimson);
  background: linear-gradient(180deg, #fff, #fef5f5);
}

.stat-value {
  display: block;
  font-size: 1.4rem;
  font-weight: bold;
  font-family: var(--font-mono);
  color: var(--c-obsidian);
}

.stat-card.achieved .stat-value {
  color: var(--c-crimson);
}

.stat-label {
  display: block;
  font-size: 0.62rem;
  color: var(--c-ash);
  margin-top: 2px;
  letter-spacing: 0.05em;
}

@media (max-width: 600px) {
  .milestone-grid {
    grid-template-columns: 1fr;
  }
}
</style>
