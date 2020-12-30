<template>
  <div>
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    name:"MainApp"
})
</script>