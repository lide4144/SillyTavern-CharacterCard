<template>
  <div class="world-panel">
    <section class="w-section">
      <h3><i class="fas fa-map"></i> 区域</h3>
      <div class="area-info">{{ data.地图.当前区域详情 }}</div>
      <div class="explored">
        <span class="exp-label">已探索:</span>
        <span class="exp-tags">
          <span class="exp-tag" v-for="area in data.地图.已探索区域" :key="area">{{ area }}</span>
        </span>
      </div>
    </section>

    <section class="w-section">
      <h3><i class="fas fa-user-friends"></i> 江湖人物</h3>
      <div class="npc-list">
        <div class="npc-item" v-for="(npc, name) in data.NPC" :key="name">
          <div class="npc-header">
            <span class="npc-name">{{ name }}</span>
            <span class="npc-loc"><i class="fas fa-map-pin"></i> {{ npc.位置 }}</span>
          </div>
          <div class="npc-iden">{{ npc.身份 }}</div>
          <div class="npc-meta">
            <span class="npc-relation" :class="relationClass(npc.好感度)">{{ npc.关系 }}</span>
            <span class="npc-aff">好感 {{ npc.好感度 }}</span>
          </div>
        </div>
        <div class="empty" v-if="Object.keys(data.NPC).length === 0">
          江湖路远，尚未结识同道。
        </div>
      </div>
    </section>

    <section class="w-section">
      <h3><i class="fas fa-exclamation-circle"></i> 近期事务</h3>
      <div class="affairs">
        <div class="affair" v-for="(desc, name) in data.世界.近期事务" :key="name">
          <span class="aff-dot"></span>
          <div>
            <div class="aff-name">{{ name }}</div>
            <div class="aff-desc">{{ desc }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const data = useDataStore().data;

function relationClass(val: number) {
  if (val >= 70) return 'loved';
  if (val >= 30) return 'friendly';
  if (val >= -30) return 'neutral';
  if (val >= -70) return 'hostile';
  return 'hated';
}
</script>

<style lang="scss" scoped>
.world-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.w-section h3 {
  font-size: 13px;
  font-weight: 600;
  color: var(--c-bronze);
  margin: 0 0 8px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.area-info {
  font-size: 11px;
  color: var(--c-stone);
  line-height: 1.5;
  padding: 8px;
  background: rgba(139, 105, 20, 0.04);
  border-radius: 3px;
  margin-bottom: 8px;
}

.explored {
  display: flex;
  gap: 6px;
  align-items: flex-start;
}

.exp-label {
  font-size: 11px;
  color: var(--c-stone);
  flex-shrink: 0;
  margin-top: 2px;
}

.exp-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.exp-tag {
  font-size: 10px;
  padding: 2px 6px;
  background: rgba(139, 105, 20, 0.08);
  color: var(--c-stone);
  border-radius: 2px;
  border: 1px solid rgba(139, 105, 20, 0.12);
}

.npc-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.npc-item {
  padding: 8px 10px;
  background: rgba(139, 105, 20, 0.03);
  border: 1px solid rgba(139, 105, 20, 0.1);
  border-radius: 3px;
}

.npc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2px;
}

.npc-name {
  font-weight: 600;
  font-size: 12px;
}

.npc-loc {
  font-size: 10px;
  color: var(--c-stone);
}

.npc-iden {
  font-size: 11px;
  color: var(--c-stone);
  margin-bottom: 4px;
}

.npc-meta {
  display: flex;
  gap: 6px;
}

.npc-relation {
  font-size: 10px;
  padding: 1px 5px;
  border-radius: 2px;
  background: rgba(44, 36, 27, 0.06);
}

.npc-relation.loved {
  background: rgba(194, 58, 48, 0.1);
  color: var(--c-cinnabar);
}

.npc-relation.friendly {
  background: rgba(74, 124, 89, 0.1);
  color: var(--c-jade);
}

.npc-relation.hostile {
  background: rgba(139, 105, 20, 0.1);
  color: var(--c-bronze);
}

.npc-relation.hated {
  background: rgba(44, 36, 27, 0.1);
  color: var(--c-ink);
}

.npc-aff {
  font-size: 10px;
  color: var(--c-stone);
}

.affairs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.affair {
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.aff-dot {
  width: 6px;
  height: 6px;
  background: var(--c-cinnabar);
  border-radius: 50%;
  margin-top: 5px;
  flex-shrink: 0;
}

.aff-name {
  font-weight: 600;
  font-size: 12px;
}

.aff-desc {
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
