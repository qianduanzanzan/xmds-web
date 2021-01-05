<template>
  <a-row class="navbar" align="middle" justify="end">
    <!-- <a-button @click="changeMenu()" type="link" size="large" class="menuBtn">
      <MenuFoldOutlined v-show="menuIsOpen" />
      <MenuUnfoldOutlined v-show="!menuIsOpen" />
    </a-button> -->
    <a-row class="header-user-info" align="middle">
      <a-dropdown>
        <a class="ant-dropdown-link" @click="(e) => e.preventDefault()">
          <span class="header-user-name">{{ userInfo.userName }}</span>
          <a-avatar v-if="userInfo.avatar" :src="userInfo.avatar" :size="48" />
          <a-avatar v-else :size="48">{{ userInfo.userName[userInfo.userName.length-1] }}</a-avatar>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <div @click.stop="logout">退出登录</div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-row>
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { removeToken } from "@/utils/auth";
// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import store from "@/store/index";
import router from "../../router/index";
import { logout } from "@/api/login";
export default defineComponent({
  name: "navbar",
  components: {
    // MenuFoldOutlined,
    // MenuUnfoldOutlined,
  },
  data() {
    return {
      menuIsOpen: true,
    };
  },
  computed: {
    userInfo() {
      return (store.state as any).user;
    },
  },
  methods: {
    logout() {
      logout({ token: this.userInfo.token }).then(() => {
        removeToken();
        store.commit("user/REMOVE_USER_INFO");
        store.commit("permission/REMOVE_ROUTERS");
        router.push("/login");
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.navbar {
  height: 65px;
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
