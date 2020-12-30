<template>
  <a-layout class="layout">
    <a-layout-sider class="h100"><left-menu></left-menu></a-layout-sider>
    <a-layout>
      <a-layout-header>
        <navbar></navbar>
      </a-layout-header>
      <a-layout-header>
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
});
</script>

<style lang="scss" scoped>
.layout{
    width: 100%;
    height: 100%;
}
.h100{
    height: 100%;
}

::v-deep .ant-layout-header{
    height: 48px;
    padding: 0;
    background-color: #fff;
}
</style>
