<template>
  <div class="status-panel">
    <!-- 核心属性 -->
    <div class="section">
      <div class="section-title">核心属性</div>
      <div class="stat-grid">
        <div class="stat-item">
          <div class="stat-label">体力</div>
          <div class="stat-bar">
            <div class="stat-bar-fill" :style="{ width: data.主角.体力 + '%', background: getBarColor(data.主角.体力) }"></div>
          </div>
          <div class="stat-value">{{ data.主角.体力 }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">内力</div>
          <div class="stat-bar">
            <div class="stat-bar-fill" :style="{ width: data.主角.内力 + '%', background: '#4a90d9' }"></div>
          </div>
          <div class="stat-value">{{ data.主角.内力 }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">花间值</div>
          <div class="stat-bar">
            <div class="stat-bar-fill" :style="{ width: data.主角.花间值 + '%', background: '#d94a90' }"></div>
          </div>
          <div class="stat-value">{{ data.主角.花间值 }}</div>
        </div>
        <div class="stat-item">
          <div class="stat-label">暴露度</div>
          <div class="stat-bar">
            <div class="stat-bar-fill" :style="{ width: data.主角.暴露度 + '%', background: data.主角.暴露度 > 50 ? '#dc143c' : '#ff8c00' }"></div>
          </div>
          <div class="stat-value" :class="{ danger: data.主角.暴露度 > 50 }">{{ data.主角.暴露度 }}</div>
        </div>
      </div>
    </div>

    <!-- 装备与银两 -->
    <div class="section">
      <div class="section-title">装备 & 财物</div>
      <div class="info-grid">
        <div class="info-item"><span class="info-label">💰 银两</span><span class="info-value">{{ data.主角.银两 }} 两</span></div>
        <div class="info-item"><span class="info-label">⚔️ 武器</span><span class="info-value">{{ data.主角.装备.武器 }}</span></div>
        <div class="info-item"><span class="info-label">🛡️ 防具</span><span class="info-value">{{ data.主角.装备.防具 }}</span></div>
        <div class="info-item"><span class="info-label">💎 饰品</span><span class="info-value">{{ data.主角.装备.饰品 }}</span></div>
      </div>
    </div>

    <!-- 武功 -->
    <div v-if="Object.keys(data.主角.武功).length > 0" class="section">
      <div class="section-title">武功</div>
      <div class="martial-list">
        <div v-for="(item, name) in data.主角.武功" :key="name" class="martial-item">
          <span class="martial-name">{{ name }}</span>
          <div class="martial-bar">
            <div class="martial-bar-fill" :style="{ width: item.熟练度 + '%' }"></div>
          </div>
          <span class="martial-value">{{ item.熟练度 }}</span>
        </div>
      </div>
    </div>

    <!-- 物品栏 -->
    <div v-if="Object.keys(data.主角.物品栏).length > 0" class="section">
      <div class="section-title">物品栏</div>
      <div class="inventory-list">
        <div v-for="(item, name) in data.主角.物品栏" :key="name" class="inventory-item">
          <span class="inventory-name">{{ name }}</span>
          <span class="inventory-count">x{{ item.数量 }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const data = useDataStore();

function getBarColor(value: number) {
  if (value > 60) return '#228b22';
  if (value > 30) return '#ff8c00';
  return '#dc143c';
}
</script>

<style lang="scss" scoped>
.status-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
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

.stat-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 3px;
}

.stat-label {
  font-size: 11px;
  color: var(--c-ink-light);
}

.stat-value {
  font-size: 12px;
  font-weight: 700;
  color: var(--c-ink);
  text-align: right;
}

.stat-value.danger {
  color: var(--c-danger);
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 6px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
}

.info-label {
  color: var(--c-ink-light);
}

.info-value {
  color: var(--c-ink);
  font-weight: 600;
}

.martial-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.martial-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
}

.martial-name {
  width: 80px;
  color: var(--c-ink);
  font-weight: 600;
}

.martial-bar {
  flex: 1;
  height: 6px;
  background: #e0d5d5;
  border-radius: 3px;
  overflow: hidden;
}

.martial-bar-fill {
  height: 100%;
  background: var(--c-gold);
  border-radius: 3px;
  transition: width 0.4s ease;
}

.martial-value {
  width: 30px;
  text-align: right;
  font-size: 11px;
  color: var(--c-ink-light);
}

.inventory-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.inventory-item {
  background: var(--c-rose);
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 11px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.inventory-name {
  color: var(--c-ink);
}

.inventory-count {
  color: var(--c-gold);
  font-weight: 700;
}
</style>
