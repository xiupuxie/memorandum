import axios from "axios";
import router from "@/router";
// 创建一个axios实例
const http = axios.create({
  timeout: 15000, // 请求超时时间
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// 封装GET请求
export const get = (url, data) => {
  return http.get(url, data);
};

// 封装POST请求
export const post = (url, data) => {
  return http.post(url, data);
};
// 添加请求拦截器
// 拦截器的第一部分，第二部分在router index.js里面
http.interceptors.request.use((config) => {
  // 在发送请求之前做些什么
  // 判断是否存在token,如果存在将每个页面header添加token
  const token = localStorage.getItem("token");
  if (
    token
  ) {
    // 如果不是 login 请求，则加上 token
    config.headers.Authorization = `Bearer ${token}`;
  }
  // &&
  //   config.url !== "http://localhost:3000/login/getvisitorcount" &&
  //   config.url !== "http://localhost:3000/login/" &&
  //   config.url !== "http://localhost:3000/login/noticeboard"
  return config;
});
// 响应拦截器
http.interceptors.response.use(
  (response) => {
    // 1代表请求成功,0代表token有问题
    if (response.data.code == 0) {
      // 使用touer跳转到登陆页面
      // 清除token
      localStorage.removeItem("token");
      router.push("/login");
    }
    return response;
  },
  (err) => {
    console.log("请求失败")
    return Promise.reject(err);
  }
);

export default http;
