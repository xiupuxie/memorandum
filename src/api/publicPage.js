import { get,post } from "../util/http";

// const VITE_QRCODE = import.meta.env.VITE_QRCODE;
// const VITE_PHONE = import.meta.env.VITE_PHONE;
// const VITE_IPURL = import.meta.env.VITE_IPURL;
// const VITE_DOUYINURL = import.meta.env.VITE_DOUYINURL;

// let qrcode = VITE_QRCODE ? VITE_QRCODE : "/qrcodeurl";
// let phone = VITE_PHONE ? VITE_PHONE : "/phoneurl";
// let ipurl = VITE_IPURL ? VITE_IPURL : "/ipurl";
// let douyinurl = VITE_DOUYINURL ? VITE_DOUYINURL : "/douyinurl";
const isProduction = import.meta.env.VITE_API;
const basUrl = isProduction ? isProduction : "http://localhost:3000";
const httpUrl = basUrl + "/publicPage";

const api = {
  // // 身份证信息查询,200正确,message返回报错信息,data查询信息
  // identitycard: (idCard) =>
  //   get("https://tools.mgtv100.com/external/v1/identity_info/query", {
  //     params: { idCard },
  //   }),
  // // 二维码生成
  // qrcode: (string) => get(qrcode + "/core/qrcode.php", { params: { string } }),
  // // 手机号码归属地查询
  // phone: (num) => get(phone + "/api/phone/2024/", { params: { num } }),
  // // ip查询
  // ip: (ip) => get(ipurl + "/api/ip/getipinfo", { params: { ip } }),
 
  publicPage: (params) => get(httpUrl + "/", { params: { url:params } }),
};

export default api;
