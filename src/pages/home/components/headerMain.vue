<template>
  <div class="headerMain">
    <el-row>
      <el-col :span="6">
        <el-statistic title="总计" :value="headersize.sumto" />
      </el-col>
      <el-col :span="6">
        <el-statistic title="已完成" :value="headersize.finished">
        </el-statistic>
      </el-col>
      <el-col :span="6">
        <el-statistic title="未完成" :value="headersize.unfinished" />
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
let headersize = ref({
  sumto: 0,
  finished: 0,
  unfinished: 0,
});
onMounted(() => {
  setTimeout(() => {
    headersize.value.sumto = JSON.parse(
      localStorage.getItem("headersize")
    ).sumto;
    headersize.value.finished = JSON.parse(
      localStorage.getItem("headersize")
    ).finished;
    headersize.value.unfinished = JSON.parse(
      localStorage.getItem("headersize")
    ).unfinished;
  }, 500);
});

</script>
<style scoped lang="scss">
.headerMain {
  border-bottom: 1px solid rgb(212, 212, 212);
}
</style>