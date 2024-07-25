<template>
  <div class="publish" v-loading="loading">
    <el-form :inline="true" :model="params" class="demo-form-inline">
      <el-form-item label="类型">
        <el-select
          v-model="params.type"
          placeholder="选择要发表的类型"
          clearable
          style="width: 180px"
        >
          <el-option label="BUG" value="BUG" />
          <el-option label="Vue" value="Vue" />
          <el-option label="React" value="React" />
          <el-option label="Nodejs" value="Nodejs" />
          <el-option label="Three" value="Three" />
          <el-option label="3D" value="3D" />
          <el-option label="JS" value="JS" />
          <el-option label="CSS" value="CSS" />
          <el-option label="HTML" value="HTML" />
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input
          v-model="params.title"
          placeholder="请输入文章标题"
          clearable
          style="width: 450px"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">发布</el-button>
      </el-form-item>
    </el-form>

    <div style="border: 1px solid #ccc">
      <Toolbar
        style="border-bottom: 1px solid #ccc"
        :editor="editorRef"
        :defaultConfig="toolbarConfig"
        :mode="mode"
      />
      <Editor
        style="height: 500px; overflow-y: hidden"
        v-model="params.text"
        :defaultConfig="editorConfig"
        :mode="mode"
        @onCreated="handleCreated"
      />
    </div>
  </div>
</template>
<script setup>
import "@wangeditor/editor/dist/css/style.css"; // 引入 css
import {
  onBeforeUnmount,
  ref,
  shallowRef,
  onMounted,
  reactive,
  nextTick,
} from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import moment from "moment";
import { ElMessage } from "element-plus";
import api from "@/api/publish";
import { useRouter, useRoute } from "vue-router";
const route = useRoute();

let mode = ref("default");
const loading = ref(false);
let params = ref({
  userid: JSON.parse(localStorage.getItem("userinfo")).userid,
  username: JSON.parse(localStorage.getItem("userinfo")).username,
  name: JSON.parse(localStorage.getItem("userinfo")).name,
  type: "",
  title: "",
  text: "",
  size: 0,
  time: moment().format("YYYY-MM-DD / h:mm:ss"),
});
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

onMounted(() => {
  // 获取路径中的query参数
  let query = route.query;
  if (query.userid && query.textid && query.text) {
    params.value.type = query.type;
    params.value.title = query.title;
    params.value.size = query.size;
    params.value.textid = query.textid;
    nextTick(() => {
      params.value.text = query.text;
    });
  } else {
  }
});

const toolbarConfig = {};
const editorConfig = { placeholder: "请输入内容..." };

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
const onSubmit = async () => {
  if (params.value.text.length < 50) {
    ElMessage.warning("请输入至少40字的内容!");
    return;
  }
  if (params.value.type == "") {
    ElMessage.warning("请选择文章类型");
    return;
  }
  if (params.value.title == "") {
    ElMessage.warning("请输入文章标题");
    return;
  }
  loading.value = true;
  // params.value.text = Base64.encode(params.value.text);
  await api.addtext(params.value).then((res) => {
    if (res.data.code == 1) {
      ElMessage.success(res.data.msg);
      loading.value = false;
      params.value.text = "";
      params.value.type = "";
      params.value.title = "";
    } else {
      ElMessage.error(res.data.msg);
      loading.value = false;
    }
  });
};
</script>
<style scoped>

</style>
