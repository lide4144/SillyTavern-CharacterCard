<template>
  <div class="flex h-full w-full flex-col" style="height: 100dvh; max-height: 100dvh;">
    <TopBar />
    <div class="flex flex-1 overflow-hidden">
      <CharacterPanel />
      <ChatArea />
    </div>
    <InputArea />
  </div>
</template>

<script setup lang="ts">
import TopBar from './components/TopBar.vue';
import CharacterPanel from './components/CharacterPanel.vue';
import ChatArea from './components/ChatArea.vue';
import InputArea from './components/InputArea.vue';
</script>
