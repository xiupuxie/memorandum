<template>
  <div class="login">
    <!-- header头部 -->
    <header class="headertitle">
      <img src="@/img/login/logo.png" alt="" srcset="" />
      <div class="titleright">
        <span @click="cooperationFun">联系合作</span>
        <span @click="contributorFun">开发贡献者</span>
      </div>
    </header>
    <!-- 登录模块 -->
    <div class="nav">
      <p class="title">该网站未开启注册,需要账号请联系管理员</p>
      <el-input
        v-model="params.username"
        placeholder="Account"
        clearable
        size="large"
        @keyup.enter="gotoIndex"
      />
      <el-input
        v-model="params.password"
        placeholder="Password"
        type="password"
        clearable
        size="large"
        @keyup.enter="gotoIndex"
      />
      <el-button type="primary" @click="gotoHome">登录</el-button>
    </div>
    <!-- 左边,公告栏 -->
    <div class="left">
      <nav class="text">
        <h3 style="padding-bottom: 15px">公告栏</h3>
        <!-- 无限滚动组件 -->
        <ul
          v-infinite-scroll="load"
          class="infinite-list"
          style="overflow: auto"
        >
          <li
            v-for="item in noticeboard"
            :key="item.id"
            class="infinite-list-item"
            @click="notidialog(item.text)"
          >
            <span>{{ item.title }}</span> <span>{{ item.data }}</span>
          </li>
          <p style="width: 100%; height: 18px"></p>
        </ul>
      </nav>
      <!-- 轮播图 暂时不添加 -->
    </div>
    <!-- 底部版权模块 -->
    <footer class="footer">
      Made with ❤️ by <span class="spn" @click="goweixin">jiexiupu</span>
    </footer>
    <!-- 联系合作弹出层 -->
    <el-dialog v-model="cooperation" title="添加请备注来由!" width="30%">
      <span>E-mail: 2691451749@qq.com</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cooperation = false">取消</el-button>
          <el-button type="primary" @click="cooperation = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 公告弹出 -->
    <el-dialog v-model="notice" title="详情" width="50%">
      <span>{{ noticetext }}</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="notice = false">取消</el-button>
          <el-button type="primary" @click="notice = false"> 确定 </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 开发贡献者弹出层 -->
    <el-dialog v-model="contributor" title="本网站贡献者" width="50%">
      <div class="contributor">
        <div v-for="item in contributorlist" :key="item.url">
          <el-avatar :src="item.image" />
          <span class="spn" @click="gethub(item.url)">{{ item.name }}</span>
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="contributor = false">取消</el-button>
          <el-button type="primary" @click="contributor = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 动画人物 -->
    <canvas
      id="canvas_view"
      style="position: absolute; width: 100%; height: 100%; z-index: -1"
    ></canvas>
    <!-- 网站访问次数 -->
    <div class="visitorcount">
      本网站已被访问 <span class="spn">{{ visitorcount }}</span> 次......
    </div>
  </div>
</template>
<script setup>
import { init } from "../../components/index.js";
import { draw } from "../../components/tip.js";
import { ElMessage } from "element-plus";
import api from "@/api/login";
import Crypto from "@/util/crypto";
import { ref, onMounted } from "vue";
import stores from "@/store/index";
import { storeToRefs } from "pinia";
const { loginStore } = stores();
const { userinfo } = storeToRefs(loginStore);
const { setUserinfo, setUseradmin } = loginStore;
import { useRouter } from "vue-router";
const router = useRouter();
// 访问人数
const visitorcount = ref(0);
// 网站合作对话框
const cooperation = ref(false);
// 开发贡献者对话框
const contributor = ref(false);
// 公告列表
const noticeboard = ref([]);
// 公告弹窗
const notice = ref(false);
// 公告详情
const noticetext = ref("");
// 贡献者列表
const contributorlist = ref([
  {
    name: "余浪",
    image:
      "https://foruda.gitee.com/avatar/1705394270960142384/10701696_yu-lang666_1705394270.png!avatar200",
    url: "https://gitee.com/yu-lang666",
  },
]);
// 登录入参
const params = ref({
  username: "",
  password: "",
});

// 初始化
onMounted(async () => {
  // 获取访问人数总量,并+1
  await api.getvisitorcount().then((res) => {
    if (res.data.code == 1) {
      visitorcount.value = res.data.count;
    }
  });
  // 获取公告栏内容
  getnoticeboard();
  // 渲染动画人物
  init();
  draw();
});
// 开发贡献跳转
const gethub = (url) => {
  window.open(url, "_blank");
};
// 跳转个人微信gitee链接
const goweixin = () => {
  console.log(1);
};
// 登录跳转
const gotoHome = () => {
  params.value.password = Crypto.encrypt(params.value.password);
  // 调用登录接口并存储token设置有效期
  api.login(params.value).then((res) => {
    if (res.data.code == 1) {
      ElMessage.success("登陆成功!");
      localStorage.setItem("tokenStartTime", new Date().getTime());
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userinfo", JSON.stringify(res.data));
      if (res.data.name == "admin" && res.data.userid == "1") {
        let boole = "true";
        setUseradmin(boole);
      } else {
        let boole = "false";
        setUseradmin(boole);
      }
      setUserinfo(JSON.stringify(res.data));
      router.push("/");
    } else {
      ElMessage.error(res.data.msg);
    }
  });
};
// 输入框回车登录
const gotoIndex = () => {
  if (!params.value.username) {
    ElMessage.error("账号不能为空");
  } else if (!params.value.password) {
    ElMessage.error("密码不能为空");
  } else {
    gotoHome();
  }
};
// 公告栏请求数据
const getnoticeboard = async () => {
  await api.noticeboard().then((res) => {
    if (res.data.code == 1) {
      noticeboard.value = res.data.list;
    }
  });
};

// 公告底部触底触发函数
const load = () => {
  // count.value += 2;
};

// 联系合作
const cooperationFun = () => {
  cooperation.value = true;
};
// 开发贡献
const contributorFun = () => {
  contributor.value = true;
};
// 公告弹出
const notidialog = (text) => {
  notice.value = true;
  noticetext.value = text;
};
</script>
<style scoped lang="scss">
.login {
  .headertitle {
    width: 100%;
    height: 60px;
    box-shadow: 9px 9px 20px rgba(0, 0, 0, 0.2),
      -9px -9px 20px rgba(255, 255, 255, 1);
    line-height: 60px;
    display: flex;
    border-bottom: 1px solid #ebeef5;
    justify-content: space-between;
    .titleright {
      //  width: 100%;
      span {
        width: 120px;
        display: inline-block;
        font-size: 14px;
        &:hover {
          color: #409eff;
          cursor: pointer;
        }
      }
    }
    img {
      // width: 55px;
      height: 60px;
      margin-left: 30px;
    }
  }
  .nav {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 300px;
    position: absolute;
    right: 13%;
    top: 20%;
    padding: 20px;
    box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.127),
      -18px -18px 30px rgba(255, 255, 255, 1);
    transition: all 0.2s ease-out;
    &:hover {
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2),
        0px 0px 0px rgba(255, 255, 255, 0.8),
        inset 18px 18px 30px rgba(0, 0, 0, 0.1),
        inset -18px -18px 30px rgba(255, 255, 255, 1);
    }
    .title {
      width: 250px;
      text-align: center;
      font-size: 12px;
      color: #ccc;
    }
    .el-input {
      margin-top: 15px;
      width: 250px;
    }
    .el-button {
      width: 300px;
      margin-top: 15px;
      height: 40px;
    }
  }
  .left {
    width: 50%;
    height: 70%;
    position: absolute;
    left: 6%;
    top: 13%;
    box-sizing: border-box;
    padding: 15px;
    color: #5d5d5d;
    box-shadow: 18px 18px 30px rgba(0, 0, 0, 0.2),
      -18px -18px 30px rgba(255, 255, 255, 1);
    transition: all 0.2s ease-out;

    &:hover {
      cursor: pointer;
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0.2),
        0px 0px 0px rgba(255, 255, 255, 0.8),
        inset 18px 18px 30px rgba(0, 0, 0, 0.1),
        inset -18px -18px 30px rgba(255, 255, 255, 1);
    }
    // 公告栏无限滚动样式 start
    //隐藏滚动条
    .infinite-list {
      margin-top: 15px;
      white-space: nowrap;
      overflow-x: auto;
      overflow-y: hidden;
      padding: 0 0 1rem;
      margin-bottom: -2rem;
      -webkit-overflow-scrolling: touch;
      overflow: -moz-scrollbars-none;
      overflow: -moz-scrollbars- none;
      padding: 0;
      margin: 0;
      list-style: none;
      height: 95%;
      .infinite-list-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 45px;
        border-bottom: 1px solid #c8c7c7;
        margin: 10px;
        color: #6f6f6f;
        box-sizing: border-box;
        padding: 0 10px 0px 10px;
        font-size: 14px;
        &:hover {
          color: #409eff;
        }
      }
    }
    .infinite-list::-webkit-scrollbar {
      display: none;
    }
    // 公告栏无限滚动样式 end
    &:hover .text {
      transform: scale(0.95);
    }
    .text {
      text-align: center;
      transition: all 0.2s ease-out;
      overflow-y: hidden;
      height: 95%;
    }
  }

  .footer {
    width: 100%;
    height: 30px;
    text-align: center;
    position: absolute;
    bottom: 0;
    font-size: 12px;
    .spn {
      color: #409eff;
      cursor: pointer;
    }
  }
  .contributor {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    width: 100%;
    div {
      margin-left: 10px;
      display: flex;
      align-items: center;
      padding-bottom: 15px;
      .spn {
        margin-left: 10px;
        &:hover {
          color: red;
          cursor: pointer;
        }
      }
    }
  }
  .visitorcount {
    width: 14%;
    height: 80px;
    line-height: 70px;
    text-align: center;
    position: absolute;
    right: 13%;
    top: 55%;
    font-size: 14px;
    color: #aaaaaa;
    border: 1px solid #eeeeee;
    border-radius: 15px;
    background-color: #ffffff;
    box-shadow: 3px 3px 4px rgba(0, 0, 0, 0.2),
      1px 1px 1px 1px rgba(0, 0, 0, 0.1);
    .spn {
      color: #409eff;
    }
    &::before {
      content: " ";
      position: absolute;
      right: 100%;
      top: 75%;
      right: -9.3%;
      margin: -5px 0 0;
      border: 10px solid transparent;
      border-right-color: #b5b5b594;
      transform: rotate(180deg);
    }

    &::after {
      content: " ";
      position: absolute;
      right: 100%;
      top: 73%;
      right: -7%;
      transform: rotate(180deg);
      margin-top: -2px;
      border: 8px solid transparent;
      border-right-color: #fff;
    }
  }
}
</style>
