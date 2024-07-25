import { get, post } from "../util/http";
const isProduction = import.meta.env.VITE_API;
const basUrl = isProduction ? isProduction : "http://localhost:3000"
const httpUrl = basUrl + "/getlist"
// const httpUrl =  "http://60.205.182.111:3000/getlist"
const api = {
    getlist: (parms) => post(httpUrl + "/", parms), // 查询
    getdelete: (parms) => post(httpUrl + "/getdelete", parms), // 删除
    getcompile: (parms) => post(httpUrl + "/getcompile", parms), // 编辑
};

export default api;
