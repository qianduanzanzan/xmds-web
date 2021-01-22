<template>
  <a-drawer
    title="管理库存"
    placement="right"
    v-model:visible="visible"
    :after-visible-change="afterVisibleChange"
    width="100%"
    :destroyOnClose="true"
  >
    <a-row justify="space-between">
      <span>产品属性</span>
      <a-button @click="saveAttr" :disabled="!canEdit">保存</a-button>
    </a-row>
    <div class="grid-table header">
      <a-row class="border-box" justify="center" align="middle">
        属性名
      </a-row>
      <a-row class="border-box" justify="center" align="middle">
        属性值
      </a-row>
    </div>
    <div class="grid-table" v-for="(item, index) in attrs" :key="index">
      <a-row class="border-box" align="middle">
        <a-input v-model:value="item.attrKey"></a-input>
      </a-row>
      <a-row class="border-box" align="middle">
        <a-tag
          v-for="(value, index1) in item.attrValue"
          @click="editAttrValue(value)"
          :key="index1"
          :closable="!value.id"
          @close="delTag(value, item)"
        >
          {{ value.value }}
        </a-tag>
        <a-button @click="addValue(item.attrValue)" v-if="canEdit"
          >添加属性值</a-button
        >
      </a-row>
    </div>
    <a-row v-if="attrs.length < 3 && canEdit" justify="center" @click="AddAttr"
      >添加属性</a-row
    >
    <a-row justify="space-between">
      <span>产品库存</span>
      <a-button @click="saveSku">保存</a-button>
    </a-row>
    <a-table
      class="table"
      :data-source="prodSkuTable"
      :rowKey="
        (record) =>
          record.attr1Id + (record.attr2Id || 1) + (record.attr3Id || 1)
      "
      bordered
      :pagination="false"
    >
      <a-table-column :width="200" title="属性一">
        <template #default="{ record }">
          <span>
            {{ record.attr1Name }}
          </span>
        </template>
      </a-table-column>
      <a-table-column :width="180" title="属性二">
        <template #default="{ record }">
          <span>
            {{ record.attr2Name || "无" }}
          </span>
        </template>
      </a-table-column>
      <a-table-column :width="180" title="属性三">
        <template #default="{ record }">
          <span>
            {{ record.attr3Name || "无" }}
          </span>
        </template>
      </a-table-column>
      <a-table-column :width="180" title="库存">
        <template #default="{ record }">
          <!-- <a-input v-model:value="record.sku"></a-input> -->
          <a-input-number
            style="width:100%"
            v-model:value="record.sku"
            :min="0"
          />
        </template>
      </a-table-column>
      <a-table-column :width="180" title="价格">
        <template #default="{ record }">
          <a-input v-model:value="record.price"></a-input>
        </template>
      </a-table-column>
    </a-table>
  </a-drawer>
  <a-modal
    v-model:visible="modalVisible"
    :title="attrType == 'add' ? '添加属性' : '修改属性'"
    @ok="handleOk"
    :destroyOnClose="true"
  >
    <a-row justify="center" align="middle">请输入属性值</a-row>
    <a-input ref="attrInput" v-model:value="attrValue"></a-input>
  </a-modal>
</template>

<script lang="ts">
import { message } from "ant-design-vue";
import {
  defineComponent,
  ref,
  toRefs,
  getCurrentInstance,
  nextTick,
} from "vue";
import {
  addProdAttr,
  getAttrByProdId,
  addProdSku,
  getSku,
  editSku,
} from "@/api/prod";
export default defineComponent({
  props: {
    id: {
      required: true,
      type: Number,
    },
  },
  setup(props, context) {
    const visible = ref(false);
    const { id } = toRefs(props);
    const attrs = ref([]);
    const modalVisible = ref(false);
    const attrType = ref("add");
    const attrValue = ref("");
    const selectedData = ref({});
    const selectedRow = ref([]);
    const attrInput = ref(null);
    const prodSkuTable = ref([]);
    const canEdit = ref(true);

    const open = () => {
      visible.value = true;
    };

    const getProdAttr = async () => {
      const res: any = await getAttrByProdId({ prodId: id.value });
      if (res.code == 200) {
        if (res.data && res.data.length > 0) {
          canEdit.value = false;
        } else {
          canEdit.value = true;
        }
        const data: any = {};
        res.data.map((item: any) => {
          if (data[`${item.attrKey}`]) {
            data[`${item.attrKey}`].push({
              id: item.id,
              value: item.attrVal,
            });
          } else {
            data[`${item.attrKey}`] = [
              {
                id: item.id,
                value: item.attrVal,
              },
            ];
          }
        });
        const keys = Object.keys(data);
        (attrs as any).value = keys.map((item: any) => {
          return {
            attrKey: item,
            attrValue: data[item],
          };
        });
      }
    };

    const getProdSku = () => {
      getSku({ prodId: id.value }).then((res: any) => {
        if (res.data && res.data.length > 0) {
          canEdit.value = false;
        } else {
          canEdit.value = true;
        }
        prodSkuTable.value = res.data;
      });
    };

    const formatProdSku = () => {
      if (attrs.value.length > 0) {
        for (let i = 0; i < (attrs.value[0] as any).attrValue.length; i++) {
          if (attrs.value[1]) {
            for (let j = 0; j < (attrs.value[1] as any).attrValue.length; j++) {
              if (attrs.value[2]) {
                for (
                  let k = 0;
                  k < (attrs.value[2] as any).attrValue.length;
                  k++
                ) {
                  const prodSku = {
                    prodId: id.value,
                    attr1Id: (attrs.value[0] as any).attrValue[i].id,
                    attr1Name: (attrs.value[0] as any).attrValue[i].value,
                    attr2Id: (attrs.value[1] as any).attrValue[j].id,
                    attr2Name: (attrs.value[1] as any).attrValue[j].value,
                    attr3Id: (attrs.value[2] as any).attrValue[k].id,
                    attr3Name: (attrs.value[2] as any).attrValue[k].value,
                    sku: 0,
                    price: 0,
                  };
                  (prodSkuTable.value as any).push(prodSku);
                }
              } else {
                const prodSku = {
                  prodId: id.value,
                  attr1Id: (attrs.value[0] as any).attrValue[i].id,
                  attr1Name: (attrs.value[0] as any).attrValue[i].value,
                  attr2Id: (attrs.value[1] as any).attrValue[j].id,
                  attr2Name: (attrs.value[1] as any).attrValue[j].value,
                  sku: 0,
                  price: 0,
                };
                (prodSkuTable.value as any).push(prodSku);
              }
            }
          } else {
            const prodSku = {
              prodId: id.value,
              attr1Id: (attrs.value[0] as any).attrValue[i].id,
              attr1Name: (attrs.value[0] as any).attrValue[i].value,
              sku: 0,
              price: 0,
            };
            (prodSkuTable.value as any).push(prodSku);
          }
        }
      }
    };

    const afterVisibleChange = (val: boolean) => {
      if (val) {
        getProdAttr();
        getProdSku();
      }
    };

    const AddAttr = () => {
      (attrs as any).value.push({
        attrKey: "",
        attrValue: [],
      });
    };
    const addValue = (data: any) => {
      attrType.value = "add";
      attrValue.value = "";
      selectedRow.value = data;
      modalVisible.value = true;
      nextTick(() => {
        (attrInput.value as any).focus();
      });
    };
    const handleOk = () => {
      if (attrValue.value == "") {
        message.error("属性值不能为空");
        return false;
      }
      if (attrType.value == "add") {
        (selectedRow as any).value.push({ value: attrValue.value });
      } else {
        (selectedData as any).value.value = attrValue.value;
      }
      modalVisible.value = false;
    };

    const editAttrValue = (data: any) => {
      attrType.value = "edit";
      attrValue.value = data.value;
      selectedData.value = data;
      modalVisible.value = true;
      nextTick(() => {
        (attrInput.value as any).focus();
      });
    };

    const delTag = (val: any, data: any) => {
      const index = data.attrValue.findIndex(
        (item: any) => item.value == data.value
      );
      data.attrValue.splice(index, 1);
    };
    const saveAttr = () => {
      const arr: any[] = [];
      let flag = false;
      attrs.value.map((item1: any) => {
        if (item1.attrKey == "") {
          flag = true;
        }
        item1.attrValue.map((item2: any) => {
          arr.push({
            attrKey: item1.attrKey,
            attrVal: item2.value,
            prodId: id.value,
          });
        });
      });
      if (flag) {
        message.error("属性名不能为空");
        return false;
      }
      addProdAttr(arr).then(async (res: any) => {
        if (res.code == 200) {
          message.success("添加成功");
          await getProdAttr();
          formatProdSku();
          addProdSku(prodSkuTable.value);
        }
      });
    };

    const saveSku = () => {
      // console.log(prodSkuTable.value)
      editSku(prodSkuTable.value).then((res: any) => {
        if (res.code == 200) {
          message.success("保存成功");
        }
      });
    };

    return {
      visible,
      open,
      afterVisibleChange,
      attrs,
      AddAttr,
      modalVisible,
      attrType,
      attrValue,
      selectedData,
      selectedRow,
      addValue,
      handleOk,
      editAttrValue,
      delTag,
      saveAttr,
      attrInput,
      saveSku,
      prodSkuTable,
      getProdAttr,
      formatProdSku,
      getProdSku,
      canEdit,
    };
  },
});
</script>

<style lang="scss" scoped>
.grid-table {
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 5fr;
  grid-template-rows: 34px;
}
.border-box {
  width: 100%;
  height: 34px;
  border: 1px solid #000;
}
.center {
  align-content: center;
}
</style>
