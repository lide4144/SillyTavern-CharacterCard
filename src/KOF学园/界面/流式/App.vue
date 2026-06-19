<template>
  <div class="galgame-root">
    <!-- Latest message: full galgame UI -->
    <template v-if="isLatest">
      <!-- Time/Location -->
      <div v-if="parsed.time" class="galgame-time">{{ parsed.time }}</div>

      <!-- Character Portrait (placeholder) -->
      <div class="galgame-portrait">{{ speakerEmoji }}</div>

      <!-- Dialogue Box -->
      <div class="galgame-dialogue">
        <div v-if="speakerName" class="galgame-name">{{ speakerName }}</div>
        <div class="galgame-text" v-html="renderedText"></div>
      </div>

      <!-- Choices -->
      <div v-if="parsed.choices.length" class="mt-3">
        <button
          v-for="(c, i) in parsed.choices"
          :key="i"
          class="galgame-choice"
          :style="{ animationDelay: i * 0.08 + 's' }"
          @click="selectChoice(c)"
        >
          <span class="galgame-stat mr-2">{{ i + 1 }}</span>
          {{ c }}
        </button>
      </div>

      <!-- Status bar -->
      <div v-if="dataStore.data.value.世界" class="galgame-status">
        <span class="galgame-stat">⚡ {{ playerEnergy }}</span>
        <span class="galgame-stat">📚 {{ playerAcademics }}</span>
        <span class="galgame-stat">💬 {{ playerSocial }}</span>
        <span class="galgame-stat">🏫 {{ playerClub }}</span>
        <span
          v-for="c in topAffections"
          :key="c.id"
          class="galgame-stat"
        >
          {{ c.emoji }} {{ c.nick }} {{ c.affection }}
        </span>
      </div>
    </template>

    <!-- Old messages: compact -->
    <div v-else class="galgame-old">{{ summary }}</div>
  </div>
</template>

<script setup lang="ts">
import { injectStreamingMessageContext } from '@util/streaming';
import { useDataStore } from './store';
import { CHARACTERS } from '../同层/characters';

const context = injectStreamingMessageContext();
const dataStore = useDataStore();

const isLatest = computed(() => context.message_id === getLastMessageId());

function extractTag(tag: string, text: string): string {
  const m = text.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, 'i'));
  return m ? m[1].trim() : '';
}

const parsed = computed(() => {
  const msg = context.message;
  return {
    time: extractTag('time', msg).replace(/```/g, '').trim(),
    content: extractTag('content', msg),
    choiceRaw: extractTag('choice', msg),
    choices: extractTag('choice', msg)
      .split('\n')
      .filter(l => /^\d+\./.test(l.trim()))
      .map(l => l.replace(/^\d+\.\s*/, '').trim()),
    update: extractTag('UpdateVariable', msg),
  };
});

const renderedText = computed(() => {
  let text = parsed.value.content || context.message;
  // Remove XML tags for display
  text = text.replace(/<time>[\s\S]*?<\/time>/gi, '');
  text = text.replace(/<choice>[\s\S]*?<\/choice>/gi, '');
  text = text.replace(/<UpdateVariable>[\s\S]*?<\/UpdateVariable>/gi, '');
  text = text.replace(/<StatusPlaceHolderImpl\/>/g, '');
  text = text.replace(/<metacognition>[\s\S]*?<\/metacognition>/gi, '');
  text = text.replace(/<thinking>[\s\S]*?<\/thinking>/gi, '');
  return text.split('\n').filter(l => l.trim()).map(p => `<p>${p.trim()}</p>`).join('');
});

const speakerEmoji = computed(() => {
  for (const c of CHARACTERS) {
    if (context.message.includes(c.name) || context.message.includes(c.nick)) {
      return c.emoji;
    }
  }
  return '📖';
});

const speakerName = computed(() => {
  for (const c of CHARACTERS) {
    if (context.message.includes(c.name)) return c.name;
    if (context.message.includes(c.nick)) return c.name;
  }
  return context.message.match(/「(.+?)」/) ? null : 'KOF学园';
});

const summary = computed(() => {
  const text = renderedText.value.replace(/<[^>]+>/g, '');
  return text.length > 200 ? text.substring(0, 200) + '…' : text;
});

const playerEnergy = computed(() => dataStore.data.value?.主角?.体力 ?? '--');
const playerAcademics = computed(() => dataStore.data.value?.主角?.学业 ?? '--');
const playerSocial = computed(() => dataStore.data.value?.主角?.社交评价 ?? '--');
const playerClub = computed(() => dataStore.data.value?.主角?.所属社团 ?? '--');

const topAffections = computed(() => {
  const data = dataStore.data.value;
  return CHARACTERS
    .map(c => {
      const charData = _.get(data, c.id, { 好感度: 0 });
      return { ...c, affection: charData.好感度 || 0 };
    })
    .filter(c => c.affection >= 55)
    .sort((a, b) => b.affection - a.affection)
    .slice(0, 4);
});

function selectChoice(text: string) {
  const input = document.querySelector('#send_textarea,textarea[placeholder*="输入"]') as HTMLTextAreaElement;
  if (input) {
    input.value = text;
    input.focus();
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
  const sendBtn = document.querySelector('#send_but,button[title*="发送"]') as HTMLButtonElement;
  if (sendBtn) sendBtn.click();
}
</script>
