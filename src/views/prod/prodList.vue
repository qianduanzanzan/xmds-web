<template>
  <div>
    <a-row justify="space-between" align="middle">
      <a-col :span="18" style="margin-left: 8px">
        <a-row justify="start" align="middle">
          <a-col :span="6">
            <a-row align="middle"
              >产品名称：
              <a-col :span="16">
                <a-input
                  v-model:value="searchData.prodName"
                  @keydown.enter="getList"
                ></a-input>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="6">
            <a-row align="middle"
              >产品分类：
              <a-col :span="16">
                <a-select
                  v-model:value="searchData.categoryId"
                  style="width: 100%"
                  @change="getList"
                >
                  <a-select-option
                    v-for="item in [{ id: null, categoryName: '全部' }].concat(
                      categorys
                    )"
                    :key="item.id"
                  >
                    {{ item.categoryName }}
                  </a-select-option>
                </a-select>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="6" style="margin-left: 8px">
            <a-row align="middle"
              >产品状态：
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
      <a-button @click="addProduct">添加</a-button>
    </a-row>
    <a-table
      class="table"
      :data-source="prodList"
      rowKey="id"
      :pagination="false"
    >
      <a-table-column :width="60" title="序号">
        <template #default="{ index }">
          <span>
            {{ index + 1 }}
          </span>
        </template>
      </a-table-column>
      <a-table-column :width="200" title="产品名称">
        <template #default="{ record }">
          <span>
            {{ record.prodName }}
          </span>
        </template>
      </a-table-column>
      <a-table-column :width="110" title="产品分类">
        <template #default="{ record }">
          <span>
            {{
              categorys.find((item) => item.id == record.categoryId)
                .categoryName
            }}
          </span>
        </template>
      </a-table-column>
      <a-table-column :width="535" title="图片预览">
        <template #default="{ record }">
          <div
            v-for="img in record.imgs"
            :key="img.uid"
            style="margin-left:5px;height:95px;width:95px;display:inline-block;overflow:hidden"
          >
            <a-image :width="95" :height="95" :src="img.url" />
          </div>
        </template>
      </a-table-column>
      <a-table-column :width="80" title="状态">
        <template #default="{ record }">
          <a-tag v-if="record.stopFlag == 0" color="#7B68EE">
            启用
          </a-tag>
          <a-tag v-else color="#DC143C">
            停用
          </a-tag>
        </template>
      </a-table-column>
      <a-table-column :width="180" title="创建时间">
        <template #default="{ record }">
          <span>
            {{ record.createAt }}
          </span>
        </template>
      </a-table-column>
      <a-table-column :width="180" title="更新时间">
        <template #default="{ record }">
          <span>
            {{ record.updateAt }}
          </span>
        </template>
      </a-table-column>
      <a-table-column :width="200" :ellipsis="true" title="产品描述">
        <template #default="{ record }">
          <a-tooltip placement="topLeft">
            <template #title>
              {{ record.description }}
            </template>
            {{ record.description }}
          </a-tooltip>
        </template>
      </a-table-column>
      <a-table-column :width="170" title="操作">
        <template #default="{ record }">
          <a-button @click="editProduct(record)">修改</a-button>
          <a-button @click="openProdSkuDrawer(record)">库存</a-button>
          <a-button @click="changeProdStatus(record)">{{
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
    <prod-modal
      :imgs="imgs"
      :type="type"
      v-model:prodForm="prodForm"
      ref="prodModal"
      :id="selectedId"
      @success="getList"
    ></prod-modal>
    <prod-sku-drawer :id="selectedId" ref="prodSkuDrawer" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick, computed } from "vue";
import { changeStatus, getPage } from "@/api/prod";
import prodModal from "./components/prodModal.vue";
import prodSkuDrawer from "./components/prodSkuDrawer.vue";
import store from "@/store/index";
import { message } from "ant-design-vue";
export default defineComponent({
  name: "prodList",
  components: {
    prodModal,
    prodSkuDrawer,
  },
  setup() {
    const prodList = ref([]);
    const pageInfo = ref({
      current: 1,
      size: 20,
      total: 0,
    });
    const searchData = ref({
      prodName: "",
      categoryId: null,
      stopFlag: null,
    });
    const categorys = computed(() => {
      return (store.state as any).category.category;
    });
    const pageSize = ref(["10", "20", "30", "40", "50"]);
    const prodModal = ref(null);
    const imgs = ref([
      {
        uid: 1,
        url: "",
      },
    ]);
    const type = ref("add");
    const prodForm = ref({
      prodName: "",
      categoryId: null,
      description: "",
    });
    const selectedId = ref(-1);
    const prodSkuDrawer = ref(null);

    const getList = () => {
      getPage(Object.assign(searchData.value, pageInfo.value)).then(
        (res: any) => {
          prodList.value = res.data.records.map((item: any) => {
            return {
              ...item,
              imgs: item.imgs.split(",").map((item: any, index: number) => {
                return {
                  uid: index,
                  url: item,
                };
              }),
            };
          });
          pageInfo.value.total = res.data.total;
        }
      );
    };
    getList();

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

    const addProduct = () => {
      type.value = "add";
      imgs.value = [];
      prodForm.value = {
        prodName: "",
        categoryId: null,
        description: "",
      };
      nextTick(() => {
        (prodModal.value as any).open();
      });
    };

    const editProduct = (data: any) => {
      type.value = "edit";
      imgs.value = data.imgs;
      selectedId.value = data.id;
      prodForm.value = {
        prodName: data.prodName,
        categoryId: data.categoryId,
        description: data.description,
      };
      nextTick(() => {
        (prodModal.value as any).open();
      });
    };

    const changeProdStatus = (data: any) => {
      changeStatus({ id: data.id }).then((res: any) => {
        if (res.code == 200) {
          getList();
          message.success("修改成功");
        }
      });
    };
    const openProdSkuDrawer = (data: any) => {
      selectedId.value = data.id;
      nextTick(() => {
        (prodSkuDrawer.value as any).open();
      });
    };

    return {
      prodList,
      pageInfo,
      searchData,
      pageSize,
      getList,
      onChange,
      onSizeChange,
      addProduct,
      prodModal,
      imgs,
      type,
      prodForm,
      categorys,
      editProduct,
      changeProdStatus,
      selectedId,
      openProdSkuDrawer,
      prodSkuDrawer,
    };
  },
});
</script>
