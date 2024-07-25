export default [
  {
    path: "/login",
    name: "登录页",
    component: () => import("../pages/login/login.vue"),
  },
  {
    path: "/",
    name: "首页",
    component: () => import("../pages/home/home.vue"),
    children: [
      {
        path: "/",
        name: "首页开始页",
        component: () => import("../pages/home/index.vue"),
      },
      {
        path: "/addmenu",
        name: "录入",
        component: () => import("../pages/home/entering/addmenu.vue"),
      },
      {
        path: "/adminon",
        name: "录入管理",
        component: () => import("../pages/home/entering/adminon.vue"),
      },
      {
        path: "/getlist",
        name: "查询",
        component: () => import("../pages/home/inquire/getlist.vue"),
      },
      {
        path: "/admintw",
        name: "查询管理",
        component: () => import("../pages/home/inquire/admintw.vue"),
      },
      {
        path: "/bug",
        name: "bug",
        component: () => import("../pages/home/qianduan/bug.vue"),
      },
      {
        path: "/text",
        name: "技术分享",
        component: () => import("../pages/home/qianduan/text.vue"),
      },
      {
        path: "/publish",
        name: "发布",
        component: () => import("../pages/home/qianduan/publish.vue"),
      },
      {
        path: "/ai",
        name: "ai",
        component: () => import("../pages/home/ai/index.vue"),
      },
      {
        path: "/inquireapi",
        name: "公共api查询",
        component: () => import("../pages/home/publicPage/inquireapi.vue"),
      },
      {
        path: "/recreationapi",
        name: "娱乐",
        component: () => import("../pages/home/publicPage/recreationapi.vue"),
      },
      {
        path: "/announcement",
        name: "公告通知",
        component: () => import("../pages/home/web/announcement.vue"),
      },
      {
        path: "/account",
        name: "账户管理",
        component: () => import("../pages/home/web/account.vue"),
      },
    ],
  },
  {
    path: "/error",
    name: "error",
    component: () => import("@/pages/error/index.vue"),
  },
];
