// vue.config.js
module.exports = {
  // options...
  publicPath: process.env.VUE_APP_BASE_URL,
  outputDir: 'wechat',
  css: {
    loaderOptions: {
      sass: {
        // 会在所有的sass文件添加相同的代码，变量，mixins之类的，否则假设有20个文件被loader处理就有20个被导入，批量导入
        // 但在被import的文件里面不会的
        data: `@import '@/assets/scss/variable.scss';`
      },
    }
  }
}