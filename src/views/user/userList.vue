<template>
  <a-table :columns="columns" :data-source="data">
      <template #userName="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #account="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #avatar="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #roleId="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #createdAt="{ text }">
      <a>{{ text }}</a>
    </template>
    <template #updatedAt="{ text }">
      <a>{{ text }}</a>
    </template>
  </a-table>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { getUserList } from "@/api/userInfo";
export default defineComponent({
  name: "userList",
  data() {
    return {
      columns: [
        {
          dataIndex: "userName",
          key: "userName",
          title: "用户名",
        },
        {
          title: "账号",
          dataIndex: "account",
          key: "account",
        },
        {
          title: "头像",
          dataIndex: "avatar",
          key: "avatar",
          slots: { customRender: "avatar" },
        },
        {
          title: "角色",
          key: "roleId",
          dataIndex: "roleId",
          slots: { customRender: "roleId" },
        },
        {
          title: "创建时间",
          key: "createdAt",
          dataIndex: "createdAt",
        },
        {
          title: "更新时间",
          key: "updatedAt",
          dataIndex: "updatedAt",
        },
        {
          title: "Action",
          key: "action",
          slots: { customRender: "action" },
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
      getUserList(Object.assign(searchData, pageInfo)).then((res: any) => {
        pageInfo.value.total = res.total;
        userList.value = res.data.records;
      });
    };
    getList();
    return { userList, pageInfo, searchData, getList };
  },
});
</script>
