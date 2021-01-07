<template>
        11111111
        <input type="text" v-model="aaa">
        <button @click="getInfo">a</button>
        <div class="aaaa"><user-info>asdasdasd</user-info></div>
        
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {getUserInfoById} from '@/api/userInfo'
import store from '@/store'
export default defineComponent({
    name:'test',
    data() {
        return {
            aaa:''
        }
    },
    methods:{
        async getInfo(){
            const userInfo = await getUserInfoById({id:0})
            console.log(userInfo)
        }
    }
})
</script>
<style lang="scss">
    .aaaa{
        width: 100px;
        height: 100px;
        background: red;
    }
</style>