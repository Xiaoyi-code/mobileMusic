import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// // 引入vant3里button组件
// import { Button } from 'vant';

// 引入自己封装的vant组件
import getVant from "./plugins"

const app = createApp(App)
getVant(app)
app.use(store)
app.use(router).mount('#app')

