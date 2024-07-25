<template>
  <div class="dialog">
    <el-dialog v-model="cooperation" width="30%">
      <div v-if="dialogpagtype == 1">
        <p>年龄: {{ dialogpaglist.age }}</p>
        <p>户籍: {{ dialogpaglist.area }}</p>
        <p>生日: {{ dialogpaglist.birthday }}</p>
        <p>所在市: {{ dialogpaglist.city }}</p>
        <p>星座: {{ dialogpaglist.constellation }}</p>
        <p>性别: {{ dialogpaglist.gender }}</p>
        <p>生肖: {{ dialogpaglist.zodiac }}</p>
      </div>
      <div v-if="dialogpagtype == 2">
        <img :src="dialogpaglist" alt="" />
      </div>
      <div v-if="dialogpagtype == 3">
        <p>区号: {{ dialogpaglist.area_code }}</p>
        <p>省份: {{ dialogpaglist.province }}</p>
        <p>市区: {{ dialogpaglist.city }}</p>
        <p>运营商: {{ dialogpaglist.isp }}</p>
        <p>邮编: {{ dialogpaglist.post_code }}</p>
      </div>
      <div v-if="dialogpagtype == 4">
        <p>ip: {{ dialogpaglist.ip }}</p>
        <p>国家: {{ dialogpaglist.country }}</p>
        <p>省份: {{ dialogpaglist.region }}</p>
        <p>省份邮编: {{ dialogpaglist.region_id }}</p>
        <p>市区: {{ dialogpaglist.city }}</p>
        <p>运营商: {{ dialogpaglist.isp }}</p>
        <p>运营商id: {{ dialogpaglist.isp_id }}</p> 
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cooperation = false">取消</el-button>
          <el-button type="primary" @click="adddialogpage">确定 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import stores from "@/store/index";
import { storeToRefs } from "pinia";
const { homeStore } = stores();
const { dialogpagtype, dialogpaglist } = storeToRefs(homeStore); // 解构属性
const { setdialogpagtype } = homeStore; // 解构方法

import { ref, defineExpose, onMounted } from "vue";
const cooperation = ref(false);
const dialogpage = ref("");
const getdialog = () => {
  cooperation.value = true;
};
// 1: 查询身份证归属地
const adddialogpage = () => {
  cooperation.value = false;
};
defineExpose({
  getdialog,
});
</script>
<style scoped lang="scss"></style>
