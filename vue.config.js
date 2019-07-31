// vue.config.js
// 启用GZip压缩
const CompressionPlugin = require('compression-webpack-plugin');
const {cdn, externals} = require('./cdn')
module.exports = {
  // options...
  publicPath: process.env.VUE_APP_BASE_URL,
  // outputDir: 'wechat',
  productionSourceMap: false,
  
  css: {
    loaderOptions: {
      sass: {
        // 会在所有的sass文件添加相同的代码，变量，mixins之类的，否则假设有20个文件被loader处理就有20个被导入，批量导入
        // 但在被import的文件里面不会的
        data: `@import '@/assets/scss/variable.scss';`
      },
    }
  },


  devServer: {
    proxy: {
      '/wechatServer': {
        target: process.env.API,
        ws: true,
        changeOrigin: true,
        pathRewrite: { // 改变路径重定向
          '^/wechatServer': process.env.IS_DEV === 'true' ? '/wechat' : '/wechatServer',
        },
      },
      
    }
  },

  configureWebpack: (config) => {
    

    if (process.env.NODE_ENV === 'production') {
      Object.assign(config, {
        externals: externals
      })
      
      // 干掉console.log:https://juejin.im/post/5c84b709e51d4578ca71dde4#heading-0
      config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
      config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
      config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']

      config.plugins = [
        ...config.plugins,
        new CompressionPlugin({
          filename: '[path].gz[query]',
          algorithm: 'gzip',
          test: new RegExp('\\.(' + ['js', 'css'].join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8,
          cache: true
        }),
      ]
    }    
  },


  chainWebpack: (config)=> {
    // 对vue-cli内部的 webpack 配置进行更细粒度的修改。
    // 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
    config.plugin('html').tap(args => {
      if (process.env.NODE_ENV === 'production') {
          args[0].cdn = cdn.build
      } else {
        args[0].cdn = cdn.dev
      }
      return args
    })
  }
}