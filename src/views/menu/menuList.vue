<template>
<div>
   <a-row justify="space-between" align="middle">
    <a-col :span="6" style="margin-left: 8px">
      <a-row align="middle"
        >菜单名称：
        <a-col :span="18">
          <a-input
            v-model:value="searchData.menuName"
            @keydown.enter="getList"
          ></a-input>
        </a-col>
      </a-row>
    </a-col>
    <a-button @click="addMenu">添加</a-button>
  </a-row>
  <a-table
    class="table"
    :data-source="menuList"
    v-model:current="pageInfo.current"
    :total="pageInfo.total"
    rowKey='id'
  >
    <a-table-column title="序号">
      <template #default="{ index }">
        <span>
          {{ index+1 }}
        </span>
      </template>
    </a-table-column>
    <a-table-column title="菜单名称">
      <template #default="{ record }">
        <span>
          {{ record.menuName }}
        </span>
      </template>
    </a-table-column>
    <a-table-column title="路由地址">
      <template #default="{ record }">
        <span>
          {{ record.routeName }}
        </span>
      </template>
    </a-table-column>
    <a-table-column title="文件地址">
      <template #default="{ record }">
        <span>
          {{ record.filePath }}
        </span>
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
    <a-table-column title="Action">
      <template #default="{ record }">
        <a-button @click="editMenu(record)">修改</a-button>
      </template>
    </a-table-column>
  </a-table>
  <menu-modal ref="menuModal" :menuId="selectedMenuID" @close="getList" :type="type" />
</div>
</template>

<script lang="ts">
import { defineComponent, ref ,onMounted,nextTick} from "vue";
import { getMenuList } from "@/api/menu";
import menuModal from './components/menuModal.vue'
export default defineComponent({
  components:{
    menuModal
  },
  name: "menuList",
  setup() {
    const menuList = ref([]);
    const searchData = ref({ menuName: "" });
    const pageInfo = ref({
      total: 0,
      size: 20,
      current: 1,
    });
    const menuModal = ref(null)
    const selectedMenuID = ref(null)
    const type = ref('add')
    const getList = () => {
      const data = {
        menuName: searchData.value.menuName,
        total: 0,
        size: 20,
        current: 1,
      };
      getMenuList(data).then((res: any) => {
        pageInfo.value.total = res.total;
        menuList.value = res.data.records;
      });
    };
    const opneModal = () => {
      nextTick(() => {
        (menuModal.value as any).open();
      })
    }
    getList()
    const addMenu = () => {
      type.value = 'add'
      opneModal()
    }
    const editMenu = (data:any) => {
      selectedMenuID.value = data.id
      type.value = 'edit'
      opneModal()
    }
    return {menuList,searchData,pageInfo,getList,opneModal,editMenu,addMenu,menuModal,type,selectedMenuID}
  },
});
</script>
