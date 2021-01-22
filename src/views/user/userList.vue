<template>
  <a-row justify="space-between" align="middle">
    <!-- <a-col :span="6" style="margin-left: 8px">
      <a-row align="middle"
        >用户名：
        <a-col :span="18">
          <a-input
            v-model:value="searchData.userName"
            @keydown.enter="getList"
          ></a-input>
        </a-col>
      </a-row>
    </a-col> -->
    <a-col :span="10" style="margin-left: 8px">
      <a-row justify="start" align="middle">
        <a-col :span="12">
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
        <a-col :span="11" style="margin-left: 8px">
          <a-row align="middle"
            >用户状态：
            <a-col>
              <a-radio-group
                name="status"
                v-model:value="searchData.stopFlag"
                @change="getList"
              >
                <a-radio :value="null">
                  全部
                </a-radio>
                <a-radio :value="0">
                  启用
                </a-radio>
                <a-radio :value="1">
                  停用
                </a-radio>
              </a-radio-group>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </a-col>

    <a-button @click="openModal">添加</a-button>
  </a-row>
  <a-table
    class="table"
    :data-source="userList"
    rowKey="id"
    :pagination="false"
  >
    <a-table-column title="序号">
      <template #default="{ index }">
        <span>
          {{ index + 1 }}
        </span>
      </template>
    </a-table-column>
    <a-table-column title="用户名称">
      <template #default="{ record }">
        <span>
          {{ record.userName }}
        </span>
      </template>
    </a-table-column>
    <a-table-column title="用户账号">
      <template #default="{ record }">
        <span>
          {{ record.account }}
        </span>
      </template>
    </a-table-column>
    <a-table-column title="用户头像">
      <template #default="{ record }">
        <a-avatar :src="record.avatar" :size="80" />
      </template>
    </a-table-column>
    <a-table-column title="状态">
      <template #default="{ record }">
        <a-tag v-if="record.stopFlag == 0" color="#7B68EE">
          启用
        </a-tag>
        <a-tag v-else color="#DC143C">
          停用
        </a-tag>
      </template>
    </a-table-column>
    <a-table-column title="创建时间">
      <template #default="{ record }">
        <span>
          {{ record.createAt }}
        </span>
      </template>
    </a-table-column>
    <a-table-column title="更新时间">
      <template #default="{ record }">
        <span>
          {{ record.updateAt }}
        </span>
      </template>
    </a-table-column>
    <a-table-column title="操作">
      <template #default="{ record }">
        <a-button @click="edit(record)">修改</a-button>
        <a-button @click="opMenuModal(record)">菜单</a-button>
        <a-button @click="changeUserStatus(record)">{{
          record.stopFlag == 1 ? "启用" : "停用"
        }}</a-button>
      </template>
    </a-table-column>
  </a-table>
  <a-row justify="end">
    <a-pagination
      class="pagination"
      @change="onChange"
      @showSizeChange="onSizeChange"
      :total="pageInfo.total"
      v-model:current="pageInfo.current"
      :show-total="(total) => `共${total}条`"
      :pageSizeOptions="pageSize"
      :defaultPageSize="pageInfo.size"
      :showSizeChanger="true"
      ><template #buildOptionText="props">
        <span>{{ props.value }}条/页</span>
      </template>
    </a-pagination>
  </a-row>
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
    :maskClosable="false"
  >
    <a-row justify="center">
      <avatar-manage v-model:imgUrl="addUserform.avatar" />
    </a-row>
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
import { computed, defineComponent, ref } from "vue";
import { getUserList, addUser, changeUserStatus } from "@/api/userInfo";
import authMenuModal from "./components/authMenuModal.vue";
import userInfoDrawer from "@/layout/components/userInfoDrawer.vue";
import { Modal, message } from "ant-design-vue";
import store from "@/store/index";
export default defineComponent({
  name: "userList",
  components: { userInfoDrawer, authMenuModal },
  data() {
    return {
      imgUrl: "",
      selectedUserId: 0,
      visible: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 20 },
      addUserform: {
        userName: "",
        account: "",
        password: "",
        avatar: null,
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
    };
  },
  setup() {
    const userList = ref([]);
    const pageInfo = ref({
      total: 0,
      size: 20,
      current: 1,
    });
    const pageSize = ref(["10", "20", "30", "40", "50"]);
    // const token = computed(() => (store.state as any).user.token)
    const searchData = ref({ userName: "", stopFlag: null });
    const getList = () => {
      getUserList(
        Object.assign(
          {
            userName: searchData.value.userName,
            stopFlag: searchData.value.stopFlag,
          },
          pageInfo.value
        )
      ).then((res: any) => {
        pageInfo.value.total = res.data.total;
        userList.value = res.data.records;
      });
    };
    const onChange = (page: number, pageSize: number) => {
      pageInfo.value = {
        total: 0,
        size: pageSize,
        current: page,
      };
      getList();
    };
    const onSizeChange = (current: number, size: number) => {
      pageInfo.value = {
        total: 0,
        size: size,
        current: current,
      };
      getList();
    };
    getList();
    return { userList, pageInfo, searchData, getList,onChange,onSizeChange,pageSize };
  },
  methods: {
    onCloseDrawer() {
      this.pageInfo = {
        total: 0,
        size: 20,
        current: 1,
      };
      this.searchData = { userName: "", stopFlag: null };
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
              this.pageInfo = {
                total: 0,
                size: 20,
                current: 1,
              };
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
    changeUserStatus(data: any) {
      changeUserStatus({ id: data.id }).then((res: any) => {
        if (res.code == 200) {
          message.success("修改成功");
          this.pageInfo = {
            total: 0,
            size: 20,
            current: 1,
          };
          this.getList();
        }
      });
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
