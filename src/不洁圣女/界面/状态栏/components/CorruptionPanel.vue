<template>
  <div class="corruption-section">
    <div class="section-head">
      <span class="head-icon">†</span> 堕落圣痕
      <span class="head-icon">†</span>
    </div>

    <div class="corruption-grid">
      <div v-for="item in corruptionItems" :key="item.key" class="corruption-item">
        <div class="corruption-header">
          <span class="corruption-label">{{ item.label }}</span>
          <span class="corruption-value">{{ item.value }}</span>
          <span class="corruption-tier" :class="item.tierClass">{{ item.tierName }}</span>
        </div>
        <div class="corruption-track">
          <div
            class="corruption-fill"
            :style="{ width: item.value + '%', background: item.barColor }"
          ></div>
          <div class="corruption-ticks">
            <span class="tick" v-for="tick in ticks" :key="tick.pos" :style="{ left: tick.pos + '%' }"></span>
          </div>
        </div>
        <div class="corruption-desc">{{ item.desc }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const ticks = [
  { pos: 20 },
  { pos: 40 },
  { pos: 60 },
  { pos: 85 },
];

const tierMap: Record<number, { name: string; cls: string; color: string; desc: string }> = {
  0: { name: '圣洁', cls: 'pure', color: 'var(--bar-pure)', desc: '身心尚未开启，纯洁如初雪' },
  1: { name: '好奇', cls: 'curious', color: 'var(--bar-curious)', desc: '欲望的种子悄然萌发' },
  2: { name: '动摇', cls: 'waver', color: 'var(--bar-waver)', desc: '理智与欲望的拉锯战' },
  3: { name: '堕落', cls: 'fallen', color: 'var(--bar-fallen)', desc: '禁忌的甘美已无法抗拒' },
  4: { name: '沉沦', cls: 'sunk', color: 'var(--bar-sunk)', desc: '圣光已远，唯有欲望永恒' },
};

function getTier(value: number) {
  if (value < 20) return 0;
  if (value < 40) return 1;
  if (value < 60) return 2;
  if (value < 85) return 3;
  return 4;
}

const corruptionItems = computed(() => {
  const items = [
    { key: 'body', label: '身体堕落', value: store.data.修女.堕落.身体堕落度 },
    { key: 'mind', label: '精神堕落', value: store.data.修女.堕落.精神堕落度 },
    { key: 'faith', label: '信仰堕落', value: store.data.修女.堕落.信仰堕落度 },
  ];

  return items.map(item => {
    const tier = getTier(item.value);
    const t = tierMap[tier];
    return {
      ...item,
      tierName: t.name,
      tierClass: t.cls,
      barColor: t.color,
      desc: t.desc,
    };
  });
});
</script>

<style lang="scss" scoped>
.corruption-section {
  padding: 10px;
  border-bottom: 2px dashed var(--c-silver);
  background: rgba(45, 27, 78, 0.02);
}

.section-head {
  text-align: center;
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  margin-bottom: 10px;
  color: var(--c-obsidian);
}

.head-icon {
  color: var(--c-amethyst);
  font-size: 0.7rem;
}

.corruption-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.corruption-item {
  background: #fff;
  border: 1.5px solid var(--c-silver);
  padding: 8px 10px;
  box-shadow: 2px 2px 0 rgba(45, 27, 78, 0.08);
}

.corruption-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.corruption-label {
  font-weight: bold;
  font-size: 0.78rem;
  font-family: var(--font-display);
  letter-spacing: 0.05em;
  min-width: 60px;
}

.corruption-value {
  font-size: 0.85rem;
  font-weight: bold;
  font-family: var(--font-mono);
  min-width: 32px;
}

.corruption-tier {
  font-size: 0.65rem;
  padding: 1px 6px;
  border-radius: 2px;
  font-family: var(--font-display);
  letter-spacing: 0.1em;
}

.corruption-tier.pure { background: #e8ecf0; color: var(--bar-pure); }
.corruption-tier.curious { background: #e8e0f0; color: var(--bar-curious); }
.corruption-tier.waver { background: #f0e0e4; color: var(--bar-waver); }
.corruption-tier.fallen { background: #f0e0e0; color: var(--bar-fallen); }
.corruption-tier.sunk { background: #f0d0d0; color: var(--bar-sunk); font-weight: bold; }

.corruption-track {
  position: relative;
  height: 8px;
  border: 1px solid var(--c-silver);
  background: #f0ecef;
  margin-bottom: 3px;
}

.corruption-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  transition: width 0.4s ease;
}

.corruption-ticks {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
}

.tick {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 1px;
  background: rgba(45, 27, 78, 0.3);
}

.corruption-desc {
  font-size: 0.68rem;
  color: var(--c-ash);
  font-style: italic;
  text-align: right;
}

@media (max-width: 600px) {
  .corruption-header {
    flex-wrap: wrap;
  }
}
</style>
