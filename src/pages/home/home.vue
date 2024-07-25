<template>
  <!-- <el-watermark :content="['Function']"> -->
  <div class="common-layout">
    <el-container>
      <el-aside width="200px" class="leftMain">
        <el-scrollbar >
          <!-- :default-openeds="['1', '2', '3','4','5']" -->
          <el-menu :default-openeds="['1', '2', '3','4','5','6']">
            <el-sub-menu index="1">
              <template #title>
                <el-icon><EditPen /></el-icon>录入管理
              </template>
              <router-link to="/addmenu"
                ><el-menu-item index="1-1">录入</el-menu-item></router-link
              >
              <!-- <router-link to="/adminon"
                ><el-menu-item index="1-2">管理</el-menu-item></router-link
              > -->
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title
                ><el-icon><message /></el-icon>查询历史单</template
              >
              <router-link to="/getlist"
                ><el-menu-item index="2-1">查询</el-menu-item></router-link
              >
              <!-- <router-link to="/admintw"
                ><el-menu-item index="2-2">管理</el-menu-item></router-link
              > -->
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title
                ><el-icon><Monitor /></el-icon>前端技术</template
              >
              <!-- <router-link to="/bug"
                ><el-menu-item index="3-1">BUG</el-menu-item></router-link
              > -->
              <router-link to="/text"
                ><el-menu-item index="3-1">技术分享</el-menu-item></router-link
              >
              <router-link to="/publish"
                ><el-menu-item index="3-3">发布</el-menu-item></router-link
              >
            </el-sub-menu>
            <!-- <el-sub-menu index="4">
              <template #title
                ><el-icon><MagicStick /></el-icon>A I</template
              >
              <router-link to="/ai"
                ><el-menu-item index="4-1">GPT 3.5</el-menu-item></router-link
              >
            </el-sub-menu> -->
            <el-sub-menu index="5">
              <template #title
                ><el-icon><Menu /></el-icon>小工具</template
              >
              <router-link to="/inquireapi"
                ><el-menu-item index="5-1">查询</el-menu-item></router-link
              >
               <!-- <router-link to="/recreationapi"
                ><el-menu-item index="5-2">娱乐</el-menu-item></router-link
              > -->
            </el-sub-menu>
            <el-sub-menu index="6" v-if="useradmin">
              <template #title
                ><el-icon><MostlyCloudy /></el-icon>网站终端管理</template
              >
              <router-link to="/announcement"
                ><el-menu-item index="6-1">公告通知</el-menu-item></router-link
              >
               <router-link to="/account"
                ><el-menu-item index="6-2">账户管理</el-menu-item></router-link
              >
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-container>
        <el-header class="headerMain" v-if="pathurl == '/'">
          <headerMain />
        </el-header>
        <el-header class="headerMain" v-if="pathurl !== '/'">
          <!-- 工具栏 -->
          <headerInstrument />
        </el-header>
        <el-main class="rightMain">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <!-- </el-watermark> -->
</template>
<script setup>
import { onMounted, ref, watch, watchEffect } from "vue";
import moment from "moment";
import { Message, EditPen, MagicStick,Menu ,Monitor,MostlyCloudy} from "@element-plus/icons-vue";
import headerMain from "./components/headerMain.vue";
import headerInstrument from "./components/headerInstrument.vue";
import { useRouter, useRoute } from "vue-router";
import stores from "@/store/index";
import { storeToRefs } from 'pinia';
const { loginStore } = stores();
const { useradmin } = storeToRefs(loginStore);  // 解构属性
// const { setUserinfo } = loginStore;  // 解构方法

let router = useRouter(),
  route = useRoute();
import { ElNotification } from "element-plus";

import api from "@/api/getlist";
let newsize = ref(0);
let headersize = ref({
  sumto: 0,
  finished: 0,
  unfinished: 0,
});
let pathurl = ref("");

let caidanadmin = ref(false)
onMounted(() => {
  getlist();
});
// watchEffect监听路由
watchEffect(() => {
  pathurl.value = router.currentRoute.value.path;
  // console.log(pathurl.value);
});

// 获取数据
const getlist = () => {
  newsize.value = 0;
  let parms = {
    type:"headersize",
    userid:JSON.parse(localStorage.getItem("userinfo")).userid,
  }
  api.getlist(parms).then((res) => {
    headersize.value.sumto = res.data.total;
    res.data.list.forEach((item) => {
      if (moment().format("YYYY-MM-DD") == item.data) {
        newsize.value++;
      }
      if (item.state == 1) {
        headersize.value.finished++;
      } else {
        headersize.value.unfinished++;
      }
    });
    // 存入本地
    localStorage.setItem("headersize", JSON.stringify(headersize.value));
  });
  setTimeout(() => {
    if (newsize.value >= 1) {
      // console.log("666");
      ElNotification({
        title: "新消息提醒",
        message: `有 ${newsize.value} 条备忘录今天截至`,
      });
    }
  }, 1000);
};
</script>
<style scoped lang="scss">
.leftMain {
  box-sizing: border-box;
  height: 100vh;
  border-right: 1px solid rgb(223, 223, 223);
  .el-menu {
    border: none;
  }
}
.headerMain {
  padding: 8px 0px 10px 10px;
}
.rightMain {
  margin-top: 20px;
}
</style>
