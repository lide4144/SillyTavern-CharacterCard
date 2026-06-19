import { mountStreamingMessages } from '@util/streaming';
import { createApp } from 'vue';
import App from './App.vue';
import './global.css';

$(() => {
  const { unmount } = mountStreamingMessages(() => createApp(App).use(createPinia()), { host: 'div' });
  $(window).on('pagehide', () => unmount());
});
