import { get, post } from "../util/http";
const isProduction = import.meta.env.VITE_API;
const basUrl = isProduction ? isProduction : "http://localhost:3000"
const httpUrl = basUrl + "/webadmin"
// const httpUrl =  "http://60.205.182.111:3000/getlist"
const api = {
    getlist: (parms) => post(httpUrl + "/", parms), // 查询公告
    getdelete: (parms) => post(httpUrl + "/getdelete", parms), // 删除公告
    getcompile: (parms) => post(httpUrl + "/getcompile", parms), // 编辑
    addUsers: (parms) => post(httpUrl + "/addUsers", parms), // 添加用户/账号
    setUserinfo: (parms) => post(httpUrl + "/setUserinfo", parms), // 查找/设置用户信息
    userremove: (parms) => post(httpUrl + "/userremove", parms), // 删除用户
};

export default api;
