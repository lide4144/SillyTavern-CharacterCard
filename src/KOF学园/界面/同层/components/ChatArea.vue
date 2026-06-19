<template>
  <div class="flex flex-1 flex-col overflow-hidden">
    <div ref="scrollContainer" class="flex-1 scrollbar-thin overflow-y-auto px-4 py-3">
      <div v-if="store.messages.value.length === 0" class="flex h-full items-center justify-center text-sm text-white/30">
        在下方输入框中开始你的校园生活...
      </div>
      <div v-for="(msg, i) in store.messages.value" :key="i" class="mb-3">
        <div v-if="msg.role === 'user'" class="flex justify-end">
          <div class="max-w-[75%] rounded-xl rounded-br-sm bg-pink-500/20 px-3 py-2 text-sm leading-relaxed text-pink-100">
            {{ msg.content }}
          </div>
        </div>
        <div v-else class="flex gap-2">
          <div class="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pink-400/30 text-xs">AI</div>
          <div class="max-w-[80%] rounded-xl rounded-bl-sm bg-white/5 px-3 py-2 text-sm leading-relaxed text-white/90">
            {{ msg.content }}
          </div>
        </div>
      </div>
      <div v-if="store.isGenerating.value && store.streamText.value" class="mb-3 flex gap-2">
        <div class="mt-1 flex h-7 w-7 shrink-0 animate-pulse items-center justify-center rounded-full bg-pink-400/30 text-xs">AI</div>
        <div class="max-w-[80%] rounded-xl rounded-bl-sm bg-white/5 px-3 py-2 text-sm leading-relaxed text-white/90">
          {{ store.streamText.value }}
        </div>
      </div>
      <div v-if="store.isGenerating.value && !store.streamText.value" class="mb-3 flex gap-2">
        <div class="mt-1 flex h-7 w-7 shrink-0 animate-pulse items-center justify-center rounded-full bg-pink-400/30 text-xs">AI</div>
        <div class="max-w-[80%] rounded-xl rounded-bl-sm bg-white/5 px-3 py-2 text-sm text-white/50">
          生成中...
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '../store';

const store = useChatStore();
const scrollContainer = ref<HTMLElement>();

watch(
  () => [store.messages.value.length, store.streamText.value],
  () => {
    nextTick(() => {
      const el = scrollContainer.value;
      if (el) {
        el.scrollTop = el.scrollHeight;
      }
    });
  },
);
</script>
