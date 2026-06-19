<template>
  <div class="shrink-0 border-t border-white/10 bg-black/30 px-3 py-2">
    <div class="mb-1.5 flex flex-wrap gap-2">
      <button
        v-for="quick in quickActions"
        :key="quick"
        class="rounded bg-white/5 px-2 py-0.5 text-xs text-white/60 transition-colors hover:bg-white/10 hover:text-white/80"
        @click="store.sendAction(quick)"
      >
        {{ quick }}
      </button>
      <div class="flex-1"></div>
      <button
        class="rounded bg-white/5 px-2 py-0.5 text-xs text-white/40 transition-colors hover:bg-white/10 hover:text-white/60"
        @click="showLocations = !showLocations"
      >
        📍 移动
      </button>
    </div>
    <div v-if="showLocations" class="mb-1.5 flex flex-wrap gap-1.5">
      <button
        v-for="loc in LOCATIONS"
        :key="loc.id"
        class="rounded bg-blue-500/10 px-2 py-0.5 text-xs text-blue-300 transition-colors hover:bg-blue-500/20 hover:text-blue-200"
        @click="store.sendAction(`前往${loc.name}`); showLocations = false"
      >
        🚶 {{ loc.name }}
      </button>
    </div>
    <div class="flex gap-2">
      <input
        v-model="input"
        class="flex-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white placeholder-white/30 transition-colors focus:border-pink-400/50 focus:outline-none"
        placeholder="输入你的行动或对话..."
        :disabled="store.isGenerating.value"
        @keydown.enter="send"
      />
      <button
        class="rounded-lg px-4 py-1.5 text-sm font-bold transition-all"
        :class="store.isGenerating.value ? 'cursor-not-allowed bg-white/10 text-white/30' : 'bg-pink-500/80 text-white hover:bg-pink-500'"
        :disabled="store.isGenerating.value"
        @click="send"
      >
        {{ store.isGenerating.value ? '...' : '▶ 发送' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '../store';
import { LOCATIONS } from '../characters';

const store = useChatStore();
const input = ref('');
const showLocations = ref(false);

const quickActions = ['四处看看', '查看课表', '找人聊天', '休息一下'];

function send() {
  if (!input.value.trim() || store.isGenerating.value) return;
  store.sendMessage(input.value);
  input.value = '';
}
</script>
