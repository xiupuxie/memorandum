import { get, post } from "../util/http";
const isProduction = import.meta.env.VITE_API;
const basUrl = isProduction ? isProduction : "http://localhost:3000"
const httpUrl = basUrl + "/setaddlist"
// const httpUrl = "http://60.205.182.111:3000/setaddlist"
const api = {
    setaddlist: (parms) => post(httpUrl + "/", parms), // 添加备忘录
    announcement: (parms) => post(httpUrl + "/announcement", parms), // 添加公告
};

export default api;
