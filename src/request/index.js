import axios from 'axios';
let service = axios.create({
  baseURL: "http://localhost:3000",
  // baseURL: "http://192.168.32.162:3000",
  // baseURL: "http://1.117.58.238:8888/api",
  timeout: 3000
})
export default service