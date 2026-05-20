<template>
  <div class="inv-panel">
    <div class="equip-row">
      <div class="equip-cell">
        <span class="equip-label">武器</span>
        <span class="equip-val">{{ data.主角.装备.武器 || '无' }}</span>
      </div>
      <div class="equip-cell">
        <span class="equip-label">防具</span>
        <span class="equip-val">{{ data.主角.装备.防具 || '无' }}</span>
      </div>
      <div class="equip-cell">
        <span class="equip-label">饰品</span>
        <span class="equip-val">{{ data.主角.装备.饰品 || '无' }}</span>
      </div>
    </div>

    <h3 class="inv-title"><i class="fas fa-box-open"></i> 物品栏</h3>
    <div class="inv-list">
      <div class="inv-item" v-for="(item, name) in data.主角.物品栏" :key="name">
        <div class="inv-name">
          <span>{{ name }}</span>
          <span class="inv-qty">×{{ item.数量 }}</span>
        </div>
        <div class="inv-desc">{{ item.描述 }}</div>
      </div>
      <div class="empty" v-if="Object.keys(data.主角.物品栏).length === 0">
        行囊空空，江湖路远，且行且拾。
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const data = useDataStore().data;
</script>

<style lang="scss" scoped>
.inv-panel {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.equip-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 6px;
}

.equip-cell {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px;
  background: rgba(139, 105, 20, 0.04);
  border: 1px solid rgba(139, 105, 20, 0.12);
  border-radius: 3px;
}

.equip-label {
  font-size: 10px;
  color: var(--c-stone);
  margin-bottom: 2px;
}

.equip-val {
  font-size: 11px;
  font-weight: 600;
  text-align: center;
}

.inv-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--c-bronze);
  margin: 0;
  display: flex;
  align-items: center;
  gap: 5px;
}

.inv-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.inv-item {
  padding: 7px 10px;
  background: rgba(139, 105, 20, 0.03);
  border-left: 2px solid var(--c-bronze);
  border-radius: 0 3px 3px 0;
}

.inv-name {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  font-size: 12px;
  margin-bottom: 2px;
}

.inv-qty {
  font-size: 11px;
  color: var(--c-stone);
  font-weight: 400;
}

.inv-desc {
  font-size: 11px;
  color: var(--c-stone);
  line-height: 1.4;
}

.empty {
  font-size: 11px;
  color: var(--c-stone);
  font-style: italic;
  text-align: center;
  padding: 12px 0;
}
</style>
