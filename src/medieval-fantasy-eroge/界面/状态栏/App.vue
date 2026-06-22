<template>
  <div class="guild-card">
    <!-- Header -->
    <header class="card-header">
      <div class="header-rank">
        <span class="rank-star">★</span>
        <span class="rank-num">{{ store.data.艾丽西亚.level }}</span>
      </div>
      <div class="header-info">
        <h1 class="card-title">冒险者公会卡</h1>
        <span class="card-subtitle">艾丽西亚 — 火元素</span>
      </div>
      <div class="header-stage" :class="stageClass">{{ stageName }}</div>
    </header>

    <!-- HP / MP -->
    <section class="bars-section">
      <div class="bar-row">
        <span class="bar-label">❤️ HP</span>
        <div class="bar-track">
          <div class="bar-fill hp-fill" :style="{ width: hpPercent + '%' }"></div>
        </div>
        <span class="bar-value">{{ store.data.艾丽西亚.hp }}/{{ store.data.艾丽西亚.maxHp }}</span>
      </div>
      <div class="bar-row">
        <span class="bar-label">💧 MP</span>
        <div class="bar-track">
          <div class="bar-fill mp-fill" :style="{ width: mpPercent + '%' }"></div>
        </div>
        <span class="bar-value">{{ store.data.艾丽西亚.mp }}/{{ store.data.艾丽西亚.maxMp }}</span>
      </div>
    </section>

    <!-- Corruption -->
    <section class="corruption-section">
      <div class="bar-row">
        <span class="bar-label" :class="{ 'label-danger': store.data.艾丽西亚.corruption >= 50 }">
          🕯️ 堕落
        </span>
        <div class="bar-track corruption-track">
          <div
            class="bar-fill corruption-fill"
            :style="{ width: store.data.艾丽西亚.corruption + '%' }"
          ></div>
        </div>
        <span class="bar-value" :class="{ 'value-danger': store.data.艾丽西亚.corruption >= 50 }">
          {{ store.data.艾丽西亚.corruption }}
        </span>
      </div>
      <div class="bar-row">
        <span class="bar-label">💕 发情</span>
        <div class="bar-track arousal-track">
          <div
            class="bar-fill arousal-fill"
            :style="{ width: store.data.艾丽西亚.arousal + '%' }"
          ></div>
        </div>
        <span class="bar-value">{{ store.data.艾丽西亚.arousal }}</span>
      </div>
    </section>

    <!-- Status Effects -->
    <section v-if="store.data.艾丽西亚.status.length" class="status-section">
      <span
        v-for="s in store.data.艾丽西亚.status"
        :key="s"
        class="status-badge"
        :class="s"
      >{{ statusLabel(s) }}</span>
    </section>

    <!-- Footer Stats -->
    <footer class="card-footer">
      <div class="footer-stat">
        <span class="stat-icon">💰</span>
        <span>{{ store.data.艾丽西亚.gold }} G</span>
      </div>
      <div class="footer-stat">
        <span class="stat-icon">⚔️</span>
        <span>战败 {{ store.data.艾丽西亚.defeatCount }} 次</span>
      </div>
      <div class="footer-stat">
        <span class="stat-icon">🔆</span>
        <span>{{ elementLabel }}</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useDataStore } from './store';

const store = useDataStore();

const hpPercent = computed(() =>
  store.data.艾丽西亚.maxHp > 0
    ? Math.round((store.data.艾丽西亚.hp / store.data.艾丽西亚.maxHp) * 100)
    : 0
);

const mpPercent = computed(() =>
  store.data.艾丽西亚.maxMp > 0
    ? Math.round((store.data.艾丽西亚.mp / store.data.艾丽西亚.maxMp) * 100)
    : 0
);

const stageName = computed(() => {
  const c = store.data.艾丽西亚.corruption;
  if (c < 30) return '纯洁期';
  if (c < 70) return '动摇期';
  return '堕落期';
});

const stageClass = computed(() => {
  const map: Record<string, string> = {
    '纯洁期': 'stage-pure',
    '动摇期': 'stage-waver',
    '堕落期': 'stage-fallen',
  };
  return map[stageName.value] || '';
});

const statusLabels: Record<string, string> = {
  poison: '☠ 中毒',
  paralysis: '⚡ 麻痹',
  aphrodisiac: '🌸 媚药',
  tentacle_parasite: '🐙 寄生',
  curse: '👁 诅咒',
  charm: '💋 魅惑',
};

const statusLabel = (s: string) => statusLabels[s] || s;

const elementLabels: Record<string, string> = {
  fire: '火元素',
  water: '水元素',
  wind: '风元素',
  earth: '土元素',
  light: '光元素',
  dark: '暗元素',
};

const elementLabel = computed(() => elementLabels[store.data.艾丽西亚.element] || '未知');
</script>

<style lang="scss" scoped>
$c-parchment: #f5f0e0;
$c-ink: #2c1810;
$c-gold: #c8a45c;
$c-crimson: #8b3a3a;
$c-forest: #3a5c3a;
$c-slate: #4a5568;
$c-blue: #3a6b8b;
$c-pink: #c06080;
$c-purple: #6b3a8b;

.guild-card {
  width: 100%;
  max-width: 420px;
  background: linear-gradient(180deg, #faf3e0 0%, #f0e8d0 100%);
  border: 2px solid $c-gold;
  box-shadow: 3px 3px 0px rgba(44, 24, 16, 0.15);
  font-family: 'Georgia', serif;
  color: $c-ink;
  font-size: 12px;
  line-height: 1.5;
  margin: 0 auto;
  border-radius: 2px;
}

.card-header {
  background: linear-gradient(180deg, $c-ink 0%, #3d2a1a 100%);
  color: $c-parchment;
  padding: 8px 12px;
  display: flex;
  align-items: center;
  gap: 10px;
  border-bottom: 2px solid $c-gold;
}

.header-rank {
  display: flex;
  align-items: baseline;
  gap: 2px;
  font-size: 1.8rem;
  font-weight: bold;
  color: $c-gold;
}

.rank-star {
  font-size: 1.2rem;
}

.header-info {
  flex: 1;
}

.card-title {
  font-size: 0.95rem;
  margin: 0;
  letter-spacing: 0.08em;
  font-weight: normal;
}

.card-subtitle {
  font-size: 0.65rem;
  color: #c0a88c;
  letter-spacing: 0.05em;
}

.header-stage {
  font-size: 0.75rem;
  padding: 2px 8px;
  border: 1px solid;
  font-weight: bold;
  letter-spacing: 0.1em;
}

.stage-pure {
  color: #7b9cb0;
  border-color: #7b9cb0;
}

.stage-waver {
  color: #c8a060;
  border-color: #c8a060;
}

.stage-fallen {
  color: $c-crimson;
  border-color: $c-crimson;
  text-shadow: 0 0 6px rgba(139, 58, 58, 0.3);
}

/* Bars */
.bars-section {
  padding: 8px 12px 4px;
}

.bar-row {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 5px;
}

.bar-label {
  width: 52px;
  font-size: 0.7rem;
  text-align: right;
  flex-shrink: 0;
}

.label-danger {
  color: $c-crimson;
}

.bar-track {
  flex: 1;
  height: 10px;
  background: #ddd0b8;
  border: 1px solid #c0a880;
  border-radius: 1px;
  overflow: hidden;
}

.corruption-track {
  background: linear-gradient(90deg, #ddd0b8, #e0c0c0);
}

.arousal-track {
  background: linear-gradient(90deg, #ddd0b8, #e0c0d0);
}

.bar-fill {
  height: 100%;
  transition: width 0.4s ease;
}

.hp-fill {
  background: linear-gradient(90deg, $c-crimson, #cc5555);
}

.mp-fill {
  background: linear-gradient(90deg, $c-blue, #5599cc);
}

.corruption-fill {
  background: linear-gradient(90deg, $c-purple, $c-crimson, #cc3333);
}

.arousal-fill {
  background: linear-gradient(90deg, $c-pink, #e080a0);
}

.bar-value {
  width: 44px;
  font-size: 0.65rem;
  text-align: left;
  color: $c-slate;
}

.value-danger {
  color: $c-crimson;
}

.corruption-section {
  padding: 0 12px 4px;
}

/* Status */
.status-section {
  padding: 2px 12px 6px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.status-badge {
  font-size: 0.62rem;
  padding: 1px 6px;
  border: 1px solid;
  color: $c-ink;
}

.status-badge.poison { border-color: #6b8b3a; color: #6b8b3a; }
.status-badge.paralysis { border-color: #c8a040; color: #c8a040; }
.status-badge.aphrodisiac { border-color: #c06080; color: #c06080; }
.status-badge.tentacle_parasite { border-color: $c-purple; color: $c-purple; }
.status-badge.curse { border-color: $c-ink; color: $c-ink; }
.status-badge.charm { border-color: #cc4488; color: #cc4488; }

/* Footer */
.card-footer {
  display: flex;
  justify-content: space-around;
  padding: 6px 12px;
  border-top: 1px solid #d0c8a8;
  background: rgba(200, 164, 92, 0.08);
}

.footer-stat {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 0.65rem;
  color: $c-slate;
}

.stat-icon {
  font-size: 0.75rem;
}

@media (max-width: 400px) {
  .guild-card {
    font-size: 11px;
  }
  .bar-label {
    width: 42px;
  }
}
</style>
