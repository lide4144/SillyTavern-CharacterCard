<template>
  <div class="flex w-44 shrink-0 flex-col overflow-hidden border-r border-white/10 bg-black/20">
    <div class="shrink-0 border-b border-white/10 px-2 py-1.5 text-xs font-bold text-white/60">角色关系</div>
    <div class="flex-1 scrollbar-thin overflow-y-auto px-1">
      <div
        v-for="char in store.sortedCharacters.value"
        :key="char.id"
        class="flex cursor-pointer items-center gap-1.5 rounded px-1.5 py-1 text-xs hover:bg-white/5"
        :class="{ 'bg-white/10': selected === char.id }"
        @click="selected = char.id"
      >
        <span class="w-5 text-center text-sm">{{ char.emoji }}</span>
        <div class="min-w-0 flex-1">
          <div class="truncate text-white/80" :title="char.nick || char.name">
            {{ char.nick || char.name }}
          </div>
          <div class="flex items-center gap-1">
            <div class="affection-bar flex-1">
              <div class="affection-bar-fill" :style="{ width: char.affection + '%', backgroundColor: affectionColor(char.affection) }"></div>
            </div>
            <span class="w-6 text-right text-white/40">{{ char.affection }}</span>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="selected"
      class="shrink-0 border-t border-white/10 bg-black/30 p-2 text-xs"
    >
      <div class="font-bold text-pink-300">{{ selectedCharData?.name }}</div>
      <div class="text-white/50">{{ selectedCharData?.dept }}</div>
      <div class="mt-1">
        <span class="text-white/40">阶段: </span>
        <span class="text-cyan-300">{{ selectedCharData?.stage }}</span>
      </div>
      <div class="mt-0.5 leading-relaxed text-white/60">
        {{ selectedCharData?.impression }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '../store';
import { CHARACTERS } from '../characters';

const store = useChatStore();
const selected = ref<string | null>(null);

const selectedCharData = computed(() => {
  if (!selected.value) return null;
  const char = CHARACTERS.find(c => c.id === selected.value);
  const found = store.sortedCharacters.value.find(c => c.id === selected.value);
  return char && found ? { ...char, stage: found.stage, impression: found.impression } : null;
});

function affectionColor(val: number): string {
  if (val >= 80) return '#ff69b4';
  if (val >= 60) return '#f0a';
  if (val >= 40) return '#f90';
  return '#666';
}
</script>
