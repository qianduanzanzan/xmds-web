<template>
  <div>
    <a-row justify="space-between" align="middle">
      <a-col :span="10" style="margin-left: 8px">
        <a-row justify="start" align="middle">
          <a-col :span="12">
            <a-row align="middle"
              >分类名称：
              <a-col :span="18">
                <a-input
                  v-model:value="searchData.categoryName"
                  @keydown.enter="getList"
                ></a-input>
              </a-col>
            </a-row>
          </a-col>
          <a-col :span="11" style="margin-left: 8px">
            <a-row align="middle"
              >分类状态：
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
      <a-button @click="addCate">添加</a-button>
    </a-row>
    <a-table
      class="table"
      :data-source="cateList"
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
      <a-table-column title="分类名称">
        <template #default="{ record }">
          <span>
            {{ record.categoryName }}
          </span>
        </template>
      </a-table-column>
      <a-table-column title="分类图片">
        <template #default="{ record }">
          <a-avatar :src="record.img" :size="80" />
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
          <a-button @click="editCate(record)">修改</a-button>
          <a-button @click="changeStatus(record)">{{
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
    <a-modal title="添加分类" v-model:visible="visible" @ok="handleOk">
      <a-row justify="center">
        <avatar-manage v-model:imgUrl="cateForm.img" />
      </a-row>
      <a-form
        name="custom-validation"
        ref="ruleForm"
        :model="cateForm"
        :rules="rules"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        labelAlign="left"
      >
        <a-form-item ref="category" label="分类名称" name="category">
          <a-input
            v-model:value="cateForm.category"
            placeholder="请输入分类名称"
          ></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs, nextTick } from "vue";
import {
  getCatePage,
  addCategory,
  editCategory,
  changeCateStatus,
} from "@/api/category";
import { Modal, message } from "ant-design-vue";
export default defineComponent({
  name: "prodCategory",
  setup() {
    const searchData = ref({ category: "", stopFlag: null });
    const cateList = ref([]);
    const pageInfo = ref({
      current: 1,
      size: 20,
      total: 0,
    });
    const visible = ref(false);
    const cateForm = ref({ category: "", img: "" });
    const labelCol = ref({ span: 6 });
    const wrapperCol = ref({ span: 18 });
    const rules = ref({
      category: {
        required: true,
        message: "请输入分类名称",
        trigger: "blur",
      },
    });
    const pageSize = ref(["10", "20", "30", "40", "50"]);
    const selectedId = ref(null);

    const getList = () => {
      getCatePage(Object.assign(searchData.value, pageInfo.value)).then(
        (res) => {
          pageInfo.value.total = res.data.total;
          cateList.value = res.data.records;
        }
      );
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
    const addCate = () => {
      cateForm.value.category = "";
      cateForm.value.img = "";
      selectedId.value = null;
      visible.value = true;
    };
    const handleOk = () => {
      if (!selectedId.value) {
        addCategory(cateForm.value).then((res: any) => {
          if (res.code == 200) {
            message.success("添加成功");
            pageInfo.value = {
              current: 1,
              size: 20,
              total: 0,
            };
            visible.value = false;
            getList();
          }
        });
      } else {
        editCategory({
          id: selectedId.value,
          categoryName: cateForm.value.category,
          img: cateForm.value.img,
        }).then((res: any) => {
          if (res.code == 200) {
            message.success("修改成功");
            pageInfo.value = {
              current: 1,
              size: 20,
              total: 0,
            };
            visible.value = false;
            getList();
          }
        });
      }
    };
    const editCate = (data: any) => {
      cateForm.value.category = data.categoryName;
      cateForm.value.img = data.img;
      selectedId.value = data.id;
      visible.value = true;
    };
    const changeStatus = (data: any) => {
      changeCateStatus({ id: data.id }).then((res: any) => {
        if (res.code == 200) {
          message.success("状态修改成功");
          getList();
        }
      });
    };
    getList();
    return {
      pageSize,
      changeStatus,
      searchData,
      cateList,
      pageInfo,
      visible,
      cateForm,
      rules,
      getList,
      onChange,
      onSizeChange,
      handleOk,
      addCate,
      labelCol,
      wrapperCol,
      selectedId,
      editCate,
    };
  },
});
</script>
