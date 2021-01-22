<template>
  <div class="clearfix">
    <a-upload
      action="/service/pic/upload"
      list-type="picture-card"
      :file-list="fileLists"
      @preview="handlePreview"
      @change="handleChange"
      :before-upload="beforeUpload"
      :headers="{ token: token }"
      name="file"
    >
      <div v-if="fileLists.length < 5">
        <plus-outlined />
        <div class="ant-upload-text">Upload</div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref,toRefs,watch } from "vue";
import { message } from "ant-design-vue";
import { PlusOutlined } from '@ant-design/icons-vue';
import { del } from '@/api/pic'
import store from "@/store/index";
function getBase64(file: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
export default defineComponent({
  name: "imgUpload",
  components:{
      PlusOutlined
  },
  props: {
    imgs:{
        required:true,
        type: Array
    }
  },
//   watch:{
//       imgs(val)
//   },
  setup(props,context) {
    const previewVisible = ref(false);
    const fileLists:any = ref([]);
    const previewImage = ref("");
    const {imgs} = toRefs(props)

    fileLists.value = imgs.value

    const handleCancel = () => {
      previewVisible.value = false;
    };
    const handlePreview = async (file: any) => {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      previewImage.value = file.url || file.preview;
      previewVisible.value = true;
    };
    const handleChange = ({ fileList }: any) => {
      fileLists.value = fileList;
      const data = fileLists.value.map((item:any) => {
          return item.url || (item.response ? item.response.data : '')
      })
      context.emit("onChange",data)
    };

    return {previewVisible,fileLists,previewImage,handleCancel,handlePreview,handleChange}
  },
  data() {
    return {
      loading: false,
    //   fileList: [],
      aaa: "",
    };
  },
  computed: {
    token() {
      return (store.state as any).user.token;
    },
  },
  methods: {
    beforeUpload(file: any) {
      const isJpgOrPng =
        file.type === "image/jpeg" || file.type === "image/png";
      if (!isJpgOrPng) {
        message.error("只能上传图片文件");
      }
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isLt5M) {
        message.error("图片最大为5MB");
      }
      return isJpgOrPng && isLt5M;
      // if (isJpgOrPng && isLt5M) {
      //   const reader = new FileReader();
      //   reader.onload = (e) => {
      //     this.aaa = (e as any).target.result;
      //   };
      //   reader.readAsDataURL(file);
      // }
      // return false;
    },
  },
});
</script>

<style lang="scss" scoped>
.inline-block {
  display: inline-block;
}
.mt10 {
  margin-top: 10px;
}
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
