<template>
  <div class="relation-layout">
    <div class="section-head">
      <span class="head-icon">⚔</span> 羁绊之网
    </div>

    <div class="relation-grid">
      <div v-for="rel in relations" :key="rel.key" class="relation-card">
        <div class="relation-top">
          <div class="relation-avatar">{{ rel.avatar }}</div>
          <div class="relation-info">
            <span class="relation-name">{{ rel.name }}</span>
            <span class="relation-role">{{ rel.role }}</span>
          </div>
          <div class="relation-value" :class="rel.levelClass">{{ rel.value }}</div>
        </div>
        <div class="relation-track">
          <div
            class="relation-fill"
            :style="{ width: rel.value + '%', background: rel.barColor }"
          ></div>
        </div>
        <div class="relation-level">{{ rel.levelName }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

function getLevel(value: number) {
  if (value < 20) return { name: '疏远', cls: 'cold', color: 'var(--bar-pure)' };
  if (value < 40) return { name: '相识', cls: 'cool', color: 'var(--bar-curious)' };
  if (value < 60) return { name: '信赖', cls: 'warm', color: '#d4a853' };
  if (value < 80) return { name: '亲密', cls: 'hot', color: 'var(--c-crimson)' };
  return { name: '深陷', cls: 'deep', color: '#ff2222' };
}

const relations = computed(() => {
  const raw = [
    { key: '雷恩', name: '雷恩', role: '暗部搭档', avatar: '⚔', value: store.data.修女.关系.雷恩好感度 },
    { key: '洛克', name: '洛克', role: '孤儿院少年', avatar: '☀', value: store.data.修女.关系.洛克好感度 },
    { key: '马库斯', name: '马库斯', role: '贵族领主', avatar: '♚', value: store.data.修女.关系.马库斯好感度 },
    { key: '莉莉丝', name: '莉莉丝', role: '高阶魅魔', avatar: '☽', value: store.data.修女.关系.莉莉丝好感度 },
    { key: '格雷因', name: '格雷因', role: '炼金术师', avatar: '⚗', value: store.data.修女.关系.格雷因好感度 },
    { key: '洛伦佐', name: '洛伦佐', role: '神父·联络人', avatar: '✠', value: store.data.修女.关系.洛伦佐信任 },
  ];

  return raw.map(r => {
    const lv = getLevel(r.value);
    return {
      ...r,
      levelName: lv.name,
      levelClass: lv.cls,
      barColor: lv.color,
    };
  });
});
</script>

<style lang="scss" scoped>
.relation-layout {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-head {
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  border-bottom: 2px solid var(--c-gold);
  padding-bottom: 4px;
  display: inline-block;
  margin-bottom: 4px;
}

.head-icon {
  font-size: 0.75rem;
}

.relation-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.relation-card {
  border: 1.5px solid var(--c-silver);
  padding: 8px;
  background: #fff;
  box-shadow: 2px 2px 0 rgba(45, 27, 78, 0.06);
  transition: transform 0.2s;
}

.relation-card:hover {
  transform: translateY(-1px);
  box-shadow: 3px 3px 0 rgba(45, 27, 78, 0.1);
}

.relation-top {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
}

.relation-avatar {
  font-size: 1.1rem;
  width: 24px;
  text-align: center;
}

.relation-info {
  flex: 1;
  min-width: 0;
}

.relation-name {
  font-weight: bold;
  font-size: 0.82rem;
  font-family: var(--font-display);
  display: block;
}

.relation-role {
  font-size: 0.6rem;
  color: var(--c-ash);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.relation-value {
  font-weight: bold;
  font-size: 0.9rem;
  font-family: var(--font-mono);
}

.relation-value.cold { color: var(--bar-pure); }
.relation-value.cool { color: var(--bar-curious); }
.relation-value.warm { color: var(--c-gold); }
.relation-value.hot { color: var(--c-crimson); }
.relation-value.deep { color: #ff2222; }

.relation-track {
  height: 5px;
  border: 1px solid var(--c-silver);
  background: #f0ecef;
  margin-bottom: 2px;
  position: relative;
}

.relation-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  transition: width 0.3s ease;
}

.relation-level {
  font-size: 0.6rem;
  text-align: right;
  color: var(--c-ash);
  font-family: var(--font-display);
  letter-spacing: 0.05em;
}

@media (max-width: 600px) {
  .relation-grid {
    grid-template-columns: 1fr;
  }
}
</style>
