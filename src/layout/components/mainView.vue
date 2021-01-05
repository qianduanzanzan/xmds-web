<template>
  <div>
    <router-view v-slot="{ Component }">
      <keep-alive :include="cachedViews">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store/index";
export default defineComponent({
  name: "MainApp",
  computed:{
    cachedViews(){
      return (store.state as any).tags.tags.map((item:any) => {
        return item.route
      })
    }
  }
});
</script>
