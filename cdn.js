const cdn = {
  // 开发环境
  dev: {
      css: [
        'https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css',
        'https://unpkg.com/muse-ui/dist/muse-ui.css'
      ],
      js: []
  },
  // 生产环境
  build: {
      css: [
        'https://cdn.bootcss.com/material-design-icons/3.0.1/iconfont/material-icons.css',
        'https://unpkg.com/muse-ui/dist/muse-ui.css'
      ],
      js: [
        'https://lib.baomitu.com/vue/2.6.6/vue.min.js',
        'https://lib.baomitu.com/vue-router/3.0.1/vue-router.min.js',
        'https://lib.baomitu.com/vuex/3.0.1/vuex.min.js',
        'https://lib.baomitu.com/axios/0.18.0/axios.min.js',
        'https://unpkg.com/muse-ui/dist/muse-ui.js',
        'https://unpkg.com/muse-ui-message/dist/muse-ui-message.js',
        'https://unpkg.com/muse-ui-toast/dist/muse-ui-toast.js'
      ]
  }
}
/**
 * 前面的是名：后面的是变量
 */
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  'muse-ui': 'MuseUI',
  'muse-ui-message': 'Message',
  'muse-ui-toast': 'Toast'
}

exports.externals = externals
exports.cdn = cdn