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
    <a-row justify="center">
        <info v-bind="$attrs" />
    </a-row>
    
  </a-drawer>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  name: "userInfo",
  data() {
    return {
      visible: false,
    };
  },
  methods: {
    afterVisibleChange(v: boolean) {
      if(!v){
        this.$emit('closeDrawer')
      }
    },
    openDrawer() {
      this.visible = true;
    },
  },
});
</script>

<style lang="scss" scoped>
</style>