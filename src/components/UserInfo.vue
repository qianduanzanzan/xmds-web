<template>
  <a-row style="width: 100%" justify="center">
    <avatar-manage v-model:imgUrl="userInfo.avatar" />
    <a-form
      class="user-info-form"
      ref="ruleForm"
      :model="userInfo"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item ref="name" label="用户账号:" name="name">
        <a-input v-model:value="userInfo.account" :disabled="true" />
      </a-form-item>
      <a-form-item ref="name" label="用户名称:" name="name">
        <a-input v-model:value="userInfo.userName" />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 24 }">
        <a-row justify="center">
          <a-button type="primary" @click="onSubmit">
            确定
          </a-button>
        </a-row>
      </a-form-item>
    </a-form>
  </a-row>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from "vue";
import { getUserInfoById, updateUserInfo } from "../api/userInfo";
import store from "@/store";
import { message } from "ant-design-vue";
import { removeToken } from "@/utils/auth";
import { Modal } from "ant-design-vue";
import router from "@/router/index";
export default defineComponent({
  name: "userInfo",
  data() {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 19 },
    };
  },
  props: {
    id: {
      required: true,
      type: Number,
    },
  },
  computed: {
    stateId() {
      return (store.state as any).user.id;
    },
  },
  setup(props) {
    const userInfo: any = ref({
      id: null,
      account: "",
      userName: "",
      avatar: "",
    });
    const getUserInfo = () => {
      getUserInfoById({ id: props.id }).then((res: any) => {
        userInfo.value = res.data;
      });
    };
    const editInfo = () => {
      removeToken();
      // to re-login
      Modal.confirm({
        title: "提示",
        content: "用户信息已修改，请重新登录",
        type: "warning",
        onOk() {
          router.push("/login");
        },
        onCancel() {
          router.push("/login");
        },
      });
    };
    getUserInfo();
    return { userInfo, getUserInfo, editInfo };
  },
  methods: {
    onSubmit() {
      const data = {
        id: this.userInfo.id,
        userName: this.userInfo.userName,
        avatar: this.userInfo.avatar,
      };
      updateUserInfo(data).then((res: any) => {
        if (res.code == 200) {
          this.editInfo();
        }
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.user-info-form {
  width: 100%;
  margin-top: 40px;
}

// :deep .ant-form-item-control-wrapper {
//   width: calc(100% - 100px);
// }
</style>
