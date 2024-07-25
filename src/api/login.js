import { get, post } from "../util/http";
const isProduction = import.meta.env.VITE_API;
const basUrl = isProduction ? isProduction : "http://localhost:3000"
const httpUrl = basUrl + "/login"
// const httpUrl =  "http://60.205.182.111:3000/login"
const api = {
  login: (parms) => post(httpUrl + "/", parms), // 登录接口
  getvisitorcount: () => get(httpUrl + "/getvisitorcount"), // 查询访问人数总量
  noticeboard: () => get(httpUrl + "/noticeboard"), // 公告
};

export default api;
