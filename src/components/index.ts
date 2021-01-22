import avatarManage from './AvatarManage.vue'
import userInfo from './UserInfo.vue'
import imagesManage from './ImagesManage.vue'
import {app} from '../main'

app.component('avatarManage', avatarManage)
app.component('info', userInfo)
app.component('imagesManage', imagesManage)


// export default {
//     'imgManage':imgManage,
//     'info':userInfo
// }