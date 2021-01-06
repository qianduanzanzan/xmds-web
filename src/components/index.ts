import {createApp} from "vue";
import imgManage from "./ImgManage.vue"
import App from "../App.vue";

const app = createApp(App);
//头像上传组件
app.component('ImgManage',imgManage);






app.mount('#app')