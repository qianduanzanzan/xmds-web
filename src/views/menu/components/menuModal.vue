<template>
  <a-modal
    v-model:visible="visible"
    :title="type == 'add' ? '添加菜单' : '修改菜单'"
    @ok="handleOk"
    :destroyOnClose="true"
  >
    <a-form
      labelAlign="left"
      :centered="true"
      :maskClosable="false"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      :model="menuForm"
      ref="ruleForm"
      :rules="rules"
    >
      <a-form-item label="菜单名称" name="menuName">
        <a-input
          v-model:value="menuForm.menuName"
          placeholder="请输入菜单名称"
        />
      </a-form-item>
      <a-form-item label="文件路径" name="filePath">
        <a-input
          v-model:value="menuForm.filePath"
          placeholder="请输入文件路径"
        />
      </a-form-item>
      <a-form-item label="路由地址" name="routeName">
        <a-input
          v-model:value="menuForm.routeName"
          placeholder="请输入路由地址"
        />
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { addMenu, editMenu, getDeatil } from "@/api/menu";
import { message } from "ant-design-vue";
export default defineComponent({
  props: {
    type: {
      default: "add",
      type: String,
      required: false,
    },
    menuId: {
      default: 0,
      type: Number,
      required: false,
    },
  },
  setup(props,context) {
    const visible = ref(false);
    const menuForm = ref({
      menuName: "",
      filePath: "",
      routeName: "",
    });
    const rules = ref({
      menuName: [
        { required: true, message: "请输入菜单名称", trigger: "blur" },
      ],
      filePath: [
        { required: true, message: "请输入文件路径", trigger: "blur" },
      ],
      routeName: [
        { required: true, message: "请输入路由地址", trigger: "blur" },
      ],
    });
    const labelCol = ref({ span: 4 });
    const wrapperCol = ref({ span: 20 });
    const ruleForm = ref();
    const open = () => {
      if (props.type == "edit") {
        getDeatil(props.menuId).then((res: any) => {
          menuForm.value = res.data;
        });
      }
      visible.value = true;
    };
    const handleOk = () => {
      (ruleForm.value as any)
        .validate()
        .then(() => {
          if (props.type == "edit") {
            editMenu(menuForm.value).then((res: any) => {
              message.success("修改成功");
              visible.value = false;
              context.emit('close')
            });
          } else {
            addMenu(menuForm.value).then((res: any) => {
              message.success("添加成功");
              visible.value = false;
              context.emit('close')
            });
          }
        })
        .catch(() => {
          return false;
        });
      visible.value = false;
    };
    return {
      visible,
      menuForm,
      open,
      handleOk,
      rules,
      labelCol,
      wrapperCol,
      ruleForm,
    };
  },
});
</script>
