import { createRouter, createWebHistory } from 'vue-router'
import RecommendView from '../views/Recommend.vue'
import store from '@/store/index.js'

const routes = [
  {
    path: '/',
    name: 'recommend',
    component: RecommendView
  },
  //首页路由
  {
    path: '/recommend',
    name: 'Recommend',
    component: () => import(/* webpackChunkName: "Recommend" */ '../views/Recommend.vue')
  },
  //排行榜路由
  {
    path: '/rank',
    name: 'Rank',
    component: () => import(/* webpackChunkName: "Rank" */ '../views/Rank.vue')
  },
  // 搜索歌曲页面路由
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "Search" */ '../views/Search.vue'),
  },
  // 登陆页面路由
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue'),
  },
  // 个人中心页面路由
  {
    path: '/infoUser',
    name: 'InfoUser',
    component: () => import(/* webpackChunkName: "InfoUser" */ '../views/InfoUser.vue'),
    beforeEnter: (to, from, next) => {
      // 登陆后才能进入个人中心页面
      if (store.state.isLogin || store.state.token || localStorage.getItem("token")) {
        next()
      } else {
        next('Login')
      }
    }
  },
  // 歌单详情路由
  {
    path: '/itemMusic',
    name: 'ItemMusic',
    component: () => import(/* webpackChunkName: "ItemMusic" */ '../views/ItemMusic.vue'),
    props (route) {
      // console.log(route)
      return {
        id: route.query.id,
      }
    }
  }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
// 全局路由守卫，进入登陆页就隐藏底部组件
router.beforeEach((to, from) => {
  if (to.name == 'Login') {
    store.state.isFooterMusic = false
  } else {
    store.state.isFooterMusic = true
  }
})
export default router
