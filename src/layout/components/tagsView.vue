<template>
  <a-row class="tagsView">
    <a-popover
      v-for="item in tags"
      :key="item.id"
      style="width: 200px"
      placement="bottom"
      trigger="contextmenu"
    >
      <template #content>
        <div class="tagMenu-button">
          关闭其他
        </div>
        <div class="tagMenu-button">
          关闭左侧
        </div>
        <div class="tagMenu-button">
          关闭右侧
        </div>
      </template>
      <a-tag
        class="header-tag"
        :color="item.id == actived ? 'blue' : ''"
        :closable="true"
        @click="goto(item)"
        @close="handleClose(item)"
      >
        {{ item.name }}
      </a-tag>
    </a-popover>
    <!-- {{tags}} -->
  </a-row>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import store from "@/store/index";
export default defineComponent({
  name: "navbar",
  data() {
    return {
      show: null,
    };
  },
  computed: {
    tags() {
      return (store.state as any).tags.tags;
    },
    actived() {
      return (store.state as any).tags.actived.id;
    },
  },
  methods: {
    handleClose(tag: any) {
      console.log(tag);
      store.commit("tags/REMOVE_TAG", tag.id);
    },
    goto(item: any) {
      store.commit("tags/ACTIVED", item);
      this.$router.push({ path: `/${item.route}` });
    },
  },
});
</script>

<style lang="scss" scoped>
.tagsView {
  height: 40px;
  line-height: 40px;
  background: #ddd;
}
.header-tag {
  margin: 4px 0 4px 4px;
  line-height: 32px;
  height: 32px;
  cursor: pointer;
  & .ant-tag {
    line-height: 40px;
  }
  &:hover {
    color: #1890ff;
    background: #e6f7ff;
    border-color: #91d5ff;
  }
}
.tagMenu-button {
  height: 28px;
  line-height: 28px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
  &:hover {
    background: rgba(0, 162, 255, 0.1);
  }
}
</style>
