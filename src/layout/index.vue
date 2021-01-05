<template>
  <a-layout class="layout">
    <a-layout-sider class="left-menu"><left-menu ref="menu"></left-menu></a-layout-sider>
    <a-layout>
      <a-layout-header class="header-navbar">
        <navbar></navbar>
      </a-layout-header>
      <a-layout-header class="header-tags">
        <tags-view></tags-view>
      </a-layout-header>
      <a-layout-content>
        <main-view></main-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import leftMenu from "./components/leftMenu.vue";
import navbar from "./components/navbar.vue";
import tagsView from "./components/tagsView.vue";
import mainView from "./components/mainView.vue";
export default defineComponent({
  name: "layout",
  components: {
    leftMenu,
    navbar,
    tagsView,
    mainView,
  },
//   methods:{
//       changeMenu(){
//           (this.$refs.menu as any).changeMenu();
//       }
//   }
});
</script>

<style lang="scss" scoped>
.layout{
    width: 100%;
    height: 100%;
}
.left-menu{
    height: 100%;
    width: auto !important;
}

::v-deep .ant-layout-header{
    padding: 0;
    &.header-navbar{
        height: 65px;
    }
    &.header-tags{
        height: 40px;
        background: transparent;
        margin-bottom: 8px;
    }
}
</style>
