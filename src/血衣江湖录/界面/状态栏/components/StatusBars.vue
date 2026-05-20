<template>
  <div class="status-bars">
    <div class="bar-row">
      <span class="bar-label"><i class="fas fa-heart"></i> 气血</span>
      <div class="bar-track">
        <div class="bar-fill hp" :style="{ width: hpPercent + '%' }"></div>
      </div>
      <span class="bar-value" :class="{ danger: hpPercent < 25 }">
        {{ data.主角.状态.气血 }} / {{ data.主角.状态.气血上限 }}
      </span>
    </div>
    <div class="bar-row">
      <span class="bar-label"><i class="fas fa-wind"></i> 内力</span>
      <div class="bar-track">
        <div class="bar-fill mp" :style="{ width: mpPercent + '%' }"></div>
      </div>
      <span class="bar-value">{{ data.主角.状态.内力 }} / {{ data.主角.状态.内力上限 }}</span>
    </div>
    <div class="bar-row">
      <span class="bar-label"><i class="fas fa-drumstick-bite"></i> 饱腹</span>
      <div class="bar-track">
        <div class="bar-fill food" :style="{ width: data.主角.状态.饱腹 + '%' }"></div>
      </div>
      <span class="bar-value">{{ data.主角.状态.饱腹 }}%</span>
    </div>
    <div class="status-meta">
      <span class="meta-tag" v-if="data.主角.状态.伤势 !== '无' && data.主角.状态.伤势">
        <i class="fas fa-bandage"></i> {{ data.主角.状态.伤势 }}
      </span>
      <span class="meta-tag poison" v-if="data.主角.状态.中毒 !== '无' && data.主角.状态.中毒">
        <i class="fas fa-skull-crossbones"></i> {{ data.主角.状态.中毒 }}
      </span>
      <span class="meta-tag equip"><i class="fas fa-shield-alt"></i> {{ data.主角.装备.武器 || '空手' }}</span>
      <span class="meta-tag money"><i class="fas fa-coins"></i> {{ data.主角.银两 }}两</span>
      <span class="meta-tag fame" :class="{ evil: data.主角.善恶值 < 0 }">
        <i class="fas fa-yin-yang"></i> 善恶 {{ data.主角.善恶值 > 0 ? '+' : '' }}{{ data.主角.善恶值 }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const data = useDataStore().data;

const hpPercent = computed(() => {
  const max = data.value.主角.状态.气血上限 || 1;
  return Math.min(100, Math.max(0, (data.value.主角.状态.气血 / max) * 100));
});

const mpPercent = computed(() => {
  const max = data.value.主角.状态.内力上限 || 1;
  return Math.min(100, Math.max(0, (data.value.主角.状态.内力 / max) * 100));
});
</script>

<style lang="scss" scoped>
.status-bars {
  padding: 10px 14px;
  background: rgba(139, 105, 20, 0.04);
  border-bottom: 1px dashed var(--c-bronze);
}

.bar-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
}

.bar-row:last-child {
  margin-bottom: 0;
}

.bar-label {
  width: 52px;
  font-size: 12px;
  font-weight: 600;
  color: var(--c-stone);
  flex-shrink: 0;
}

.bar-track {
  flex: 1;
  height: 10px;
  background: rgba(44, 36, 27, 0.08);
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  height: 100%;
  border-radius: 5px;
  transition: width 0.6s ease;
}

.bar-fill.hp {
  background: linear-gradient(90deg, var(--c-cinnabar), #e06050);
}

.bar-fill.mp {
  background: linear-gradient(90deg, #4a7c9c, #6ba3c7);
}

.bar-fill.food {
  background: linear-gradient(90deg, var(--c-jade), #6ab77a);
}

.bar-value {
  width: 70px;
  text-align: right;
  font-size: 11px;
  color: var(--c-stone);
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
}

.bar-value.danger {
  color: var(--c-blood);
  font-weight: 700;
}

.status-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 8px;
}

.meta-tag {
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 2px;
  background: rgba(139, 105, 20, 0.08);
  color: var(--c-stone);
  border: 1px solid rgba(139, 105, 20, 0.15);
}

.meta-tag.poison {
  background: rgba(194, 58, 48, 0.1);
  color: var(--c-cinnabar);
  border-color: rgba(194, 58, 48, 0.25);
}

.meta-tag.money {
  background: rgba(184, 151, 61, 0.1);
  color: var(--c-bronze);
  border-color: rgba(184, 151, 61, 0.25);
}

.meta-tag.fame.evil {
  background: rgba(44, 36, 27, 0.08);
  color: var(--c-ink);
}
</style>
