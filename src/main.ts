import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/scss/index.scss';

import 'muse-ui-message/dist/muse-ui-message.css';
import 'muse-ui/dist/muse-ui.css';

import Message from 'muse-ui-message';
import MuseUI from 'muse-ui';
import Toast from 'muse-ui-toast';
import Component from 'vue-class-component';

import getOauth2 from '@/utils/oauth2';
getOauth2();

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

Vue.use(Toast, {
  position: 'top',
});
Vue.use(Message);
Vue.use(MuseUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
