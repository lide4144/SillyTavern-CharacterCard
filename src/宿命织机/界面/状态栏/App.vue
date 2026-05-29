<template>
  <div class="fate-loom">
    <!-- 世界信息头 -->
    <div class="world-header">
      <div class="world-meta">
        <span class="meta-item">📅 {{ store.data.世界.当前时间 }}</span>
        <span class="meta-item">📍 {{ store.data.世界.当前地点 }}</span>
        <span class="meta-item">🎭 {{ store.data.世界.当前阶段 }}</span>
      </div>
      <div class="world-mood">{{ store.data.世界.氛围 }}</div>
      <div class="world-affairs">
        <span v-for="(desc, name) in store.data.世界.近期事务" :key="name" class="affair-tag">
          {{ name }}
        </span>
        <span v-if="_.isEmpty(store.data.世界.近期事务)" class="affair-tag empty">暂无事务</span>
      </div>
    </div>

    <!-- 李德状态 -->
    <div class="character-panel">
      <div class="panel-title">⚔️ 李德</div>
      <div class="bars-grid">
        <div class="stat-bar">
          <span class="bar-label">生命力</span>
          <div class="bar-track">
            <div class="bar-fill hp" :style="{ width: store.data.李德.生命力 + '%' }" :class="{ danger: store.data.李德.生命力 < 30 }"></div>
          </div>
          <span class="bar-value" :class="{ danger: store.data.李德.生命力 < 30 }">{{ store.data.李德.生命力 }}</span>
        </div>
        <div class="stat-bar">
          <span class="bar-label">体力</span>
          <div class="bar-track">
            <div class="bar-fill stamina" :style="{ width: store.data.李德.体力 + '%' }"></div>
          </div>
          <span class="bar-value">{{ store.data.李德.体力 }}</span>
        </div>
        <div class="stat-bar">
          <span class="bar-label">精神稳定</span>
          <div class="bar-track">
            <div class="bar-fill sanity" :style="{ width: store.data.李德.精神稳定度 + '%' }"></div>
          </div>
          <span class="bar-value">{{ store.data.李德.精神稳定度 }}</span>
        </div>
      </div>
      <div class="armor-row">
        <span class="armor-label">噬生之铠</span>
        <span class="armor-state" :class="store.data.李德.噬生之铠.状态">{{ store.data.李德.噬生之铠.状态 }}</span>
        <span class="armor-erosion">侵蚀 {{ store.data.李德.噬生之铠.侵蚀度 }}%</span>
        <div class="erosion-track">
          <div class="erosion-fill" :style="{ width: store.data.李德.噬生之铠.侵蚀度 + '%' }" :class="{ danger: store.data.李德.噬生之铠.侵蚀度 > 50 }"></div>
        </div>
      </div>
    </div>

    <!-- 标签页 -->
    <div class="tabs-nav">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-btn', { active: active_tab === tab.id }]"
        @click="active_tab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="tab-content">
      <!-- 艾莉丝 -->
      <div v-if="active_tab === '艾莉丝'" class="tab-pane">
        <div class="sub-title">🌸 艾莉丝 · {{ store.data.艾莉丝.$阶段 }}</div>
        <div class="relation-bars">
          <div class="stat-bar compact">
            <span class="bar-label">依恋度</span>
            <div class="bar-track">
              <div class="bar-fill affection" :style="{ width: store.data.艾莉丝.依恋度 + '%' }"></div>
            </div>
            <span class="bar-value">{{ store.data.艾莉丝.依恋度 }}</span>
          </div>
          <div class="stat-bar compact">
            <span class="bar-label">独占欲</span>
            <div class="bar-track">
              <div class="bar-fill possessive" :style="{ width: store.data.艾莉丝.独占欲 + '%' }" :class="{ danger: store.data.艾莉丝.独占欲 > 70 }"></div>
            </div>
            <span class="bar-value" :class="{ danger: store.data.艾莉丝.独占欲 > 70 }">{{ store.data.艾莉丝.独占欲 }}</span>
          </div>
        </div>
        <div class="status-text">形态: {{ store.data.艾莉丝.形态 }}</div>
        <div class="status-text">状态: {{ store.data.艾莉丝.状态 }}</div>
      </div>

      <!-- 瑟希莉娅 -->
      <div v-if="active_tab === '瑟希莉娅'" class="tab-pane">
        <div class="sub-title">🌿 瑟希莉娅 · {{ store.data.瑟希莉娅.$黑雾浓度 }}</div>
        <div class="relation-bars">
          <div class="stat-bar compact">
            <span class="bar-label">距离感</span>
            <div class="bar-track">
              <div class="bar-fill distance" :style="{ width: store.data.瑟希莉娅.距离感 + '%' }"></div>
            </div>
            <span class="bar-value">{{ store.data.瑟希莉娅.距离感 }}</span>
          </div>
          <div class="stat-bar compact">
            <span class="bar-label">情感压抑</span>
            <div class="bar-track">
              <div class="bar-fill suppress" :style="{ width: store.data.瑟希莉娅.情感压抑 + '%' }"></div>
            </div>
            <span class="bar-value">{{ store.data.瑟希莉娅.情感压抑 }}</span>
          </div>
          <div class="stat-bar compact">
            <span class="bar-label">混沌侵蚀</span>
            <div class="bar-track">
              <div class="bar-fill chaos" :style="{ width: store.data.瑟希莉娅.混沌侵蚀 + '%' }" :class="{ danger: store.data.瑟希莉娅.混沌侵蚀 > 60 }"></div>
            </div>
            <span class="bar-value" :class="{ danger: store.data.瑟希莉娅.混沌侵蚀 > 60 }">{{ store.data.瑟希莉娅.混沌侵蚀 }}</span>
          </div>
        </div>
        <div class="status-text">状态: {{ store.data.瑟希莉娅.状态 }}</div>
      </div>

      <!-- 外部威胁 -->
      <div v-if="active_tab === '威胁'" class="tab-pane">
        <div class="sub-title">⚠️ 外部威胁</div>
        <div class="relation-bars">
          <div class="stat-bar compact">
            <span class="bar-label">李烈追击</span>
            <div class="bar-track">
              <div class="bar-fill threat-red" :style="{ width: store.data.外部威胁.李烈追击 + '%' }" :class="{ danger: store.data.外部威胁.李烈追击 > 50 }"></div>
            </div>
            <span class="bar-value" :class="{ danger: store.data.外部威胁.李烈追击 > 50 }">{{ store.data.外部威胁.李烈追击 }}</span>
          </div>
          <div class="stat-bar compact">
            <span class="bar-label">帝国关注</span>
            <div class="bar-track">
              <div class="bar-fill threat-gold" :style="{ width: store.data.外部威胁.帝国关注 + '%' }"></div>
            </div>
            <span class="bar-value">{{ store.data.外部威胁.帝国关注 }}</span>
          </div>
          <div class="stat-bar compact">
            <span class="bar-label">李钰调查</span>
            <div class="bar-track">
              <div class="bar-fill threat-purple" :style="{ width: store.data.外部威胁.李钰调查 + '%' }"></div>
            </div>
            <span class="bar-value">{{ store.data.外部威胁.李钰调查 }}</span>
          </div>
        </div>
      </div>

      <!-- 物品栏 -->
      <div v-if="active_tab === '物品'" class="tab-pane">
        <div class="sub-title">🎒 物品栏</div>
        <div v-if="!_.isEmpty(store.data.李德.物品栏)" class="inventory-list">
          <div v-for="(item, name) in store.data.李德.物品栏" :key="name" class="item-card">
            <span class="item-name">{{ name }}</span>
            <span class="item-desc">{{ item.描述 }}</span>
            <span class="item-count">x{{ item.数量 }}</span>
          </div>
        </div>
        <div v-else class="empty-text">背包空空如也...</div>
      </div>

      <!-- 剧情 -->
      <div v-if="active_tab === '剧情'" class="tab-pane">
        <div class="sub-title">📜 剧情</div>
        <div class="story-current">当前: {{ store.data.剧情.当前幕 }}</div>
        <div class="story-section">
          <div class="section-label">已发生事件</div>
          <div v-for="(desc, name) in store.data.剧情.已发生事件" :key="name" class="story-item">
            <span class="story-name">{{ name }}</span>
            <span class="story-desc">{{ desc }}</span>
          </div>
          <div v-if="_.isEmpty(store.data.剧情.已发生事件)" class="empty-text">尚无记录</div>
        </div>
        <div class="story-section">
          <div class="section-label">关键抉择</div>
          <div v-for="(result, name) in store.data.剧情.关键抉择" :key="name" class="story-item">
            <span class="story-name">{{ name }}</span>
            <span class="story-desc">{{ result }}</span>
          </div>
          <div v-if="_.isEmpty(store.data.剧情.关键抉择)" class="empty-text">尚无记录</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useDataStore } from './store';

const store = useDataStore();

const tabs = [
  { id: '艾莉丝', label: '🌸 艾莉丝' },
  { id: '瑟希莉娅', label: '🌿 瑟希莉娅' },
  { id: '威胁', label: '⚠️ 威胁' },
  { id: '物品', label: '🎒 物品' },
  { id: '剧情', label: '📜 剧情' },
];

const active_tab = useLocalStorage<string>('fate_loom:active_tab', '艾莉丝');
</script>

<style lang="scss" scoped>
.fate-loom {
  width: 100%;
  max-width: 720px;
  background: var(--bg-primary);
  border: 2px solid var(--border-color);
  color: var(--text-primary);
  font-size: 13px;
  line-height: 1.4;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.world-header {
  padding: 10px 12px;
  border-bottom: 2px solid var(--border-color);
  background: var(--bg-secondary);
}

.world-meta {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}

.meta-item {
  color: var(--accent-gold);
  font-weight: bold;
  font-size: 12px;
}

.world-mood {
  color: var(--text-secondary);
  font-size: 11px;
  font-style: italic;
  margin-bottom: 8px;
  line-height: 1.5;
}

.world-affairs {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.affair-tag {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  padding: 3px 8px;
  font-size: 11px;
  color: var(--text-secondary);
}

.affair-tag.empty {
  opacity: 0.5;
}

.character-panel {
  padding: 12px;
  border-bottom: 2px solid var(--border-color);
}

.panel-title {
  font-size: 14px;
  font-weight: bold;
  color: var(--accent-gold);
  margin-bottom: 10px;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 4px;
}

.bars-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 10px;
}

.stat-bar {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-bar.compact {
  gap: 6px;
}

.bar-label {
  width: 70px;
  font-size: 11px;
  color: var(--text-secondary);
  text-align: right;
  flex-shrink: 0;
}

.bar-track {
  flex: 1;
  height: 14px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  position: relative;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.bar-fill.hp {
  background: linear-gradient(90deg, #5a1a1a, var(--accent-red));
}

.bar-fill.stamina {
  background: linear-gradient(90deg, #3a4a1a, var(--accent-green));
}

.bar-fill.sanity {
  background: linear-gradient(90deg, #1a3a2a, #4a8a5a);
}

.bar-fill.affection {
  background: linear-gradient(90deg, #4a2a4a, var(--accent-purple));
}

.bar-fill.possessive {
  background: linear-gradient(90deg, #4a1a2a, #8a2a4a);
}

.bar-fill.distance {
  background: linear-gradient(90deg, #2a3a4a, #5a7a9a);
}

.bar-fill.suppress {
  background: linear-gradient(90deg, #2a3a2a, #5a7a5a);
}

.bar-fill.chaos {
  background: linear-gradient(90deg, #1a1a2a, #4a4a6a);
}

.bar-fill.threat-red {
  background: linear-gradient(90deg, #3a1a1a, #8a1a1a);
}

.bar-fill.threat-gold {
  background: linear-gradient(90deg, #3a2a1a, var(--accent-gold));
}

.bar-fill.threat-purple {
  background: linear-gradient(90deg, #2a1a3a, #6a3a8a);
}

.bar-fill.danger {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.bar-value {
  width: 32px;
  font-size: 11px;
  text-align: right;
  color: var(--text-primary);
  flex-shrink: 0;
}

.bar-value.danger {
  color: #ff4444;
  font-weight: bold;
}

.armor-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px dashed var(--border-color);
}

.armor-label {
  font-size: 11px;
  color: var(--text-secondary);
  width: 70px;
  text-align: right;
}

.armor-state {
  font-size: 11px;
  padding: 2px 8px;
  border: 1px solid var(--border-color);
  background: var(--bg-secondary);
}

.armor-state.收束 {
  color: var(--accent-silver);
}

.armor-state.半展 {
  color: var(--accent-gold);
}

.armor-state.全开 {
  color: var(--accent-red);
}

.armor-erosion {
  font-size: 11px;
  color: var(--text-secondary);
}

.erosion-track {
  flex: 1;
  height: 8px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  overflow: hidden;
}

.erosion-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-silver), var(--accent-red));
  transition: width 0.3s ease;
}

.erosion-fill.danger {
  background: linear-gradient(90deg, #8a0000, #ff0000);
  animation: pulse 1.5s infinite;
}

.tabs-nav {
  display: flex;
  border-bottom: 2px solid var(--border-color);
  background: var(--bg-secondary);
}

.tab-btn {
  flex: 1;
  padding: 8px 4px;
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}

.tab-btn:hover {
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.05);
}

.tab-btn.active {
  color: var(--accent-gold);
  border-bottom-color: var(--accent-gold);
  background: var(--bg-primary);
}

.tab-content {
  padding: 12px;
  min-height: 120px;
}

.tab-pane {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.sub-title {
  font-size: 13px;
  font-weight: bold;
  color: var(--accent-gold);
  margin-bottom: 10px;
  padding-bottom: 4px;
  border-bottom: 1px solid var(--border-color);
}

.relation-bars {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 10px;
}

.status-text {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 4px;
  padding-left: 4px;
  border-left: 2px solid var(--border-color);
}

.inventory-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.item-card {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  font-size: 12px;
}

.item-name {
  color: var(--accent-gold);
  font-weight: bold;
  min-width: 80px;
}

.item-desc {
  flex: 1;
  color: var(--text-secondary);
  font-size: 11px;
}

.item-count {
  color: var(--text-primary);
  background: var(--bg-card);
  padding: 1px 6px;
  font-size: 11px;
}

.story-current {
  font-size: 12px;
  color: var(--accent-gold);
  margin-bottom: 10px;
  padding: 4px 8px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
}

.story-section {
  margin-bottom: 10px;
}

.section-label {
  font-size: 11px;
  color: var(--text-secondary);
  margin-bottom: 6px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.story-item {
  padding: 5px 8px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  margin-bottom: 4px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.story-name {
  font-size: 12px;
  color: var(--text-primary);
  font-weight: bold;
}

.story-desc {
  font-size: 11px;
  color: var(--text-secondary);
}

.empty-text {
  text-align: center;
  color: var(--text-secondary);
  padding: 12px;
  font-style: italic;
  font-size: 12px;
  opacity: 0.6;
}

@media (max-width: 600px) {
  .world-meta {
    flex-direction: column;
    gap: 4px;
  }
  .tabs-nav {
    flex-wrap: wrap;
  }
  .tab-btn {
    flex: 1 1 30%;
    padding: 6px 2px;
    font-size: 11px;
  }
}
</style>
