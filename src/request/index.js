import axios from 'axios';
// 不同环境不同地址
const apis = {
  production: 'http://1.117.58.238:3000',//线上（生产环境）
  development: 'http://localhost:3000',  //本地（开发环境）
  accessHomeData: 'http://www.xmyxapp.com' // 其他api
}
// ajax请求设置
let service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? apis.production : apis.development,
  timeout: 3000
})
export default service