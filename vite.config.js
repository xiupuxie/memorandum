import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
const pathResolve = (dir) => resolve(__dirname, dir);

export default defineConfig({
  plugins: [vue()],
  // server: {
  //   proxy: {
  //     "/qrcodeurl": {
  //       target: "http://newzuo.com",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/qrcodeurl/, ""), // 不可以省略rewrite
  //     },
  //     "/phoneurl": {
  //       target: "http://zj.v.api.aa1.cn",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/phoneurl/, ""), // 不可以省略rewrite
  //     },
  //     "/ipurl": {
  //       target: "http://suapi.net",
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/ipurl/, ""), // 不可以省略rewrite
  //     },
  //     "/douyinurl": {
  //       target: "http://v.api.aa1.cn",
  //       changeOrigin: true,
  //       secure: true,  //是否https接口
  //       rewrite: (path) => path.replace(/^\/douyinurl/, ""), // 不可以省略rewrite
  //     },
  //   },
  // },
  
  resolve: {
    alias: {
      "@": pathResolve("./src"), // 新增
    },
  },
});
