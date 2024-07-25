import { get, post } from "../util/http";
const isProduction = import.meta.env.VITE_API;
const basUrl = isProduction ? isProduction : "http://localhost:3000"
const httpUrl = basUrl + "/user"
// const httpUrl = "http://60.205.182.111:3000/user";

const api = {
  useremail: (params) => post(httpUrl + "/", params), // 发送验证码
  setPassword: (params) => post(httpUrl + "/password", params), // 修改密码
  setPersonalUser: (params) => post(httpUrl + "/personalUser", params), // 修改用户信息
  signin: (params) => post(httpUrl + "/signin", params), // 签到
  userinfo: (params) => post(httpUrl + "/userinfo", params), // 获取用户信息
};

export default api;
