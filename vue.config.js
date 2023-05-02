const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  //配置代理
  devServer: {
    proxy: 'http://localhost:5252'  //后端接口
  },
  transpileDependencies: true,
  lintOnSave: false,


  // sass的预处理
  css: {
    loaderOptions: {
      // 加载scss之前 我先执行什么代码
      // sass-loader 版本8  用prependData  v8以上additionalData
      sass: {
        additionalData: `
        @import "@/assets/scss/variable.scss";
        @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },

  // svg的配置
  chainWebpack(config) {
    // 设置 svg-sprite-loader
    // 将处理svg的loader添加exclude,表示不需要使用该loader处理icon。
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons') // 添加一个新的loader  匹配src/icons内的 svg文件  
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({// 指定symbolId 不指定则默认为svg文件名 识别到icon-user 回去找 user.svg
        symbolId: 'icon-[name]'
      })
      .end()
  }
})
