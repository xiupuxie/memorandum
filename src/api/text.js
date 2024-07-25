import { get, post } from "../util/http";
const isProduction = import.meta.env.VITE_API;
const basUrl = isProduction ? isProduction : "http://localhost:3000"
const httpUrl = basUrl + "/text"
// const httpUrl =  "http://60.205.182.111:3000/login"
const api = {
  gettext: (parms) => post(httpUrl + "/", parms), // 文章列表接口
  browse: (parms) => post(httpUrl + "/browse", parms), // 文章浏览量递增接口
  removeText: (parms) => post(httpUrl + "/removeText", parms), // 文章删除接口
};

export default api;
