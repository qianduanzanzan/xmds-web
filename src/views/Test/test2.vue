<template>
  <img-manage v-model:imgUrl="imageUrl" url="pic/upload" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import ImgManage from "@/components/ImgManage.vue";
export default defineComponent({
  // components: { ImgManage },
  name: "test2",
  data() {
    return {
      imageUrl:"http://xmcommunity.oss-cn-beijing.aliyuncs.com/pic/77a052fe42d5_avatar.jpg",
    }
  },
})
</script>
