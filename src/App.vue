<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store/index";
import { checkLogin } from "@/api/login";

export default defineComponent({
  // async setup(){
  //   if((store.state as any).user.token == ""){
  //     const token = localStorage.getItem('token')
  //     const res = await checkLogin({token:token})
  //     if(res.data){
  //       store.commit("user/SET_USER_INFO", res.data);
  //     }
  //   }
  // }
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;
}
</style>
