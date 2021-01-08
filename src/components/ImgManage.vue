<template>
  <div class="inline-block">
    <a-avatar :src="imgUrl" :size="200" />
    <a-row justify="center">
      <a-upload
        v-model:fileList="fileList"
        list-type="text"
        class="avatar-uploader"
        :show-upload-list="false"
        :action="`/service/${url}`"
        :before-upload="beforeUpload"
        @change="handleChange"
        :headers="{ token: token }"
        name="filename"
        :token="token"
      >
        <a-button class="mt10">更换</a-button>
      </a-upload>
    </a-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { message } from "ant-design-vue";
import store from "@/store/index";
export default defineComponent({
  name: "imgUpload",
  props: {
    url: {
      require: true,
      type: String,
    },
    imgUrl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      loading: false,
      fileList: [],
    };
  },
  computed: {
    token() {
      return (store.state as any).user.token;
    },
  },
  methods: {
    handleChange(info: any) {
      if (info.file.status === "uploading") {
        this.loading = true;
        return;
      }
      if (info.file.status === "done") {
        console.log(info.file.response.data);
        this.$emit("update:imgUrl", info.file.response.data);
      }
      if (info.file.status === "error") {
        this.loading = false;
      }
    },
    beforeUpload(file: any) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("只能上传图片文件");
      }
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        message.error("图片最大为5MB");
      }
      return isJpgOrPng && isLt2M;
    },
  },
});
</script>

<style lang="scss" scoped>
.upload-mask {
  position: relative;
  height: 200px;
  background: red;
  width: 200px;
  bottom: 0px;
  border-bottom-right-radius: 100px;
  border-bottom-left-radius: 100px;
}
.inline-block {
  display: inline-block;
}
.mt10 {
  margin-top: 10px;
}
</style>
