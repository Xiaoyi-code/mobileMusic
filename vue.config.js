const { defineConfig } = require('@vue/cli-service')
// 配置vant3组件
const { VantResolver } = require('unplugin-vue-components/resolvers');
const ComponentsPlugin = require('unplugin-vue-components/webpack');

module.exports = defineConfig({
  transpileDependencies: true,
  // 配置vant3组件
  configureWebpack: {
    plugins: [
      ComponentsPlugin({
        resolvers: [VantResolver()],
      }),
    ],
  },
  pages: {
    index: {
      entry: 'src/main.js', // 入口文件
      title: 'siyuMusic'
    }
  },
  publicPath: '/', //这个必须，引入静态资源需要从根路径引入，否则会找不到静态资源
  devServer: {
    // history模式下的url会请求到服务器端，但是服务器端并没有这一个资源文件，就会返回404，所以需要配置这一项
    historyApiFallback: {
      index: '/index.html' //与output的publicPath
    },
  },
  //开启代理服务器（方式一）
  // devServer: {
  //   proxy: 'http://localhost:3000'
  // },
  // devServer: {
  //   proxy: {
  //     '/api': {// 匹配所有以 '/api'开头的请求路径
  //       target: 'http://localhost:3000',// 代理目标的基础路径
  //       // target: 'http://127.0.0.1:3000',
  //       changeOrigin: true,
  //       pathRewrite: { '^/api': '' }
  //     },
  //   }
  // }
})
