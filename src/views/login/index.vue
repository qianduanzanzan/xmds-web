<template>
  <div>
    <a-form :model="loginForm">
      <a-form-item label="账号">
        <a-input v-model:value="loginForm.account" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input
          v-model:value="loginForm.password"
          type="password"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button @click="login()" type="primary">
          登录
        </a-button>
        <a-button @click="reset()" type="primary">
          重置
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { login } from "@/api/login";
import { setToken, setUserInfo, removeToken } from "@/utils/auth";
import { onMounted, getCurrentInstance } from "vue";
import { message } from "ant-design-vue";
import store from "@/store/index";
import md5 from "js-md5";
import router from "@/router/index";

export default defineComponent({
  name: "Login",
  data() {
    return {
      loginForm: {
        account: "",
        password: "",
      },
      isRemenber: false,
    };
  },
  methods: {
    login() {
      login({
        account: this.loginForm.account,
        password: md5(this.loginForm.password),
      })
        .then(async (res: any) => {
          setToken(res.data.token);
          const data: any = res.data;
          setUserInfo(data);
          store.commit("user/SET_USER_INFO", data);
          await store.dispatch("permission/getRoute", {
            id: res.data.id,
          });
          const routers = (store.state as any).permission.routers.map(
            (item: any) => {
              return {
                path: `/${item.routeName}`,
                name: item.routeName,
                component: () =>
                  import(
                    /* webpackChunkName: item.routeName */ `@/${item.filePath}`
                  ),
                meta: {
                  nameZh: item.menuName,
                },
              };
            }
          );
          const rootRouter: any = {
            path: `/`,
            name: "layout",
            component: () =>
              import(/* webpackChunkName: "about" */ "@/layout/index.vue"),
            meta: {
              nameZh: "主页",
            },
            children: [],
          };
          rootRouter.children = routers;
          router.addRoute(rootRouter);
          // next({ ...to, replace: true });
          if (this.$route.query && (this.$route.query as any).redirect) {
            this.$router.push((this.$route.query as any).redirect);
          } else {
            this.$router.push("/");
          }
        })
        .catch((error: any) => {
          console.log(error);
        });
    },
    reset() {
      console.log(1);
    },
  },
});
</script>
