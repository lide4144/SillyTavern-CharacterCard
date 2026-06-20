import { waitUntil } from 'async-wait-until';
import App from './App.vue';
import './global.css';

$(async () => {
  // 桥接父窗口的酒馆全局变量（代码块 iframe 环境）
  const P = window.parent as any;
  const mvu = P.Mvu || (window as any).Mvu;
  const getVars = P.getVariables || (window as any).getVariables;
  const curMsgId = P.getCurrentMessageId || (window as any).getCurrentMessageId;

  // 等待 MVU 初始化
  if (P.waitGlobalInitialized) {
    await P.waitGlobalInitialized('Mvu');
  } else if ((window as any).waitGlobalInitialized) {
    await (window as any).waitGlobalInitialized('Mvu');
  }

  // 等待变量就绪
  const msgVars = () => getVars({ type: 'message' });
  const msgId = curMsgId ? curMsgId() : 0;
  await waitUntil(() => P._?.has?.(msgVars(), 'stat_data') || (window as any)._?.has?.(msgVars(), 'stat_data'));

  createApp(App).use(createPinia()).mount('#app');
});
