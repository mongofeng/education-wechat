import Vue from 'vue'
import './cube-ui';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/scss/index.scss';

import 'muse-ui-message/dist/muse-ui-message.css';
import 'muse-ui/dist/muse-ui.css';

import Message from 'muse-ui-message';
import MuseUI from 'muse-ui';
import Toast from 'muse-ui-toast';
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
