import axios from 'axios'
import { message as Message,Modal  } from 'ant-design-vue';
import store from '@/store'

function getToken(){
    return 'aaa'
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, 
  timeout: 5000 
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store) {
      config.headers['token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data

    // if the custom code is not 20000, it is judged as an error.
    if (res.code !== 200) {
      Message.error(res.msg)

      // 50008: Illegal token; 50012: Other clients logged in; 50014: Token expired;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        Modal.confirm({
            title: "提示",
            content:"登录信息过期，请重新登录",
            type: 'warning',
            onOk(){
                console.log("确认")
            },
            onCancel(){

            }
            })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message.error(error);
    return Promise.reject(error)
  }
)

export default service