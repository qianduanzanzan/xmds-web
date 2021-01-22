<template>
  <a-menu
    mode="inline"
    theme="dark"
    :inlineCollapsed="collapsed"
    class="leftMenu"
  >
    <div class="menu-header"><HomeOutlined />小明电商</div>
    <a-menu-item :class="actived && item.id == actived.id?'selected':''" class="aaa" v-for="item in menu" :key="item.id" @click="goto(item)">{{item.name}}</a-menu-item>
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
    },
    actived(){
      return (store.state as any).tags.actived
    }
  },
  methods: {
    // changeMenu() {
    //   this.collapsed = !this.collapsed;
    // },
    goto(item:any){
      store.commit('tags/ADD_TAG',item)
      this.$router.push({path: `/${item.route}`})
    }
  },
});
</script>

<style lang="scss" scoped>
.menu-header {
  height: 61px;
  width: 100%;
  line-height: 60px;
  color: #fff;
  font-size: 24px;
}
.ant-menu-item-selected{
  background: transparent !important;
  color: rgba(255, 255, 255, 0.65) !important;
}
.selected{
  color: #fff !important;
  background-color: #1890ff !important;
}
</style>
