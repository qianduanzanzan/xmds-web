<template>
    <div>
        11111111
        <input type="text" v-model="aaa">
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name:'test',
    data() {
        return {
            aaa:''
        }
    },
})
</script>