import axios from "axios";
import { message as Message, Modal } from "ant-design-vue";
import store from "@/store/index";
import router from "../router/index";
import { removeToken } from "@/utils/auth";
// import { checkLogin } from "@/api/login";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
});

// request interceptor
service.interceptors.request.use(
  async (config) => {
    let token: string | null = (store.state as any).user.token;
    if (!token) {
      token = localStorage.getItem("token");
      config.headers["token"] = token;
    } else {
      config.headers["token"] = token;
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
          console.log(1);
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
      if (typeof config.data == "object") {
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
      if (res.code == "52000" || res.code == "52001") {
        removeToken();
        // to re-login
        Modal.confirm({
          title: "提示",
          content: "登录信息过期，请重新登录",
          type: "warning",
          onOk() {
            router.push("/login");
          },
          onCancel() {
            router.push("/login");
          },
        });
      } else if(res.code == "52002"){
        removeToken();
        // to re-login
        Modal.confirm({
          title: "提示",
          content: "用户信息已修改，请重新登录",
          type: "warning",
          onOk() {
            router.push("/login");
          },
          onCancel() {
            router.push("/login");
          },
        });
      }else if(res.code == "52003"){
        removeToken();
        // to re-login
        Modal.confirm({
          title: "提示",
          content: "用户已停用，请与管理员联系",
          type: "warning",
          onOk() {
            router.push("/login");
          },
          onCancel() {
            router.push("/login");
          },
        });
      }
      if (res.code != "50007") {
        Message.error(res.msg || res.result);
      }
      return new Promise((reject: any) => {
        reject(new Error(res.message?res.message : res.result  || "Error"));
      });
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
