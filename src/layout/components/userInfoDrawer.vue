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
    <a-row justify="center" align="middle">
      <a-col>
        <img-manage v-model:imgUrl="imageUrl" url="pic/upload" />
      </a-col>
      <div><user-info class="aaaa" ref="aaa">asdasdasd</user-info></div>
    </a-row>
    
    asdasdasdas
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
      if(v){
        console.log(v)
      }
    },
    openDrawer() {
      this.visible = true;
    },
    aacca(){
      // (this.$refs.aaa as any).aaa()
      // console.log((this.$refs as any))
      console.log(document.getElementsByClassName('aaaa'))
    }
  },
});
</script>

<style lang="scss" scoped>
  .aa{
    position: relative;
    z-index: 1000;
    display: block;
  }
  .aaaa{
    width: 100px;
    height: 100px;
    background: red;
  }
</style>