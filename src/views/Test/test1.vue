<template>
    <div>
        asdasdasd
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store/index";
export default defineComponent ({
    async setup(){
        await store.dispatch("permission/getRoute",{menuName:'测试'})
        console.log((store.state as any).permission.routers)
    }
})
</script>