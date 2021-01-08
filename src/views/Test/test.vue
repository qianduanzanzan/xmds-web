<template>
  <a-table
    class="table"
    :columns="columns"
    :data-source="userList"
    v-model:current="pageInfo.current"
    :total="pageInfo.total"
    rowKey="id"
  >
    <template #userName="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #account="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #avatar="{ text }">
      <img :src="text" class="img-ava" />
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
      <a-button @click="del(record)">删除</a-button>
    </template>
  </a-table>
  <user-info-drawer :id="selectedUserId" @closeDrawer="onCloseDrawer" ref="userInfoDrawer" />
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { getUserList } from "@/api/userInfo";
import userInfoDrawer from "@/layout/components/userInfoDrawer.vue";
export default defineComponent({
  name: "userList",
  components: { userInfoDrawer },
  data() {
    return {
      selectedUserId: null,
      columns: [
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
      size: 20,
      current: 1,
    });
    const searchData = ref({ userName: "" });
    const getList = () => {
      getUserList(Object.assign(searchData.value, pageInfo.value)).then(
        (res: any) => {
          pageInfo.value.total = res.total;
          userList.value = res.data.records;
        }
      );
    };
    getList();
    return { userList, pageInfo, searchData, getList };
  },
  methods: {
    onCloseDrawer() {
        console.log('关闭')
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
    del(data: any) {
      console.log(data);
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
