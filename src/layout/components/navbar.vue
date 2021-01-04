<template>
  <a-row class="navbar" align="middle" justify="end">
    <!-- <a-button @click="changeMenu()" type="link" size="large" class="menuBtn">
      <MenuFoldOutlined v-show="menuIsOpen" />
      <MenuUnfoldOutlined v-show="!menuIsOpen" />
    </a-button> -->
    <a-row class="header-user-info" align="middle">
      <span class="header-user-name">{{ userInfo.userName }}</span>
      <a-avatar
        :src="
          userInfo.avatar ||
            'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=148200059,2148086178&fm=111&gp=0.jpg'
        "
        :size="48"
      />
    </a-row>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import store from "@/store/index";
export default defineComponent({
  name: "navbar",
  components: {
    // MenuFoldOutlined,
    // MenuUnfoldOutlined,
  },
  data() {
    return {
      menuIsOpen: true,
      userInfo: (store.state as any).user,
    };
  },
  // methods:{
  //   changeMenu(){
  //     this.menuIsOpen = !this.menuIsOpen
  //     this.$emit("changeMenu")
  //   }
  // }
});
</script>

<style lang="scss" scoped>
.navbar {
  height: 60px;
  .header-user-info {
    margin: 0 10px 0 0;
    .header-user-name {
      font-size: 18px;
      color: #fff;
      margin: 0 8px 0 0;
    }
  }

  .menuBtn {
    color: #fff;
    font-size: 24px;
  }
}
</style>
