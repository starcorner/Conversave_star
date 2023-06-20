import axios from "axios";
import { MessageBox, Message } from "element-ui";
// import store from '@/store'

axios.defaults.withCredentials = false;
const service = axios.create({
  baseURL: "",
  timeout: 40000 // request timeout
});
// 自动生成transid
// function gorin() {
//   function S4() {
//     return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
//   }
//   return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4());
// }
// request interceptor
service.interceptors.request.use(
  config => {
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    config.headers["Authorization"] =
      "Bearer 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";
    return config;
  },
  error => {
    // do something with request error
    console.log(error); // for debug
    MessageBox.alert(error, "系统提示");
    Promise.reject(error);
  }
);
// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data;
    console.log("响应的数据为:", res);
    return res;
  },
  error => {
    if (error.response === undefined && error.response !== 200) {
      let message = "请求失败，请稍后再试";
      Message({
        message: message + error.response || "Error",
        type: "error",
        duration: 5 * 1000
      });

      return Promise.reject(new Error(error.response));
    }
    if (error.response === 429 && error.response === 403) {
      let message = "请求太频繁，请稍等几分钟后chong shi";
      Message({
        message: message + error.response || "Error",
        type: "error",
        duration: 5 * 1000
      });

      return Promise.reject(new Error(error.response));
    }
    return Promise.reject(error);
  }
);

export default service;
