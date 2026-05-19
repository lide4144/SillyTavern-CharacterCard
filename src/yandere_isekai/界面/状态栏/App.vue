<template>
  <div class="wuxia-card">
    <!-- 世界信息 -->
    <div class="world-section">
      <div class="world-header">
        <span class="world-title">江湖志</span>
        <span class="world-tag">{{ store.data.世界.当前地点 }}</span>
      </div>
      <div class="world-meta">
        <span><b>时</b> {{ store.data.世界.当前时间 }}</span>
        <span><b>天</b> {{ store.data.世界.天气 }}</span>
      </div>
      <div class="world-situation">{{ store.data.世界.江湖局势 }}</div>
      <div class="event-list">
        <div v-for="(desc, name) in store.data.世界.近期事务" :key="name" class="event-badge">
          <span class="event-name">{{ name }}</span>
          <span class="event-desc">{{ desc }}</span>
        </div>
        <div v-if="_.isEmpty(store.data.世界.近期事务)" class="event-badge empty">
          <span class="event-name">暂无事务</span>
          <span class="event-desc">江湖太平，或可四处走走</span>
        </div>
      </div>
    </div>

    <!-- 血玲珑状态 -->
    <div class="blood-section">
      <div class="blood-header">
        <span class="blood-title">血玲珑</span>
        <span class="blood-phase">{{ store.data.血玲珑.$阶段 }}</span>
        <span class="blood-danger" :class="dangerClass">{{ store.data.血玲珑.$危险等级 }}</span>
      </div>

      <div class="bars-row">
        <div class="bar-group">
          <span class="bar-label">执念度</span>
          <div class="bar-track">
            <div class="bar-fill obsession" :style="{ width: store.data.血玲珑.执念度 + '%' }"></div>
          </div>
          <span class="bar-value">{{ store.data.血玲珑.执念度 }}</span>
        </div>
        <div class="bar-group">
          <span class="bar-label">黑化值</span>
          <div class="bar-track">
            <div class="bar-fill darkness" :style="{ width: store.data.血玲珑.黑化值 + '%' }"></div>
          </div>
          <span class="bar-value">{{ store.data.血玲珑.黑化值 }}</span>
        </div>
        <div class="bar-group">
          <span class="bar-label">伪装值</span>
          <div class="bar-track">
            <div class="bar-fill disguise" :style="{ width: store.data.血玲珑.伪装值 + '%' }"></div>
          </div>
          <span class="bar-value">{{ store.data.血玲珑.伪装值 }}</span>
        </div>
      </div>

      <div class="blood-meta">
        <span><b>位置</b> {{ store.data.血玲珑.当前位置 }}</span>
        <span><b>状态</b> {{ store.data.血玲珑.当前状态 }}</span>
      </div>

      <div class="attire-list">
        <div v-for="(desc, slot) in store.data.血玲珑.着装" :key="slot" class="attire-item">
          <span class="attire-slot">{{ slot }}</span>
          <span class="attire-desc">{{ desc }}</span>
        </div>
      </div>

      <div class="title-list">
        <div v-for="(title, name) in store.data.血玲珑.称号" :key="name" class="title-box">
          <span class="title-name">{{ name }}</span>
          <div class="title-effect">{{ title.效果 }}</div>
          <div class="title-quote">"{{ title.自我评价 }}"</div>
        </div>
      </div>
    </div>

    <!-- 标签页 -->
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="tab-content">
      <!-- 主角面板 -->
      <div v-if="activeTab === 'hero'" class="tab-pane">
        <div class="hero-status">
          <span><b>状态</b> {{ store.data.主角.当前状态 }}</span>
          <span><b>位置</b> {{ store.data.主角.当前位置 }}</span>
        </div>
        <div class="section-title">武功面板</div>
        <div class="skill-grid">
          <div v-for="(val, key) in store.data.主角.武功面板" :key="key" class="skill-item">
            <span class="skill-name">{{ key }}</span>
            <div class="skill-bar">
              <div class="skill-fill" :style="{ width: val + '%' }"></div>
            </div>
            <span class="skill-value">{{ val }}</span>
          </div>
        </div>
        <div class="section-title">声望</div>
        <div class="reputation-list">
          <div v-for="(val, faction) in store.data.主角.声望" :key="faction" class="rep-item">
            <span class="rep-name">{{ faction }}</span>
            <span class="rep-value" :class="val >= 0 ? 'positive' : 'negative'">{{ val > 0 ? '+' : '' }}{{ val }}</span>
          </div>
        </div>
        <div class="section-title">物品栏</div>
        <div class="item-list">
          <div v-for="(item, name) in store.data.主角.物品栏" :key="name" class="item-box">
            <span class="item-name">{{ name }}</span>
            <span class="item-type">{{ item.类型 }}</span>
            <span class="item-desc">{{ item.描述 }}</span>
            <span class="item-qty">x{{ item.数量 }}</span>
          </div>
        </div>
      </div>

      <!-- 江湖人物 -->
      <div v-if="activeTab === 'npc'" class="tab-pane">
        <div v-if="_.isEmpty(store.data.江湖人物)" class="empty-msg">江湖茫茫，尚未结识什么人物。</div>
        <div v-for="(npc, name) in store.data.江湖人物" :key="name" class="npc-card">
          <div class="npc-header">
            <span class="npc-name">{{ name }}</span>
            <span class="npc-faction" :class="npc.立场">{{ npc.立场 }}</span>
          </div>
          <div class="npc-info">
            <span><b>身份</b> {{ npc.身份 }}</span>
            <span><b>关系</b> {{ npc.与主角关系 }}</span>
            <span><b>位置</b> {{ npc.当前位置 }}</span>
            <span><b>状态</b> {{ npc.状态 }}</span>
          </div>
        </div>
      </div>

      <!-- 任务列表 -->
      <div v-if="activeTab === 'quest'" class="tab-pane">
        <div v-if="_.isEmpty(store.data.任务列表)" class="empty-msg">暂无任务，去江湖中走走吧。</div>
        <div v-for="(quest, name) in store.data.任务列表" :key="name" class="quest-card">
          <div class="quest-header">
            <span class="quest-name">{{ name }}</span>
            <span class="quest-type">{{ quest.类型 }}</span>
            <span class="quest-status" :class="quest.状态">{{ quest.状态 }}</span>
          </div>
          <div class="quest-desc">{{ quest.说明 }}</div>
          <div class="quest-goal"><b>目标</b> {{ quest.目标 }}</div>
          <div class="quest-reward"><b>奖励</b> {{ quest.奖励 }}</div>
          <div v-if="quest.惩罚 !== '无'" class="quest-penalty"><b>惩罚</b> {{ quest.惩罚 }}</div>
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
  { id: 'hero', label: '主角' },
  { id: 'npc', label: '江湖人物' },
  { id: 'quest', label: '任务' },
];

const activeTab = useLocalStorage<string>('yandere_status_tab', 'hero');

const dangerClass = computed(() => {
  const level = store.data.血玲珑.$危险等级;
  if (level === '可控') return 'safe';
  if (level === '警惕') return 'warn';
  if (level === '危险') return 'danger';
  return 'extreme';
});
</script>

<style lang="scss" scoped>
.wuxia-card {
  width: 100%;
  max-width: 720px;
  background-color: var(--c-dark);
  border: 2px solid var(--c-blood-light);
  box-shadow: 0 0 15px rgba(139, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  font-family: var(--font-wuxia);
  color: var(--c-parchment);
  font-size: 13px;
  line-height: 1.4;
  margin: 0 auto;
}

/* 世界信息 */
.world-section {
  padding: 10px 12px;
  background-color: var(--c-charcoal);
  border-bottom: 1px solid var(--c-blood);
}

.world-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 6px;
}

.world-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--c-gold);
  letter-spacing: 2px;
}

.world-tag {
  background: var(--c-blood);
  color: var(--c-parchment);
  padding: 2px 8px;
  font-size: 0.75rem;
  border-radius: 2px;
}

.world-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 6px;
  font-size: 0.8rem;
  color: var(--c-ash);
}

.world-meta b {
  color: var(--c-gold-dim);
}

.world-situation {
  font-size: 0.82rem;
  color: var(--c-parchment);
  margin-bottom: 8px;
  padding-left: 8px;
  border-left: 3px solid var(--c-blood-light);
}

.event-list {
  display: flex;
  gap: 6px;
  overflow-x: auto;
  flex-wrap: wrap;
}

.event-badge {
  background: var(--c-dark);
  border: 1px solid var(--c-blood-light);
  padding: 5px 8px;
  min-width: 120px;
  flex: 1;
}

.event-badge.empty {
  border-color: var(--c-ash);
  opacity: 0.6;
}

.event-name {
  display: block;
  font-weight: bold;
  color: var(--c-gold);
  font-size: 0.78rem;
  margin-bottom: 2px;
}

.event-desc {
  display: block;
  font-size: 0.72rem;
  color: var(--c-ash);
}

/* 血玲珑 */
.blood-section {
  padding: 10px 12px;
  background-color: var(--c-dark);
  border-bottom: 1px solid var(--c-blood);
}

.blood-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 8px;
}

.blood-title {
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--c-blood-light);
  letter-spacing: 2px;
}

.blood-phase {
  background: var(--c-blood);
  color: var(--c-parchment);
  padding: 2px 8px;
  font-size: 0.75rem;
}

.blood-danger {
  padding: 2px 8px;
  font-size: 0.75rem;
  margin-left: auto;
}

.blood-danger.safe { background: #2e7d32; color: #fff; }
.blood-danger.warn { background: #f9a825; color: #000; }
.blood-danger.danger { background: #e65100; color: #fff; }
.blood-danger.extreme { background: #b71c1c; color: #fff; animation: pulse 1.5s infinite; }

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.bars-row {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 8px;
}

.bar-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.bar-label {
  width: 48px;
  font-size: 0.75rem;
  color: var(--c-ash);
  text-align: right;
}

.bar-track {
  flex: 1;
  height: 10px;
  background: var(--c-charcoal);
  border: 1px solid var(--c-ash);
  position: relative;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.bar-fill.obsession { background: linear-gradient(90deg, #8b0000, #ff1744); }
.bar-fill.darkness { background: linear-gradient(90deg, #1a1a1a, #4a148c); }
.bar-fill.disguise { background: linear-gradient(90deg, #1b5e20, #69f0ae); }

.bar-value {
  width: 28px;
  font-size: 0.75rem;
  color: var(--c-parchment);
  text-align: right;
}

.blood-meta {
  display: flex;
  gap: 16px;
  margin-bottom: 8px;
  font-size: 0.8rem;
  color: var(--c-ash);
}

.blood-meta b {
  color: var(--c-gold-dim);
}

.attire-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 5px;
  margin-bottom: 8px;
}

.attire-item {
  background: var(--c-charcoal);
  border: 1px solid var(--c-ash);
  padding: 4px 6px;
  font-size: 0.75rem;
}

.attire-slot {
  color: var(--c-gold-dim);
  font-size: 0.7rem;
  display: block;
}

.attire-desc {
  color: var(--c-parchment);
}

.title-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 5px;
}

.title-box {
  background: var(--c-charcoal);
  border: 1px solid var(--c-blood-light);
  padding: 5px 7px;
}

.title-name {
  background: var(--c-blood);
  color: var(--c-parchment);
  display: inline-block;
  padding: 1px 5px;
  font-size: 0.7rem;
  font-weight: bold;
  margin-bottom: 3px;
}

.title-effect {
  font-size: 0.75rem;
  color: var(--c-parchment);
  margin-bottom: 2px;
}

.title-quote {
  font-size: 0.68rem;
  color: var(--c-ash);
  font-style: italic;
}

/* 标签页 */
.tabs {
  display: flex;
  background: var(--c-charcoal);
  border-bottom: 1px solid var(--c-blood);
}

.tab-btn {
  flex: 1;
  padding: 8px;
  background: transparent;
  border: none;
  color: var(--c-ash);
  font-family: var(--font-wuxia);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s;
}

.tab-btn:hover {
  color: var(--c-parchment);
  background: rgba(139, 0, 0, 0.15);
}

.tab-btn.active {
  color: var(--c-gold);
  background: rgba(139, 0, 0, 0.3);
  border-bottom: 2px solid var(--c-blood-light);
}

.tab-content {
  padding: 10px 12px;
  min-height: 0;
  max-height: 400px;
  overflow-y: auto;
}

.section-title {
  font-size: 0.9rem;
  color: var(--c-gold);
  border-bottom: 1px solid var(--c-blood);
  padding-bottom: 3px;
  margin: 10px 0 6px 0;
  font-weight: bold;
}

/* 主角面板 */
.hero-status {
  display: flex;
  gap: 16px;
  font-size: 0.8rem;
  color: var(--c-ash);
  margin-bottom: 6px;
}

.hero-status b {
  color: var(--c-gold-dim);
}

.skill-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 6px;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 6px;
  background: var(--c-charcoal);
  padding: 4px 6px;
}

.skill-name {
  width: 40px;
  font-size: 0.75rem;
  color: var(--c-ash);
}

.skill-bar {
  flex: 1;
  height: 8px;
  background: var(--c-dark);
  border: 1px solid var(--c-ash);
  overflow: hidden;
}

.skill-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--c-gold-dim), var(--c-gold));
  transition: width 0.3s;
}

.skill-value {
  width: 24px;
  font-size: 0.75rem;
  color: var(--c-parchment);
  text-align: right;
}

.reputation-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.rep-item {
  background: var(--c-charcoal);
  border: 1px solid var(--c-ash);
  padding: 3px 8px;
  display: flex;
  gap: 8px;
  align-items: center;
}

.rep-name {
  font-size: 0.78rem;
  color: var(--c-parchment);
}

.rep-value {
  font-size: 0.78rem;
  font-weight: bold;
}

.rep-value.positive { color: #69f0ae; }
.rep-value.negative { color: #ff5252; }

.item-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 5px;
}

.item-box {
  background: var(--c-charcoal);
  border: 1px solid var(--c-ash);
  padding: 5px 7px;
  position: relative;
}

.item-name {
  display: block;
  font-weight: bold;
  color: var(--c-parchment);
  font-size: 0.8rem;
}

.item-type {
  display: inline-block;
  background: var(--c-blood);
  color: var(--c-parchment);
  padding: 1px 5px;
  font-size: 0.65rem;
  margin: 2px 0;
}

.item-desc {
  display: block;
  font-size: 0.72rem;
  color: var(--c-ash);
}

.item-qty {
  position: absolute;
  top: 5px;
  right: 7px;
  font-size: 0.72rem;
  color: var(--c-gold);
}

/* NPC */
.empty-msg {
  text-align: center;
  color: var(--c-ash);
  padding: 20px;
  font-style: italic;
}

.npc-card {
  background: var(--c-charcoal);
  border: 1px solid var(--c-ash);
  padding: 6px 8px;
  margin-bottom: 5px;
}

.npc-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 4px;
}

.npc-name {
  font-weight: bold;
  color: var(--c-parchment);
}

.npc-faction {
  padding: 1px 6px;
  font-size: 0.7rem;
}

.npc-faction.正道 { background: #1565c0; color: #fff; }
.npc-faction.邪道 { background: #c62828; color: #fff; }
.npc-faction.中立 { background: #6a1b9a; color: #fff; }
.npc-faction.未知 { background: var(--c-ash); color: var(--c-dark); }

.npc-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3px 10px;
  font-size: 0.75rem;
  color: var(--c-ash);
}

.npc-info b {
  color: var(--c-gold-dim);
}

/* 任务 */
.quest-card {
  background: var(--c-charcoal);
  border: 1px solid var(--c-ash);
  padding: 6px 8px;
  margin-bottom: 5px;
}

.quest-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
  flex-wrap: wrap;
}

.quest-name {
  font-weight: bold;
  color: var(--c-parchment);
}

.quest-type {
  background: var(--c-blood);
  color: var(--c-parchment);
  padding: 1px 5px;
  font-size: 0.68rem;
}

.quest-status {
  padding: 1px 5px;
  font-size: 0.68rem;
  margin-left: auto;
}

.quest-status.进行中 { background: var(--c-gold-dim); color: #fff; }
.quest-status.已完成 { background: #2e7d32; color: #fff; }
.quest-status.失败 { background: #b71c1c; color: #fff; }
.quest-status.已放弃 { background: var(--c-ash); color: var(--c-dark); }

.quest-desc {
  font-size: 0.78rem;
  color: var(--c-parchment);
  margin-bottom: 3px;
}

.quest-goal,
.quest-reward,
.quest-penalty {
  font-size: 0.75rem;
  color: var(--c-ash);
}

.quest-goal b,
.quest-reward b,
.quest-penalty b {
  color: var(--c-gold-dim);
}

.quest-penalty {
  color: #ff5252;
}

@media (max-width: 600px) {
  .world-meta,
  .blood-meta,
  .hero-status {
    flex-direction: column;
    gap: 3px;
  }
  .skill-grid,
  .attire-list,
  .title-list,
  .item-list {
    grid-template-columns: 1fr;
  }
  .npc-info {
    grid-template-columns: 1fr;
  }
}
</style>
