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
          <a-avatar v-else :size="48">{{
            userInfo.userName[userInfo.userName.length - 1]
          }}</a-avatar>
        </a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <div @click.stop="logout">退出登录</div>
            </a-menu-item>
            <a-menu-item>
              <div @click.stop="openUserInfo">个人信息</div>
            </a-menu-item>
            <a-menu-item>
              <div @click.stop="editPassword">修改密码</div>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </a-row>
  </a-row>
  <user-info-drawer :id="userInfo.id" ref="userInfoDrawer" />
  <a-modal
    title="修改密码"
    v-model:visible="visible"
    :confirm-loading="confirmLoading"
    @ok="handleOk"
  >
    <a-form
      class="user-info-form"
      ref="ruleForm"
      :model="passwordForm"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :rules="rules"
    >
      <a-form-item ref="oldPassword" label="旧密码:" name="oldPassword">
        <a-input
          v-model:value="passwordForm.oldPassword"
          type="password"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item ref="newPassword" label="新密码:" name="newPassword">
        <a-input
          v-model:value="passwordForm.newPassword"
          type="password"
          autocomplete="off"
        />
      </a-form-item>
      <a-form-item ref="confirmNewPWD" label="确认密码:" name="confirmNewPWD">
        <a-input
          v-model:value="passwordForm.confirmNewPWD"
          type="password"
          autocomplete="off"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { removeToken } from "@/utils/auth";
import userInfoDrawer from "./userInfoDrawer.vue";
// import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons-vue";
import store from "@/store/index";
import router from "../../router/index";
import { logout } from "@/api/login";
import { changePassword } from "@/api/userInfo";
import { message as Message, Modal } from "ant-design-vue";
export default defineComponent({
  name: "navbar",
  components: {
    userInfoDrawer,
    // MenuFoldOutlined,
    // MenuUnfoldOutlined,
  },
  data() {
    // console.log(this.passwordForm);
    const validatePass = (_rule: any, value: any, _callback: any) => {
      if (value == "") {
        return Promise.reject("请再次输入密码");
      } else if (value != (this as any).passwordForm.newPassword) {
        return Promise.reject("两次输入的密码不一致");
      } else {
        return Promise.resolve();
      }
    };
    return {
      menuIsOpen: true,
      visible: false,
      confirmLoading: false,
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
      passwordForm: {
        oldPassword: "",
        newPassword: "",
        confirmNewPWD: "",
      },
      rules: {
        oldPassword: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        newPassword: [{ required: true, message: "请输入新密码", trigger: "blur" }],
        confirmNewPWD: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  computed: {
    userInfo() {
      return (store.state as any).user;
    },
  },
  methods: {
    logout() {
      logout().then(() => {
        removeToken();
        store.commit("user/REMOVE_USER_INFO");
        store.commit("permission/REMOVE_ROUTERS");
        router.push("/login");
      });
    },
    openUserInfo() {
      (this.$refs.userInfoDrawer as any).openDrawer();
    },
    editPassword() {
      this.visible = true;
    },

    handleOk() {
      this.confirmLoading = true;
      (this.$refs.ruleForm as any)
        .validate()
        .then(() => {
          changePassword(
            Object.assign(
              { id: (store.state as any).user.id },
              this.passwordForm
            )
          ).then((res: any) => {
            this.confirmLoading = false;
            if (res.code == 200) {
              removeToken();
              // to re-login
              Modal.confirm({
                title: "提示",
                content: "用户密码已修改，请重新登录",
                type: "warning",
                onOk() {
                  router.push("/login");
                },
                onCancel() {
                  router.push("/login");
                },
              });
            }
          });
        })
        .catch((error: any) => {
          this.confirmLoading = false;
          console.log("error", error);
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
