<template>
  <div class="addmenu">
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      label-width="120px"
      class="demo-ruleForm"
      :size="formSize"
      status-icon
      v-loading="loading"
    >
      <el-form-item label="备忘录标题" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>

      <el-form-item label="是否已完成" prop="delivery">
        <el-switch
          v-model="ruleForm.delivery"
          :active-icon="Check"
          :inactive-icon="Close"
          inline-prompt
        />
      </el-form-item>
      <el-form-item label="日期" prop="date">
        <el-date-picker
          v-model="ruleForm.date"
          type="date"
          placeholder="请选择日期"
          clearable
          format="YYYY/MM/DD"
          value-format="YYYY-MM-DD"
        />
      </el-form-item>

      <el-form-item label="内容" prop="text">
        <el-input
          v-model="ruleForm.text"
          type="textarea"
          clearable
          maxlength="254"
          show-word-limit
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm()"> 提交 </el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import { Check, Close } from "@element-plus/icons-vue";
import api from "@/api/setaddlist";
let formSize = ref("default");
const loading = ref(false);
let ruleForm = ref({
  name: "", // 备忘录标题
  delivery: false, // 状态
  text: "", // 内容
  date: "", // 日期
  userid:JSON.parse(localStorage.getItem("userinfo")).userid
});

// 提交
let submitForm = () => {
  // 拿到表单数据
  setaddlist(ruleForm.value);
};
// 提交操作
let setaddlist = (v) => {
  if (v.name != "" && v.text != "" && v.date != "") {
    loading.value = true;
    api.setaddlist(v).then((res) => {
      if (res.data.code == 1) {
        ElMessage.success(res.data.msg);
        loading.value = false;
        resetForm();
      } else {
        ElMessage.error(res.data.message);
        loading.value = false;
      }
    });
  } else {
    ElMessage.error("请填写完整内容!");
  }
};
// 重置
const resetForm = () => {
  ruleForm.value = {
    name: "", // 备忘录标题
    delivery: false, // 状态
    text: "", // 内容
    date: "", // 日期
  };
};
</script>
<style scoped lang="scss">
</style>