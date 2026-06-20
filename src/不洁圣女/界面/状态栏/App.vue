<template>
  <div class="card">
    <!-- 顶部圣堂纹章 -->
    <header class="card-header">
      <div class="header-crest">
        <span class="crest-icon">✠</span>
        <div class="crest-text">
          <h1 class="card-title">圣裁档案</h1>
          <span class="card-subtitle">Sanctum Inquisition Archive</span>
        </div>
        <span class="crest-icon">✠</span>
      </div>
      <div class="header-meta">
        <span class="meta-badge" :class="store.data.修女.状态.昼夜">
          {{ store.data.修女.状态.昼夜 === 'day' ? '☀ 白昼' : '☽ 黑夜' }}
        </span>
        <span class="meta-stage" :class="stageClass">{{ stageName }}</span>
        <span v-if="store.data.修女.状态.身份暴露" class="meta-badge exposed">
          ⚠ 身份暴露
        </span>
      </div>
    </header>

    <!-- 堕落值总览条 -->
    <CorruptionPanel />

    <!-- 标签导航 -->
    <TabNav v-model="active_tab" :tabs="tabs" />

    <!-- 内容区 -->
    <div v-if="active_tab" class="content-area">
      <div class="tab-pane" :class="{ active: active_tab === 'body' }">
        <BodyPanel />
      </div>
      <div class="tab-pane" :class="{ active: active_tab === 'relation' }">
        <RelationPanel />
      </div>
      <div class="tab-pane" :class="{ active: active_tab === 'cg' }">
        <CGPanel />
      </div>
      <div class="tab-pane" :class="{ active: active_tab === 'experience' }">
        <ExperiencePanel />
      </div>
    </div>

    <!-- 底部引述 -->
    <footer class="card-footer">
      <span>{{ footerQuote }}</span>
    </footer>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useDataStore } from './store';
import CorruptionPanel from './components/CorruptionPanel.vue';
import BodyPanel from './components/BodyPanel.vue';
import RelationPanel from './components/RelationPanel.vue';
import CGPanel from './components/CGPanel.vue';
import ExperiencePanel from './components/ExperiencePanel.vue';
import TabNav from './components/TabNav.vue';

const store = useDataStore();

const tabs = [
  { id: 'body', label: '身体' },
  { id: 'relation', label: '关系' },
  { id: 'cg', label: 'CG' },
  { id: 'experience', label: '经验' },
];

const active_tab = useLocalStorage<string | null>('unholy_saintess:active_tab', null);

const stageName = computed(() => {
  const b = store.data.修女.堕落.身体堕落度;
  const m = store.data.修女.堕落.精神堕落度;
  const f = store.data.修女.堕落.信仰堕落度;
  const max = Math.max(b, m, f);
  if (max < 20) return '纯洁期';
  if (max < 40) return '好奇期';
  if (max < 60) return '动摇期';
  if (max < 85) return '堕落期';
  return '沉沦期';
});

const stageClass = computed(() => {
  const map: Record<string, string> = {
    '纯洁期': 'pure',
    '好奇期': 'curious',
    '动摇期': 'waver',
    '堕落期': 'fallen',
    '沉沦期': 'sunk',
  };
  return map[stageName.value] || '';
});

const quotes: Record<string, string> = {
  '纯洁期': '"圣光啊……请净化我内心的火焰。"',
  '好奇期': '"只是多看一眼而已，这不算是罪吧？"',
  '动摇期': '"我到底是在抗拒，还是在期待？"',
  '堕落期': '"圣光已经很久没有回应我的祷告了。"',
  '沉沦期': '"我曾穿过的修女袍，不过是另一层皮肤。"',
};

const footerQuote = computed(() => quotes[stageName.value] || '"……"');
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  max-width: 720px;
  background: linear-gradient(180deg, #faf5ff 0%, #f5f0e8 100%);
  border: 3px solid var(--c-obsidian);
  box-shadow: 6px 6px 0px rgba(45, 27, 78, 0.2);
  display: flex;
  flex-direction: column;
  font-family: var(--font-body);
  color: var(--c-obsidian);
  font-size: 13px;
  line-height: 1.4;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

.card::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: linear-gradient(180deg, var(--c-amethyst), var(--c-crimson), var(--c-gold));
}

.card-header {
  background: var(--c-obsidian);
  color: var(--c-parchment);
  padding: 12px 16px;
  border-bottom: 2px solid var(--c-gold);
}

.header-crest {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 8px;
}

.crest-icon {
  font-size: 1.4rem;
  color: var(--c-gold);
}

.crest-text {
  text-align: center;
}

.card-title {
  font-family: var(--font-display);
  font-size: 1.2rem;
  letter-spacing: 0.15em;
  margin: 0;
  font-weight: normal;
}

.card-subtitle {
  font-size: 0.6rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--c-ash);
  font-family: var(--font-mono);
}

.header-meta {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.meta-badge {
  font-size: 0.72rem;
  padding: 2px 8px;
  border: 1px solid var(--c-gold);
  color: var(--c-gold);
  font-family: var(--font-mono);
}

.meta-badge.day {
  border-color: var(--c-celadon);
  color: var(--c-celadon);
}

.meta-badge.night {
  border-color: var(--c-amethyst);
  color: var(--c-silver);
}

.meta-badge.exposed {
  border-color: var(--c-crimson);
  color: #ff6b6b;
  animation: pulse-warn 2s infinite;
}

.meta-stage {
  font-size: 0.85rem;
  padding: 2px 10px;
  font-family: var(--font-display);
  letter-spacing: 0.1em;
  font-weight: bold;
}

.meta-stage.pure { color: #7b8cb0; }
.meta-stage.curious { color: #a08bc0; }
.meta-stage.waver { color: #c080a0; }
.meta-stage.fallen { color: #c05060; }
.meta-stage.sunk { color: #ff4444; text-shadow: 0 0 8px rgba(139, 26, 26, 0.6); }

.content-area {
  padding: 12px;
  min-height: 0;
  flex: 1;
}

.tab-pane {
  display: none;
  animation: fadeIn 0.35s ease;
}

.tab-pane.active {
  display: block;
}

.card-footer {
  border-top: 1px solid var(--c-silver);
  padding: 8px 16px;
  text-align: center;
  font-style: italic;
  font-size: 0.78rem;
  color: var(--c-ash);
  font-family: var(--font-display);
  background: rgba(45, 27, 78, 0.03);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes pulse-warn {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

@media (max-width: 600px) {
  .card-title { font-size: 1rem; }
  .header-crest { gap: 6px; }
}
</style>
