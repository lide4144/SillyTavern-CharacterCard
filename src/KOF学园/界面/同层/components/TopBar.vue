<template>
  <div class="flex shrink-0 items-center gap-3 border-b border-white/10 bg-black/40 px-3 py-1.5 text-xs">
    <span class="text-sm font-bold text-pink-400">KOF学园</span>
    <span class="text-white/40">|</span>
    <span>⏰ {{ store.world.value.time }}</span>
    <span class="text-white/40">|</span>
    <span>📍 {{ store.world.value.location }}</span>
    <span class="text-white/40">|</span>
    <span>📋 {{ store.world.value.activity }}</span>
    <div class="flex-1"></div>
    <span class="flex items-center gap-1" :class="energyColor">
      ⚡ {{ store.player.value.energy }}
    </span>
    <span class="text-white/40">|</span>
    <span>📚 {{ store.player.value.academics }}</span>
    <span class="text-white/40">|</span>
    <span>💬 {{ store.player.value.social }}</span>
    <span class="text-white/40">|</span>
    <span>🏫 {{ store.player.value.club }}</span>
  </div>
</template>

<script setup lang="ts">
import { useChatStore } from '../store';

const store = useChatStore();

const energyColor = computed(() => {
  const e = store.player.value.energy;
  if (e > 60) return 'text-green-400';
  if (e > 30) return 'text-yellow-400';
  return 'text-red-400';
});
</script>
