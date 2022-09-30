import { Swipe, SwipeItem, Button, Popup, Sticky } from 'vant';
// 对vant里的按需引入，需要每次都调用app.use(xxx),比较麻烦，
// 因此在此文件对vant里引入的组件进行封装，放入数组plugins中，用getVant函数去自动引入
let plugins = [
  Swipe, SwipeItem, Button, Popup, Sticky
]
export default function getVant (app) {
  plugins.forEach((item) => {
    return app.use(item)
  })
}