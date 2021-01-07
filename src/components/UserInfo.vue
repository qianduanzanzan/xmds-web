<template>
    <div>
        <input type="text">
    </div>
</template>

<script lang="ts">
import { defineComponent,getCurrentInstance } from "vue";
import {getUserInfoById} from '../api/userInfo'
import store from '@/store'
export default defineComponent({
    name:'userInfo',
    data() {
        return {
            userInfo:{}
        }
    },
    async setup(){
        const userInfo = await getUserInfoById({id:(store.state as any).user.id})
        const a = getCurrentInstance() as any;
        console.log(a,"asdddddddddddd")
        // if(userInfo.data.id){
        //     data.userInfo = userInfo.data
        // }
    }
})
</script>