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
    }
})
</script>