import { defineMvuDataStore } from '@util/mvu';
import { Schema } from '../../schema';
import { CHARACTERS } from './characters';

export const useDataStore = defineMvuDataStore(Schema, { type: 'message', message_id: getCurrentMessageId() });

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<ChatMessage[]>([]);
  const isGenerating = ref(false);
  const streamText = ref('');

  const dataStore = useDataStore();

  const sortedCharacters = computed(() => {
    const data = dataStore.data.value;
    return [...CHARACTERS]
      .map((c) => {
        const charData = _.get(data, c.id, { 好感度: 50, 关系阶段: '陌生人', 印象: '' });
        return { ...c, affection: charData.好感度, stage: charData.关系阶段, impression: charData.印象 };
      })
      .sort((a, b) => b.affection - a.affection);
  });

  const world = computed(() => ({
    time: dataStore.data.value?.世界?.当前时间 ?? '未知时间',
    location: dataStore.data.value?.世界?.当前地点 ?? '未知地点',
    activity: dataStore.data.value?.世界?.当前活动 ?? '自由活动',
  }));

  const player = computed(() => ({
    energy: dataStore.data.value?.主角?.体力 ?? 100,
    academics: dataStore.data.value?.主角?.学业 ?? 70,
    social: dataStore.data.value?.主角?.社交评价 ?? 50,
    club: dataStore.data.value?.主角?.所属社团 ?? '无',
  }));

  async function sendMessage(text: string) {
    if (isGenerating.value || !text.trim()) return;

    messages.value.push({ role: 'user', content: text });
    isGenerating.value = true;
    streamText.value = '';

    const stopEvent = eventOn(iframe_events.STREAM_TOKEN_RECEIVED_FULLY, (streamed: string) => {
      streamText.value = streamed;
    });

    try {
      const result = await generate({ user_input: text, should_stream: true });
      const finalText = typeof result === 'string' ? result : result.content;
      messages.value.push({ role: 'assistant', content: finalText || streamText.value });
    } catch {
      if (streamText.value) {
        messages.value.push({ role: 'assistant', content: streamText.value });
      }
    } finally {
      stopEvent();
      isGenerating.value = false;
      streamText.value = '';
    }
  }

  async function sendAction(action: string) {
    await sendMessage(action);
  }

  return { messages, isGenerating, streamText, sortedCharacters, world, player, sendMessage, sendAction };
});
