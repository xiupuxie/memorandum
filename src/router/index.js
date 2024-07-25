import { createRouter, createWebHashHistory } from "vue-router";
import api from "@/api/user";

import stores from "@/store/index";
import { storeToRefs } from "pinia";

import routes from "./routes";
let router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// 前置路由守卫
router.beforeEach((to, from, next) => {
  const { loginStore } = stores();
  const { userinfo } = storeToRefs(loginStore);
  const { setUserinfo, setUseradmin } = loginStore;

  let token = localStorage.getItem("token");
  const tokenStartTime = localStorage.getItem("tokenStartTime");
  const timeOver = 20 * 24 * 3600 * 1000;
  let date = new Date().getTime();
  // 如果大于说明是token过期了
  if (date - tokenStartTime > timeOver) {
    token = null;
    localStorage.removeItem("token");
    localStorage.removeItem("tokenStartTime");
  }

  if (to.path === "/login") {
    next();
  } else {
    // 如果不是去的首页,判断token,并且还有本地存储,如果都存在说明是本人,可以放行,否则转到login
    if (token) {
      next();
      // 实时获得用户信息刷新本地存储数据
      api.userinfo(JSON.parse(localStorage.getItem("userinfo"))).then((res) => {
        if (res.data.code == 1) {
          var userinfo = JSON.parse(localStorage.getItem("userinfo"));
          // userinfo.email = res.data.email;
          // userinfo.integral =  res.data.integral
          // userinfo.name =  res.data.name
          // userinfo.state =  res.data.state
          // userinfo.username =  res.data.username
          // userinfo.vip =  res.data.vip
          const { email, integral, name, state, username, vip } = res.data;
          userinfo = {
            ...userinfo,
            email,
            integral,
            name,
            state,
            username,
            vip,
          };
          localStorage.setItem("userinfo", JSON.stringify(userinfo));
          setUserinfo(JSON.stringify(res.data));
        }
      });
    } else {
      alert("token已失效请重新登录!");
      next("/login");
    }
  }
});

export default router;
