<template>
  <div class="cg-layout">
    <div class="section-head">
      <span class="head-icon">☗</span> CG 收集图鉴
    </div>

    <div class="cg-progress">
      <span>已解锁：{{ unlockedCount }} / {{ cgList.length }}</span>
      <div class="cg-progress-track">
        <div class="cg-progress-fill" :style="{ width: (unlockedCount / cgList.length * 100) + '%' }"></div>
      </div>
    </div>

    <div class="cg-grid">
      <div
        v-for="cg in cgList"
        :key="cg.key"
        class="cg-card"
        :class="{ unlocked: cg.unlocked }"
      >
        <div class="cg-icon">{{ cg.unlocked ? cg.icon : '?' }}</div>
        <div class="cg-info">
          <span class="cg-name">{{ cg.name }}</span>
          <span class="cg-desc">{{ cg.unlocked ? cg.desc : '尚未触发此场景' }}</span>
        </div>
        <span v-if="cg.unlocked" class="cg-badge unlocked">✓</span>
        <span v-else class="cg-badge locked">锁</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const cgList = computed(() => [
  {
    key: 'cg_初次忏悔情欲',
    name: '忏悔情欲',
    icon: '✟',
    desc: '在忏悔室中，首次有告解者对修女直接表达性欲',
    unlocked: store.data.修女.CG.cg_初次忏悔情欲 === 1,
  },
  {
    key: 'cg_初次夜间战败',
    name: '夜间战败',
    icon: '⚔',
    desc: '首次在夜间任务中被魔物或敌人击败',
    unlocked: store.data.修女.CG.cg_初次夜间战败 === 1,
  },
  {
    key: 'cg_初次触手',
    name: '触手拘束',
    icon: '☠',
    desc: '首次被触手怪束缚并遭触手侵犯',
    unlocked: store.data.修女.CG.cg_初次触手 === 1,
  },
  {
    key: 'cg_初次雷恩目睹',
    name: '雷恩目睹',
    icon: '☹',
    desc: '雷恩首次亲眼目睹修女被他人染指',
    unlocked: store.data.修女.CG.cg_初次雷恩目睹 === 1,
  },
  {
    key: 'cg_初次催眠',
    name: '魅魔催眠',
    icon: '☾',
    desc: '首次被莉莉丝以催眠/梦境操控',
    unlocked: store.data.修女.CG.cg_初次催眠 === 1,
  },
  {
    key: 'cg_初次群交',
    name: '群交盛宴',
    icon: '◈',
    desc: '首次同时被三人以上侵犯',
    unlocked: store.data.修女.CG.cg_初次群交 === 1,
  },
  {
    key: 'cg_初次肉体改造',
    name: '肉体改造',
    icon: '⚗',
    desc: '首次接受格雷因的身体改造',
    unlocked: store.data.修女.CG.cg_初次肉体改造 === 1,
  },
  {
    key: 'cg_初次露出',
    name: '公开露出',
    icon: '☯',
    desc: '首次在公共场合暴露身体',
    unlocked: store.data.修女.CG.cg_初次露出 === 1,
  },
  {
    key: 'cg_贵族调教',
    name: '贵族调教',
    icon: '♚',
    desc: '首次在马库斯的领主府接受调教',
    unlocked: store.data.修女.CG.cg_贵族调教 === 1,
  },
  {
    key: 'cg_身份暴露',
    name: '身份暴露',
    icon: '⚠',
    desc: '双重身份首次被暗部以外的人识破',
    unlocked: store.data.修女.CG.cg_身份暴露 === 1,
  },
]);

const unlockedCount = computed(() => cgList.value.filter(cg => cg.unlocked).length);
</script>

<style lang="scss" scoped>
.cg-layout {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section-head {
  font-family: var(--font-display);
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  border-bottom: 2px solid var(--c-crimson);
  padding-bottom: 4px;
  display: inline-block;
  margin-bottom: 4px;
}

.head-icon {
  font-size: 0.75rem;
}

.cg-progress {
  font-size: 0.7rem;
  color: var(--c-ash);
  font-family: var(--font-mono);
}

.cg-progress-track {
  height: 4px;
  border: 1px solid var(--c-silver);
  background: #f0ecef;
  margin-top: 3px;
}

.cg-progress-fill {
  height: 100%;
  background: var(--c-gold);
  transition: width 0.3s ease;
}

.cg-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 7px;
}

.cg-card {
  border: 1.5px solid var(--c-silver);
  padding: 7px;
  background: #fff;
  display: flex;
  align-items: center;
  gap: 7px;
  opacity: 0.55;
  transition: all 0.25s;
}

.cg-card.unlocked {
  opacity: 1;
  border-color: var(--c-gold);
  background: linear-gradient(135deg, #fff, #fef9ee);
  box-shadow: 2px 2px 0 rgba(184, 134, 11, 0.2);
}

.cg-icon {
  font-size: 1.2rem;
  width: 28px;
  text-align: center;
  flex-shrink: 0;
}

.cg-info {
  flex: 1;
  min-width: 0;
}

.cg-name {
  font-weight: bold;
  font-size: 0.76rem;
  font-family: var(--font-display);
  display: block;
}

.cg-desc {
  font-size: 0.62rem;
  color: var(--c-ash);
  line-height: 1.3;
}

.cg-badge {
  font-size: 0.65rem;
  font-weight: bold;
  width: 18px;
  text-align: center;
  flex-shrink: 0;
}

.cg-badge.unlocked { color: var(--c-gold); }
.cg-badge.locked { color: var(--c-silver); }

@media (max-width: 600px) {
  .cg-grid {
    grid-template-columns: 1fr;
  }
}
</style>
