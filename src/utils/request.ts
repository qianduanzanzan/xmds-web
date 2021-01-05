import axios from "axios";
import { message as Message, Modal } from "ant-design-vue";
import store from "@/store/index";
import router from "../router/index";
import { removeToken } from "@/utils/auth";
import { checkLogin } from "@/api/login";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

// request interceptor
service.interceptors.request.use(
  async (config) => {
    // config = Object.assign({}, config);
    
    // if((store.state as any).user.token == ""){
    //   store.commit("user/SET_USER_INFO",JSON.parse(localStorage.getItem("userInfo") as string))
    // }
    const token: string | null = (store.state as any).user.token;
    if (token) {
      // const res = await checkLogin({token:token})
      // store.commit("user/SET_USER_INFO", res.data);
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
      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === "52000" || res.code === "52001" || res.code === "52002") {
        removeToken()
        // to re-login
        Modal.confirm({
          title: "提示",
          content: "登录信息过期，请重新登录",
          type: "warning",
          onOk() {
            router.push('/login')
          },
          onCancel() {
            router.push('/login')
          },
        });
      }else{
        Message.error(res.msg);
      }
      return new Promise((reject:any) => {
        reject(new Error(res.message || "Error"))
      })
      // return Promise.reject(new Error(res.message || "Error"));
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
