<template>
  <a-modal v-model:visible="visible" title="菜单授权" :destroyOnClose="true">
    <div v-for="item in menuList" :key="item.id">
        <a-switch v-model:checked="item.selected" @change="onChange(item)" />{{ item.menuName }}
    </div>
  </a-modal>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from "vue";
import { getAuthMenu, authMenu, cancelAuth, getRouter } from "@/api/menu";
export default defineComponent({
  name: "authMenuModal",
  props: {
    userId: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const { userId } = toRefs(props);
    const menuList = ref([]);
    const visible = ref(false);
    const getMenu = async () => {
      const res1 = await getRouter({});
      const res2 = await getAuthMenu(userId.value);
      console.log(res1)
      console.log(res2)
      menuList.value = res1.data.map((item1:any) => {
          return {
              ...item1,
              selected:!!res2.data.find((item2:any) => item1.id == item2.id),
          }
      })
    };
    const open = () => {
      visible.value = true;
      getMenu()
    };

    const onChange = (data:any) => {
        if(data.selected){
            cancelAuth({menuId:data.id,userId:userId.value}).then((res:any) => {
                if(res.code == 200){
                    data.selected = false
                }
            })
        }else{
            authMenu({menuId:data.id,userId:userId.value}).then((res:any) => {
                if(res.code == 200){
                    data.selected = true
                }
            })
        }
    }

    return { menuList, visible, getMenu, open,onChange };
  },
});
</script>
