<template>
  <div class="headerInstrument">
    <el-tag type="info" style="width: 250px">
      <span>你好!</span>
      <svg class="icon" aria-hidden="true">
        <use v-if="vip == 1" xlink:href="#icon-chuangxiangqingtongvip"></use>
        <use v-if="vip == 2" xlink:href="#icon-chuangxiangbaiyinvip"></use>
        <use v-if="vip == 3" xlink:href="#icon-chuangxianghuangjinvip"></use>
        <use v-if="vip == 4" xlink:href="#icon-chuangxiangzijinvip"></use>
        <use v-if="vip == 5" xlink:href="#icon-chuangxiangzuanshivip"></use>
        <use v-if="vip == 6" xlink:href="#icon-chuangxiangzhizunvip"></use></svg
      ><span>{{ personalUser.username }}</span>
      <span style="margin-left: 10px">签到点: {{ integral }}</span>
    </el-tag>
    <el-button
      type="primary"
      plain
      v-for="item in list"
      :key="item.id"
      :disabled="item.disabled"
      @click="Instrument(item.id)"
      >{{ item.title }}</el-button
    >

    <el-dialog v-model="cooperation" title="修改密码" width="30%">
      <div class="setPassword">
        <el-input v-model="params.password" placeholder="Password" />
        <el-input v-model="params.code" placeholder="请输入验证码" />
        <el-button type="primary" plain @click="sendmail" :disabled="mailShow"
          >发送验证码</el-button
        >
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cooperation = false">取消</el-button>
          <el-button type="primary" @click="setPassword"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 个人中心 -->
    <el-dialog v-model="personal" title="个人中心" width="40%">
      <el-form
        label-position="right"
        label-width="100px"
        :model="personalUser"
        style="max-width: 460px"
      >
        <el-form-item label="账号">
          <el-input v-model="personalUser.username" disabled />
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="personalUser.name" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="personalUser.email" />
        </el-form-item>
        <el-form-item label="验证码">
          <el-input v-model="personalUser.code" />
          <el-button
            type="primary"
            plain
            @click="sendmail"
            :disabled="mailShow"
            style="margin-top: 15px"
            >发送验证码</el-button
          >
        </el-form-item>
      </el-form>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="personal = false">取消</el-button>
          <el-button type="primary" @click="setPersonalUser"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { ElMessage } from "element-plus";
// 接口
import api from "@/api/user";
// 工具列表
import lists from "./js/headerInstrument";
let list = ref(lists);
// 路由
import { useRouter } from "vue-router";
const router = useRouter();
// store
import stores from "@/store/index";
import { storeToRefs } from "pinia";
const { loginStore } = stores();
const { userinfo } = storeToRefs(loginStore);
const { setUserinfo } = loginStore;
// vue
import { ref, onMounted } from "vue";
// 用户名
let userName = ref("");
// 修改密码弹窗
let cooperation = ref(false);
// 个人中心弹窗
let personal = ref(false);

// vip等级
let vip = JSON.parse(userinfo.value).vip;
// // 签到按钮状态
// let signin = ref(false);
// 修改密码入参
let params = ref({
  password: "",
  code: "",
  userid: JSON.parse(userinfo.value).userid,
});
// 用户信息
let personalUser = ref({
  username: JSON.parse(userinfo.value).username,
  name: JSON.parse(userinfo.value).name,
  email: JSON.parse(userinfo.value).email,
  code: "",
  userid: JSON.parse(userinfo.value).userid,
});
// 积分
let integral = ref(JSON.parse(userinfo.value).integral);
// 控制发送验证码按钮的状态
let mailShow = ref(false);
onMounted(() => {
  let name = JSON.parse(userinfo.value).name;
  let state = JSON.parse(localStorage.getItem("userinfo")).state;
  // console.log(state != "1");
  if (state != "1") {
    list.value.forEach((item) => {
      if (item.id == 5) {
        item.title = "已签到";
        item.disabled = true;
      }
    });
  } else {
    list.value.forEach((item) => {
      if (item.id == 5) {
        item.title = "每日签到";
        item.disabled = false;
      }
    });
  }
});
// 工具箱点击函数
let Instrument = (id) => {
  // 判断点的是哪个按钮
  if (id == 4) {
    // 清除localStorage里面的所有值，并返回登录页
    localStorage.clear();
    router.push("/login");
  } else if (id == 3) {
    // 弹出修改密码的弹窗
    cooperation.value = true;
  } else if (id == 5) {
    // 每日签到
    api.signin(personalUser.value).then((res) => {
      if (res.data.code == 1) {
        ElMessage.success(res.data.msg);
        list.value.forEach((item) => {
          if (item.id == 5) {
            // console.log("找到了");
            item.title = "已签到";
            item.disabled = true;
            var userinfo = JSON.parse(localStorage.getItem("userinfo"));
            userinfo.state = "2";
            localStorage.setItem("userinfo", JSON.stringify(userinfo));
          }
        });
      } else {
        ElMessage.error(res.data.msg);
      }
    });
  } else if (id == 1) {
    // 个人中心弹窗
    personal.value = true;
  }
};
// 发送验证码
const sendmail = () => {
  mailShow.value = true;
  setTimeout(() => {
    mailShow.value = false;
  }, 30000);
  api.useremail({ userid: JSON.parse(userinfo.value).userid }).then((res) => {
    if (res.data.code == 1) {
      ElMessage.success("发送成功!");
    } else {
      ElMessage.error(res.data.msg);
    }
  });
};
// 确定修改密码
const setPassword = () => {
  if (
    params.value.code != "" &&
    params.value.password != "" &&
    mailShow.value == true
  ) {
    api.setPassword(params.value).then((res) => {
      if (res.data.code == 1) {
        ElMessage.success("修改成功!");
        localStorage.clear();
        router.push("/login");
      } else {
        ElMessage.error(res.data.msg);
      }
    });
  } else {
    ElMessage.warning("请填写完整的新密码和验证码!");
  }
};
// 修改用户信息
const setPersonalUser = () => {
  if (
    personalUser.value.code != "" &&
    personalUser.value.username != "" &&
    personalUser.value.name != "" &&
    personalUser.value.email != "" &&
    mailShow.value == true
  ) {
    api.setPersonalUser(personalUser.value).then((res) => {
      if (res.data.code == 1) {
        ElMessage.success("修改成功!");
        localStorage.clear();
        router.push("/login");
      } else {
        ElMessage.error(res.data.msg);
      }
    });
  } else {
    ElMessage.warning("请填写完整的新密码和验证码!");
  }
};
</script>
<style scoped lang="scss">
.headerInstrument {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 50px;
  border-bottom: 1px solid #cccccca6;

  .el-button {
    margin-right: 15px;
  }

  .el-tag {
    margin-right: 15px;
  }

  .setPassword {
    display: flex;
    flex-direction: column;
    align-items: center;

    .el-input {
      height: 35px;
      // width: 200px;
      margin-top: 15px;
    }

    .el-button {
      margin-top: 15px;
      width: 180px;
    }
  }

  .icon {
    margin-top: 5px;
    width: 60px;
    vertical-align: -0.65em;
    fill: currentColor;
    overflow: hidden;
    text-align: center;
    display: inline;
    height: 20px;
  }
}
</style>
