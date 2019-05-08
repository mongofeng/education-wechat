import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/scss/index.scss';
import MuseUI from 'muse-ui';
import 'muse-ui/dist/muse-ui.css';

Vue.use(MuseUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
