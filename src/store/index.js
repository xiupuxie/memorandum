import { loginStore } from "./modules/login.js";
import { homeStore } from "./modules/home.js";

export default function stores() {
  return {
    loginStore: loginStore(), // 登录页面
    homeStore: homeStore(), // 登录页面
  };
}

// 使用案例
// import stores from "@/store/index";
// import { storeToRefs } from 'pinia';
// const { loginStore } = stores();
// const { userinfo } = storeToRefs(loginStore);  // 解构属性
// const { setUserinfo } = loginStore;  // 解构方法
