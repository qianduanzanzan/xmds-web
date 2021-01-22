<template>
  <a-modal
    v-model:visible="visible"
    :title="type == 'add' ? '添加产品' : '修改产品'"
    @ok="handleOk"
    :destroyOnClose="true"
    :width="700"
  >
    <a-form
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-item ref="imgs" label="产品图片" name="imgs">
        <images-manage @onChange="getImgs" v-bind="$attrs"></images-manage>
      </a-form-item>
      <a-form-item ref="prodName" label="产品名称" name="prodName">
        <a-input v-model:value="form.prodName" placeholder="请输入产品名称" />
      </a-form-item>
      <a-form-item ref="categoryId" label="产品分类" name="categoryId">
        <a-select
          v-model:value="form.categoryId"
          style="width: 100%"
          placeholder="请选择产品分类"
        >
          <a-select-option v-for="item in categorys" :key="item.id">
            {{ item.categoryName }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item ref="description" label="产品描述" name="description">
        <a-textarea
          v-model:value="form.description"
          placeholder="请输入产品描述"
          :rows="4"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, watch, toRefs, computed } from "vue";
import { addProd, editProd } from "@/api/prod";
import store from "@/store/index";
import { message } from "ant-design-vue";
export default defineComponent({
  props: {
    type: {
      type: String,
      default: "add",
    },
    prodForm: {
      required: true,
      type: Object,
    },
    id: {
      type: Number,
      default: null,
    },
  },
  setup(props,context) {
    const visible = ref(false);
    const labelCol = ref({ span: 3 });
    const wrapperCol = ref({ span: 21 });
    const rules = ref({
      prodName: [
        { required: true, message: "请输入产品名称", trigger: "blur" },
      ],
      description: [
        { required: true, message: "请输入产品描述", trigger: "blur" },
      ],
      categoryId: [
        {
          required: true,
          type: "number",
          message: "请选择产品分类",
          trigger: "change",
        },
      ],
    });
    const { prodForm, type,id } = toRefs(props);
    const ruleForm = ref(null);
    const categorys = computed(() => {
      return (store.state as any).category.category;
    });
    const form = prodForm;
    const updateImgs = ref([]);

    const handleOk = () => {
      (ruleForm.value as any)
        .validate()
        .then(() => {
          if (!updateImgs.value || (updateImgs.value as any).length == 0) {
            message.error("产品至少有一张图片");
            return false;
          }
          const data = Object.assign({ imgs: updateImgs.value }, form.value);
          if (type.value == "add") {
            addProd(data).then((res: any) => {
              visible.value = false;
              message.success("添加成功");
              context.emit("success")
            });
          } else {
            editProd(Object.assign({ id: id.value }, data)).then((res: any) => {
              visible.value = false;
              message.success("修改成功");
              context.emit("success")
            });
          }
        })
        .catch((error: any) => {
          console.log("error", error);
        });
    };

    const open = () => {
      visible.value = true;
    };

    const getImgs = (data: any) => {
      updateImgs.value = data;
    };

    return {
      visible,
      handleOk,
      open,
      getImgs,
      labelCol,
      wrapperCol,
      rules,
      categorys,
      form,
      ruleForm,
      updateImgs,
    };
  },
});
</script>
