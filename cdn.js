// icon:https://github.com/google/material-design-icons
const cdn = {
  // 开发环境
  dev: {
      css: [
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://unpkg.com/muse-ui/dist/muse-ui.css',
        // 'https://unpkg.com/muse-ui-loading/dist/muse-ui-loading.all.css'
      ],
      js: []
  },
  // 生产环境
  build: {
      css: [
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://unpkg.com/muse-ui/dist/muse-ui.css',
        // 'https://unpkg.com/muse-ui-loading/dist/muse-ui-loading.all.css'
      ],
      js: [
        'https://lib.baomitu.com/vue/2.6.6/vue.min.js',
        'https://lib.baomitu.com/vue-router/3.0.1/vue-router.min.js',
        'https://lib.baomitu.com/vuex/3.0.1/vuex.min.js',
        'https://lib.baomitu.com/axios/0.18.0/axios.min.js',
        'https://unpkg.com/muse-ui/dist/muse-ui.js',
        'https://unpkg.com/muse-ui-message/dist/muse-ui-message.js',
        'https://unpkg.com/muse-ui-toast/dist/muse-ui-toast.js',
        // 'https://unpkg.com/muse-ui-loading/dist/muse-ui-loading.js'
      ]
  }
}
/**
 * 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)

 * package：全局变量
 */
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'muse-ui': 'MuseUI',
  'muse-ui-message': 'MuseUIMessage',
  'muse-ui-toast': 'MuseUIToast',
  // 'muse-ui-loading': 'MuseUILoading'
}

exports.externals = externals
exports.cdn = cdn
