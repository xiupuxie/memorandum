import { get, post } from "../util/http";
const isProduction = import.meta.env.VITE_API;
const basUrl = isProduction ? isProduction : "http://localhost:3000"
const httpUrl = basUrl + "/publish"
// const httpUrl =  "http://60.205.182.111:3000/login"
const api = {
  addtext: (parms) => post(httpUrl + "/", parms), // 发布文章接口
};

export default api;
