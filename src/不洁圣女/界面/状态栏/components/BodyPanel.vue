<template>
  <div class="body-layout">
    <!-- 身体概况 -->
    <div class="section-head">
      <span class="head-icon">⚕</span> 身体圣痕记录
    </div>

    <div class="status-grid">
      <div class="status-card">
        <span class="status-label">贞洁状态</span>
        <span class="status-value" :class="virginityClass">{{ store.data.修女.身体.处女状态 }}</span>
      </div>
      <div class="status-card">
        <span class="status-label">改造等级</span>
        <span class="status-value" :class="modClass">
          {{ modificationLabel }}
        </span>
      </div>
    </div>

    <!-- 敏感度 -->
    <div class="section-subhead">感官敏感度</div>
    <div class="sensitivity-list">
      <div v-for="zone in sensitiveZones" :key="zone.key" class="sensitivity-item">
        <span class="zone-name">{{ zone.label }}</span>
        <div class="zone-track">
          <div class="zone-fill" :style="{ width: zone.value + '%' }"></div>
        </div>
        <span class="zone-value">{{ zone.value }}</span>
      </div>
    </div>

    <!-- 肉体改造详情 -->
    <div v-if="store.data.修女.身体.肉体改造等级 > 0" class="mod-detail">
      <span class="head-icon">⚠</span>
      <span>{{ modificationDetail }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const virginityClass = computed(() => ({
  'virgin': store.data.修女.身体.处女状态 === '处女',
  'non-virgin': store.data.修女.身体.处女状态 === '非处女',
  'modified': store.data.修女.身体.处女状态 === '被改造',
}));

const modClass = computed(() => {
  const lv = store.data.修女.身体.肉体改造等级;
  if (lv === 0) return 'mod-0';
  if (lv === 1) return 'mod-1';
  if (lv === 2) return 'mod-2';
  return 'mod-3';
});

const modificationLabel = computed(() => {
  const lv = store.data.修女.身体.肉体改造等级;
  const labels = ['无', 'Ⅰ 敏感强化', 'Ⅱ 身体魔化', 'Ⅲ 感官改造'];
  return labels[lv] || '未知';
});

const modificationDetail = computed(() => {
  const lv = store.data.修女.身体.肉体改造等级;
  const details = [
    '',
    '全身敏感度增强，触觉被大幅放大。格雷因的炼金药剂正在改变神经末梢。',
    '皮肤上开始浮现魔纹与触手吸盘痕，快感传导速度异于常人。圣水接触皮肤会带来灼痛。',
    '痛觉与快感已混淆。部分身体组织呈现魔物化特征。你已不再是纯粹的人类。',
  ];
  return details[lv] || '';
});

const sensitiveZones = computed(() => [
  { key: '后颈', label: '后颈', value: store.data.修女.身体.后颈敏感度 },
  { key: '耳垂', label: '耳垂', value: store.data.修女.身体.耳垂敏感度 },
  { key: '大腿内侧', label: '大腿内侧', value: store.data.修女.身体.大腿内侧敏感度 },
  { key: '乳首', label: '乳首', value: store.data.修女.身体.乳首敏感度 },
]);
</script>

<style lang="scss" scoped>
.body-layout {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-head {
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  border-bottom: 2px solid var(--c-amethyst);
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

.status-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.status-card {
  border: 1.5px solid var(--c-silver);
  padding: 8px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.status-label {
  font-size: 0.75rem;
  color: var(--c-ash);
  font-family: var(--font-display);
}

.status-value {
  font-weight: bold;
  font-size: 0.85rem;
  font-family: var(--font-mono);
}

.status-value.virgin { color: var(--bar-pure); }
.status-value.non-virgin { color: var(--c-crimson); }
.status-value.modified { color: #ff4444; }

.status-value.mod-0 { color: var(--c-ash); }
.status-value.mod-1 { color: var(--c-amethyst); }
.status-value.mod-2 { color: var(--c-crimson); }
.status-value.mod-3 { color: #ff2222; }

.sensitivity-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.sensitivity-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 4px 0;
  border-bottom: 1px dotted var(--c-silver);
}

.zone-name {
  font-size: 0.72rem;
  min-width: 55px;
  color: var(--c-obsidian);
  font-family: var(--font-display);
}

.zone-track {
  flex: 1;
  height: 6px;
  border: 1px solid var(--c-silver);
  background: #f0ecef;
  position: relative;
}

.zone-fill {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: linear-gradient(90deg, var(--c-rose), var(--c-crimson));
  transition: width 0.3s ease;
}

.zone-value {
  font-size: 0.7rem;
  font-weight: bold;
  font-family: var(--font-mono);
  min-width: 24px;
  text-align: right;
  color: var(--c-ash);
}

.mod-detail {
  background: rgba(139, 26, 26, 0.08);
  border: 1px solid var(--c-crimson);
  padding: 8px;
  font-size: 0.72rem;
  color: var(--c-crimson);
  line-height: 1.5;
  display: flex;
  gap: 6px;
  align-items: flex-start;
}

@media (max-width: 600px) {
  .status-grid {
    grid-template-columns: 1fr;
  }
}
</style>
