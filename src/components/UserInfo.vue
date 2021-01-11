<template>
  <a-row style="width: 100%" justify="center">
    <img-manage
      v-model:imgUrl="userInfo.avatar"
      @update:imgUrl="onChangeAvatar"
      url="pic/upload"
    />
    <a-form
      class="user-info-form"
      ref="ruleForm"
      :model="userInfo"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item ref="name" label="用户账号:" name="name">
        <a-input v-model:value="userInfo.account" />
      </a-form-item>
      <a-form-item ref="name" label="用户名称:" name="name">
        <a-input v-model:value="userInfo.userName" />
      </a-form-item>
      <a-form-item ref="name" label="用户职位:" name="name">
        <a-select v-model:value="userInfo.roleId" placeholder="请选择职位">
          <a-select-option v-for="i in 25" :key="(i + 9).toString(36) + i">
            {{ (i + 9).toString(36) + i }}
          </a-select-option>
        </a-select>
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
import { getUserInfoById, updateUserInfo, editAvatar } from "../api/userInfo";
import store from "@/store";
import { message } from "ant-design-vue";
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
  computed:{
    stateId(){
      return (store.state as any).user.id
    }
  },
  setup(props) {
    const userInfo: any = ref({
      id: null,
      account: "",
      userName: "",
      roleId: null,
      avatar: "",
    });
    const getUserInfo = () => {
      getUserInfoById({ id: props.id }).then((res: any) => {
        userInfo.value = res.data;
      });
    };
    const changeAvatar = () => {
      getUserInfoById({ id: props.id }).then((res: any) => {
        userInfo.value.avatar = res.data.avatar;
        message.success('头像更改成功')
        if(props.id == (store.state as any).user.id){
            store.commit("user/SET_USER_INFO", res.data);
        }
      });
    };
    const editInfo = () => {
      getUserInfoById({ id: props.id }).then((res: any) => {
        userInfo.value.account = res.data.account;
        userInfo.value.userName = res.data.userName;
        userInfo.value.roleId = res.data.roleId;
         message.success('用户信息更改成功')
        if(props.id == (store.state as any).user.id){
            store.commit("user/SET_USER_INFO", res.data);
        }
      });
    };
    getUserInfo();
    return { userInfo, getUserInfo, changeAvatar, editInfo };
  },
  methods: {
    onSubmit() {
      updateUserInfo(this.userInfo).then((res: any) => {
        if (res.code == 200) {
          this.editInfo();
        }
      });
    },
    onChangeAvatar() {
      editAvatar({ id: this.userInfo.id, avatar: this.userInfo.avatar }).then(
        (res: any) => {
          if (res.code == 200) {
            this.changeAvatar();
          }
        }
      );
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
