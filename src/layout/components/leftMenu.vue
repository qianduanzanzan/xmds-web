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
    <a-menu-item v-for="item in menu" :key="item.id" @click="goto(item.route)">{{item.name}}</a-menu-item>
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
import store from "@/store/index";
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
  computed:{
    menu(){
      return (store.state as any).permission.routers.map((item:any) => {
        return {
          id: item.id,
          name: item.menuName,
          route: item.routeName
        }
      })
    }
  },
  methods: {
    // changeMenu() {
    //   this.collapsed = !this.collapsed;
    // },
    goto(route:string){
      this.$router.push({path: `/${route}`})
    }
  },
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
