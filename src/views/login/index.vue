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
import { login, checkLogin } from "@/api/login";
import { setToken, setUserInfo, removeToken } from "@/utils/auth";
import { onMounted, getCurrentInstance } from "vue";
import { message } from "ant-design-vue";
import store from "@/store/index";

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
  setup() {
    const token = localStorage.getItem("token");
    const userInfo: any = JSON.parse(
      localStorage.getItem("userInfo") as string
    );
    const { ctx } = getCurrentInstance() as any;
    if (token && userInfo) {
      checkLogin(token)
        .then((res: any) => {
          if (
            userInfo.account == res.data.account &&
            userInfo.userName == res.data.userName
          ) {
            store.commit("user/SET_USER_INFO", res.data);
            ctx.$router.push({ path: "/" });
          } else {
            removeToken();
          }
        })
        .catch((e: any) => {
          removeToken();
          // console.log(e);
          // message.error("未知错误");
        });
    } else {
      removeToken();
    }
  },
  methods: {
    login() {
      login(this.loginForm)
        .then((res: any) => {
          setToken(res.data.token);
          const data: any = res.data;
          setUserInfo(data);
          store.commit("user/SET_USER_INFO", data);
          console.log(store);
          this.$router.push({ path: "/" });
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
