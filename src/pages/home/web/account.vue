<template>
  <div class="addmenu">
    <div style="margin: 0px 0px 20px 120px">
      <el-input
        v-model="userAccount"
        placeholder="输入要查询的用户/账号"
        clearable
        style="width: 230px"
      /><el-button
        type="primary"
        style="margin-left: 20px"
        @click="setUserinfo()"
        >查询</el-button
      >
    </div>
    <el-form
      ref="ruleFormRef"
      :model="ruleForm"
      label-width="120px"
      :size="formSize"
      status-icon
      v-loading="loading"
    >
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" />
      </el-form-item>
      <el-form-item label="昵称" prop="name">
        <el-input v-model="ruleForm.name" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="ruleForm.email" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm()"> 提交 </el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>

    <el-dialog v-model="contributor" title="查询用户信息" width="50%">
      <ul class="contributor">
        <li
          style="list-style: none"
          v-for="item in userdetail"
          :key="item.userid"
        >
          账号: {{ item.name }} / 密码: {{ item.password }} / 昵称 :{{
            item.name
          }}
          / 邮箱: {{ item.email }} <span class="revamp">修改</span
          ><span class="detail" @click="userremove(item.userid)">删除</span>
        </li>
      </ul>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="contributor = false">取消</el-button>
          <el-button type="primary" @click="contributor = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import api from "@/api/web";
let formSize = ref("default");
const loading = ref(false);
let userAccount = ref(""); // 要查询的用户名
let contributor = ref(false); // 查询详情的弹窗
let userdetail = ref([]); // 详情
let ruleForm = ref({
  username: "",
  password: "",
  name: "",
  email: "",
  userid: JSON.parse(localStorage.getItem("userinfo")).userid,
});

// 提交
let submitForm = () => {
  // 拿到表单数据
  addUsers(ruleForm.value);
};
// 提交操作
let addUsers = (v) => {
  if (
    v.username != "" &&
    v.password != "" &&
    v.email != "" &&
    v.name != "" &&
    v.userid == "1"
  ) {
    loading.value = true;
    api.addUsers(v).then((res) => {
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
    username: "",
    password: "",
    name: "",
    email: "",
    userid: JSON.parse(localStorage.getItem("userinfo")).userid,
  };
};
// 查询
const setUserinfo = () => {
  let params = {
    username: userAccount.value,
    userid: JSON.parse(localStorage.getItem("userinfo")).userid,
  };
  api.setUserinfo(params).then((res) => {
    if (res.data.code == "1") {
      userdetail.value = res.data.list;
      ElMessage.success(res.data.msg);
      contributor.value = true;
    } else {
      ElMessage.error(res.data.msg);
    }
  });
};
// 删除
const userremove = (userid) => {
  api
    .userremove({
      userid: userid,
    })
    .then((res) => {
      if (res.data.code == 1) {
        ElMessage.success(res.data.msg);
      } else {
        ElMessage.error(res.data.msg);
      }
    });
};
</script>
<style scoped lang="scss">
.addmenu {
  .contributor {
    .revamp {
      color: rgb(64, 158, 255);
      cursor: pointer;
      margin-left: 50px;
      &:hover {
        color: rgb(26, 139, 252);
      }
    }
    .detail {
      color: rgb(207, 66, 66);
      cursor: pointer;
      margin-left: 15px;
      &:hover {
        color: rgb(238, 4, 4);
      }
    }
  }
}
</style>
