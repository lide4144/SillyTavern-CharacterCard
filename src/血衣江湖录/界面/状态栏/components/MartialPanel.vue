<template>
  <div class="martial-panel">
    <section class="m-section">
      <h3><i class="fas fa-fire-alt"></i> 内功心法</h3>
      <div class="m-list">
        <div class="m-item" v-for="(item, name) in data.主角.武学.内功" :key="name">
          <div class="m-header">
            <span class="m-name">{{ name }}</span>
            <span class="m-tier">第 {{ item.层数 }} 层</span>
          </div>
          <div class="m-desc">{{ item.描述 }}</div>
          <div class="m-progress">
            <div class="m-bar">
              <div class="m-fill inner" :style="{ width: (item.层数 / 12) * 100 + '%' }"></div>
            </div>
          </div>
        </div>
        <div class="empty" v-if="Object.keys(data.主角.武学.内功).length === 0">未习得内功</div>
      </div>
    </section>

    <section class="m-section">
      <h3><i class="fas fa-fist-raised"></i> 外功招式</h3>
      <div class="m-list">
        <div class="m-item" v-for="(item, name) in data.主角.武学.外功" :key="name">
          <div class="m-header">
            <span class="m-name">{{ name }}</span>
            <span class="m-tier">熟练 {{ item.熟练度 }}%</span>
          </div>
          <div class="m-desc">{{ item.描述 }}</div>
          <div class="m-progress">
            <div class="m-bar">
              <div class="m-fill outer" :style="{ width: item.熟练度 + '%' }"></div>
            </div>
          </div>
        </div>
        <div class="empty" v-if="Object.keys(data.主角.武学.外功).length === 0">未习得外功</div>
      </div>
    </section>

    <section class="m-section">
      <h3><i class="fas fa-feather-alt"></i> 轻功身法</h3>
      <div class="m-list">
        <div class="m-item" v-for="(item, name) in data.主角.武学.轻功" :key="name">
          <div class="m-header">
            <span class="m-name">{{ name }}</span>
            <span class="m-tier">熟练 {{ item.熟练度 }}%</span>
          </div>
          <div class="m-desc">{{ item.描述 }}</div>
          <div class="m-progress">
            <div class="m-bar">
              <div class="m-fill dodge" :style="{ width: item.熟练度 + '%' }"></div>
            </div>
          </div>
        </div>
        <div class="empty" v-if="Object.keys(data.主角.武学.轻功).length === 0">未习得轻功</div>
      </div>
    </section>

    <div class="power-row">
      <span class="power-label">战力评估</span>
      <span class="power-value">{{ data.主角.$战力评估 }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const data = useDataStore().data;
</script>

<style lang="scss" scoped>
.martial-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.m-section h3 {
  font-size: 13px;
  font-weight: 600;
  color: var(--c-bronze);
  margin: 0 0 8px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.m-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.m-item {
  padding: 8px 10px;
  background: rgba(139, 105, 20, 0.04);
  border: 1px solid rgba(139, 105, 20, 0.12);
  border-radius: 3px;
}

.m-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.m-name {
  font-weight: 600;
  font-size: 12px;
}

.m-tier {
  font-size: 11px;
  color: var(--c-stone);
}

.m-desc {
  font-size: 11px;
  color: var(--c-stone);
  line-height: 1.4;
  margin-bottom: 6px;
}

.m-bar {
  height: 5px;
  background: rgba(44, 36, 27, 0.06);
  border-radius: 3px;
  overflow: hidden;
}

.m-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.5s ease;
}

.m-fill.inner {
  background: linear-gradient(90deg, #7c4a8c, #a66dba);
}

.m-fill.outer {
  background: linear-gradient(90deg, var(--c-cinnabar), #e06050);
}

.m-fill.dodge {
  background: linear-gradient(90deg, var(--c-jade), #6ab77a);
}

.empty {
  font-size: 11px;
  color: var(--c-stone);
  font-style: italic;
  padding: 6px 0;
}

.power-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 8px;
  border-top: 1px solid rgba(139, 105, 20, 0.15);
  font-size: 12px;
}

.power-label {
  color: var(--c-stone);
}

.power-value {
  font-weight: 700;
  color: var(--c-cinnabar);
  font-size: 14px;
}
</style>
