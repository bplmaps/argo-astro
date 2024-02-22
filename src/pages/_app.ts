import type { App } from 'vue';
import VueCryptojs from 'vue-cryptojs';

export default (app: App) => {
  app.use(VueCryptojs);
};