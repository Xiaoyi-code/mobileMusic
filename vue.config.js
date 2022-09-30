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
