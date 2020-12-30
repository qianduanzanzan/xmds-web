import axios from "axios";
import { message as Message, Modal } from "ant-design-vue";
// import {getToken} from './auth'
import store from "@/store/index";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

// request interceptor
service.interceptors.request.use(
  (config) => {
    // config = Object.assign({}, config);
    const token: string | null = (store.state as any).user.token;
    if (token) {
      config.headers["token"] = token;
      // config.data['jzlsh'] = pnParam
    }
    const contentType = config.headers["Content-Type"];
    config.headers["Content-Type"] = contentType
      ? contentType
      : "application/x-www-form-urlencoded";
    //form提交
    if (config.headers["Content-Type"] == "application/x-www-form-urlencoded") {
      let ret = "";
      for (const it in config.data) {
        const y = config.data[it];
        if (
          y === "null" ||
          y === null ||
          y === "" ||
          typeof y === "undefined" ||
          (y instanceof Object && Object.keys(y).length == 0)
        ) {
          console.log(1)
        } else {
          ret +=
            encodeURIComponent(it) +
            "=" +
            encodeURIComponent(config.data[it]) +
            "&";
        }
      }
      config.data = ret;
    }
    //json提交
    if (config.headers["Content-Type"] == "application/json") {
      for (const it in config.data) {
        const y = config.data[it];
        if (
          y === "null" ||
          y === null ||
          y === "" ||
          typeof y === "undefined" ||
          (y instanceof Object && Object.keys(y).length == 0)
        ) {
          delete config.data[it];
        }
      }
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// response interceptor
service.interceptors.response.use(
  (response) => {
    const res = response.data;

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message.error(res.msg);

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        Modal.confirm({
          title: "提示",
          content: "登录信息过期，请重新登录",
          type: "warning",
          onOk() {
            console.log("确认");
          },
          onCancel() {
            console.log(1);
          },
        });
      }
      return Promise.reject(new Error(res.message || "Error"));
    } else {
      return res;
    }
  },
  (error) => {
    console.log("err" + error); // for debug
    Message.error(error);
    return Promise.reject(error);
  }
);

export default service;
