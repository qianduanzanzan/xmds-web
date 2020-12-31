<template>
  <a-menu
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    theme="dark"
    :inlineCollapsed="collapsed"
    class="leftMenu"
  >
    <div class="menu-header"><HomeOutlined />小明社区</div>
  </a-menu>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import {
  PieChartOutlined,
  MailOutlined,
  DesktopOutlined,
  InboxOutlined,
  AppstoreOutlined,
  HomeOutlined,
} from "@ant-design/icons-vue";
export default defineComponent({
  name: "leftMenu",
  components: {
    // PieChartOutlined,
    // MailOutlined,
    // DesktopOutlined,
    // InboxOutlined,
    // AppstoreOutlined,
    HomeOutlined,
  },
  data() {
    return {
      collapsed: false,
    };
  },
  // methods: {
  //   changeMenu() {
  //     this.collapsed = !this.collapsed;
  //   },
  // },
});
</script>

<style lang="scss" scoped>
// .leftMenu {
//   height: calc(100% - 60px);
// }
.menu-header {
  height: 56px;
  width: 100%;
  line-height: 60px;
  color: #fff;
  font-size: 24px;
  //   background-color: red;
}
</style>
