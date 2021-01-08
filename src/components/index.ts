import imgManage from './ImgManage.vue'
import userInfo from './UserInfo.vue'
import {app} from '../main'
app.component('imgManage', imgManage)
app.component('info', userInfo)


// export default {
//     'imgManage':imgManage,
//     'info':userInfo
// }