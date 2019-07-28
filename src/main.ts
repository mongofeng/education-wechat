import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/scss/index.scss';

/**
 * museUI插件
 */
// import 'muse-ui/dist/muse-ui.css';
// import 'muse-ui-message/dist/muse-ui-message.css';
// import 'muse-ui-loading/dist/muse-ui-loading.css'; // load css, require
import MuseUI from 'muse-ui';
import MuseUIMessage from 'muse-ui-message';
import MuseUIToast from 'muse-ui-toast';
// import MuseUILoading from 'muse-ui-loading';

import Component from 'vue-class-component';

// import getOauth2 from '@/utils/oauth2';
// getOauth2();

console.log(process.env.VUE_APP_CLEAR_STORE);

if (process.env.VUE_APP_CLEAR_STORE.toLowerCase() === 'true') {
  console.log('清除store');
  // window.localStorage.clear();
  localStorage.removeItem('openid');
  localStorage.removeItem('wechat');
}

Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);

Vue.use(MuseUIToast, {
  position: 'top',
});
Vue.use(MuseUIMessage);
Vue.use(MuseUI);

// Vue.use(MuseUILoading);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
