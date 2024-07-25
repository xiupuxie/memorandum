<template>
  <div class="inquireapi">
    <div class="inquireapi_identitycard">
      <el-input v-model="identitycard" placeholder="请输入身份证号" clearable />
      <el-button type="primary" plain @click="identitycardinquire"
        >查询身份证号归属地</el-button
      >
    </div>
    <!-- <div class="inquireapi_identitycard inquireapi_qrcode">
      <el-input v-model="qrcodetext" placeholder="请输入文本" clearable />
      <el-button type="primary" plain @click="qrcodefn"
        >文本转化二维码</el-button
      >
    </div> -->
    <div class="inquireapi_identitycard inquireapi_phone">
      <el-input v-model="phonetext" placeholder="请输入手机号" clearable />
      <el-button type="primary" plain @click="phonefn"
        >查询手机号码归属地</el-button
      >
    </div>
    <div class="inquireapi_identitycard inquireapi_ip">
      <el-input v-model="iptext" placeholder="请输入ip" clearable />
      <el-button type="primary" plain @click="ipfn">查询ip归属地</el-button>
    </div>
    <dialogpage ref="dialogpageref"></dialogpage>
  </div>
</template>
<script setup>
import stores from "@/store/index";
import { storeToRefs } from "pinia";
const { homeStore } = stores();
const { dialogpagtype } = storeToRefs(homeStore); // 解构属性
const { setdialogpagtype, setdialogpaglist } = homeStore; // 解构方法

import api from "@/api/publicPage.js";
import { ref, nextTick } from "vue";
import { ElMessage } from "element-plus";
import dialogpage from "../components/dialogpage.vue";
// 身份证号
const identitycard = ref("");
// 弹窗
let dialogpageref = ref(null);
// 二维码文本
let qrcodetext = ref("");
// 手机号
let phonetext = ref("");
// ip
let iptext = ref("");
// 身份证
const identitycardinquire = () => {
  let shenfenzheng = `https://tools.mgtv100.com/external/v1/identity_info/query?idCard=${identitycard.value}`;
  if (identitycard.value == "") {
    ElMessage.error("请输入身份证号!");
    return;
  }
  api.publicPage(shenfenzheng).then((res) => {
    let data = JSON.parse(res.data);
    if (data.code == 200) {
      ElMessage.success("查询成功");
      setdialogpagtype(1);
      setdialogpaglist(data.data);
      dialogpageref.value.getdialog();
    } else {
      ElMessage.error(data.msg);
    }
  });
};
// 二维码
const qrcodefn = () => {
  // let qrcodefn = `https://newzuo.com/core/qrcode.php?string==${qrcodetext.value}`;
  // if (qrcodetext.value == "") {
  //   ElMessage.error("请输入文本!");
  //   return;
  // }
  // api.publicPage(qrcodefn).then((res) => {
  //   // dialogpageref.value.getdialog();
  //   // if (res.data) {
  //   //   ElMessage.success("转化成功!");
  //   //   setdialogpagtype(2);
  //   //   setdialogpaglist(qrcodetext.value);
  //   //   setdialogpaglist(
  //   //     `https://newzuo.com/core/qrcode.php?string==${qrcodetext.value}`
  //   //   );
  //   //   dialogpageref.value.getdialog();
  //   // } else {
  //   //   ElMessage.error("出问题了,请稍后再试!");
  //   // }
  // });
};
// 手机号
const phonefn = () => {
  // https://zj.v.api.aa1.cn/api/phone/2024/?num=133
  let phone = `https://zj.v.api.aa1.cn/api/phone/2024/?num=${phonetext.value}`;
  if (phonetext.value == "") {
    ElMessage.error("请输入手机号!");
    return;
  }
  api.publicPage(phone).then((res) => {
    let data = JSON.parse(res.data);
    if (data.code == 200) {
      ElMessage.success("查询成功");
      setdialogpagtype(3);
      setdialogpaglist(data.data[0]);
      dialogpageref.value.getdialog();
    } else {
      ElMessage.error(data.msg);
    }
  });
};
// ip
const ipfn = () => {
  // https://suapi.net/api/ip/getipinfo?ip=127.0.0.1
  let ip = `https://suapi.net/api/ip/getipinfo?ip=${iptext.value}`;
  if (iptext.value == "") {
    ElMessage.error("请输入ip!");
    return;
  }
  api.publicPage(ip).then((res) => {
    let data = JSON.parse(res.data);
    if (data.code == 200) {
      ElMessage.success("查询成功");
      setdialogpagtype(4);
      setdialogpaglist(data.data);
      dialogpageref.value.getdialog();
    } else {
      ElMessage.error(data.msg);
    }
  });
};
</script>
<style scoped lang="scss">
.inquireapi {
  height: 650px;
  display: flex;
  flex-wrap: wrap;

  .el-input {
    width: 300px;
    height: 45px;
  }
  .el-button {
    height: 40px;
    width: 300px;
  }
  .inquireapi_identitycard {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
    height: 50%;
    .el-button {
      margin-top: 20px;
    }
  }
}
</style>
