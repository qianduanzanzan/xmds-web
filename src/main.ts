import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import "@/router/navigationGuards";
// import components from './components'

export const app = createApp(App)
// const webSql = require('@/utils/webSql')
app.use(store)
app.use(router)
app.use(Antd)
// app.use(webSql)
// Object.keys(components).forEach((key:string) => {
//   app.component(key,(components as any)[key])
// })
app.mount("#app");
require('./components/index')
require('@/utils/webSql')

store.dispatch('category/getCategory')
