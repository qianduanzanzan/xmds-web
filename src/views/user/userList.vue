<template>
  <a-row justify="space-between" align="middle">
    <a-col :span="6" style="margin-left: 8px">
      <a-row align="middle"
        >用户名：
        <a-col :span="18">
          <a-input
            v-model:value="searchData.userName"
            @keydown.enter="getList"
          ></a-input>
        </a-col>
      </a-row>
    </a-col>

    <a-button @click="openModal">添加</a-button>
  </a-row>
  <a-table
    class="table"
    :columns="columns"
    :data-source="userList"
    v-model:current="pageInfo.current"
    :total="pageInfo.total"
    rowKey="id"
  >
    <template #index="{ index }">
      <span>
        {{ index + 1 }}
      </span>
    </template>
    <template #userName="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #account="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #avatar="{ text }">
      <!-- <img :src="text" class="img-ava" /> -->
      <a-avatar :src="text" :size="80" />
    </template>
    <template #roleId="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #createAt="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #updateAt="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #operation="{ record }">
      <a-button @click="edit(record)">修改</a-button>
      <a-button @click="opMenuModal(record)">菜单</a-button>
    </template>
  </a-table>
  <user-info-drawer
    :id="selectedUserId"
    @closeDrawer="onCloseDrawer"
    ref="userInfoDrawer"
  />
  <a-modal
    v-model:visible="visible"
    title="添加用户"
    @ok="handleOk"
    :destroyOnClose="true"
  >
    <a-form
      labelAlign="left"
      :centered="true"
      :maskClosable="false"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :model="addUserform"
      ref="ruleForm"
      :rules="rules"
    >
      <a-form-item label="用户名" name="userName">
        <a-input
          v-model:value="addUserform.userName"
          placeholder="请输入用户名"
        />
      </a-form-item>
      <a-form-item label="账号" name="account">
        <a-input v-model:value="addUserform.account" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item label="密码" name="password">
        <a-input
          v-model:value="addUserform.password"
          placeholder="请输入密码"
        />
      </a-form-item>
    </a-form>
  </a-modal>
  <auth-menu-modal ref="authMenuModal" :userId="selectedUserId" />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { getUserList, addUser } from "@/api/userInfo";
import authMenuModal from './components/authMenuModal.vue'
import userInfoDrawer from "@/layout/components/userInfoDrawer.vue";
export default defineComponent({
  name: "userList",
  components: { userInfoDrawer,authMenuModal },
  data() {
    return {
      selectedUserId: 0,
      visible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      addUserform: {
        userName: "",
        account: "",
        password: "",
        roleId: 102,
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 5, message: "用户名长度在2到5之间", trigger: "blur" },
        ],
        account: [
          { required: true, message: "请输入账号", trigger: "blur" },
          { min: 6, max: 11, message: "账号长度在6到11之间", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 11, message: "密码长度在6到11之间", trigger: "blur" },
        ],
      },
      columns: [
        {
          dataIndex: "index",
          title: "序号",
        },
        {
          dataIndex: "userName",
          title: "用户名",
        },
        {
          title: "账号",
          dataIndex: "account",
        },
        {
          title: "头像",
          dataIndex: "avatar",
          //   key: "avatar",
          slots: { customRender: "avatar" },
        },
        {
          title: "角色",
          dataIndex: "roleId",
          slots: { customRender: "roleId" },
        },
        {
          title: "创建时间",
          dataIndex: "createAt",
        },
        {
          title: "更新时间",
          dataIndex: "updateAt",
        },
        {
          title: "操作",
          dataIndex: "operation",
          slots: { customRender: "operation" },
        },
      ],
    };
  },
  setup() {
    const userList = ref([]);
    const pageInfo = ref({
      total: 0,
      size: 6,
      current: 1,
    });
    const searchData = ref({ userName: "" });
    const getList = () => {
      const data = {
        userName: searchData.value.userName,
        total: 0,
        size: 20,
        current: 1,
      };
      getUserList(data).then((res: any) => {
        pageInfo.value.total = res.total;
        userList.value = res.data.records;
      });
    };
    getList();
    return { userList, pageInfo, searchData, getList };
  },
  mounted(){
    console.log(this)
  },
  methods: {
    onCloseDrawer() {
      this.pageInfo = {
        total: 0,
        size: 20,
        current: 1,
      };
      this.searchData = { userName: "" };
      this.getList();
    },
    edit(data: any) {
      this.selectedUserId = data.id;
      this.$nextTick(() => {
        (this.$refs.userInfoDrawer as any).openDrawer();
      });
    },
    opMenuModal(data: any) {
      this.selectedUserId = data.id;
      this.$nextTick(() => {
        (this.$refs.authMenuModal as any).open();
      });
    },
    handleOk() {
      (this.$refs.ruleForm as any)
        .validate()
        .then(() => {
          addUser(this.addUserform).then((res: any) => {
            if (res.code == 200) {
              this.visible = false;
              this.getList();
            }
          });
        })
        .catch(() => {
          return false;
        });
    },
    openModal() {
      this.visible = true;
    },
  },
});
</script>

<style lang="scss" scoped>
.img-ava {
  height: 80px;
  width: 80px;
}
</style>
