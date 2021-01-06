<template>
  <a-drawer
    title="个人信息"
    placement="right"
    :closable="true"
    v-model:visible="visible"
    :maskClosable="false"
    :width="400"
    :after-visible-change="afterVisibleChange"
    :destroyOnClose="true"
  >
    <img-manage v-model:imgUrl="imageUrl" url="pic/upload" />
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "userInfo",
  data() {
    return {
      visible: false,
      imageUrl:'http://xmcommunity.oss-cn-beijing.aliyuncs.com/pic/77a052fe42d5_avatar.jpg',
    };
  },
  methods: {
    afterVisibleChange(v: boolean) {
      console.log(v);
    },
    openDrawer() {
      this.visible = true;
    },
  },
});
</script>
