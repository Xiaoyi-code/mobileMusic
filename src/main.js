import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/base.less'

// // 引入vant3里button组件
// import { Button } from 'vant';
import { Lazyload } from 'vant'

// 引入自己封装的vant组件
import getVant from "./plugins"

const app = createApp(App)
getVant(app)
app.use(store)
app.use(router).mount('#app')
// 注册时可以配置额外的选项
app.use(Lazyload, {
  lazyComponent: true,
  // 可以通过配置loading来设置图片还未加载好之前的占位图片
  loading: require('./assets/loading.png')
});

