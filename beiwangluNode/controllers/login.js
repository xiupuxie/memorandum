const dao = require("../dao/login");
const jwt = require("jsonwebtoken");
const aes = require("../utils/crypto");
let ctrl = {
  // 查询访问人数
  async getvisitorcount(req, res) {
    let ret = {
      code: 1,
      msg: "ok",
    };
    let result = await dao.getvisitorcount();
    // 访问量递增
    await dao.getvisitorcountadd();
    if (result[0].getvisitorcount) {
      ret.count = result[0].getvisitorcount;
      res.send(ret);
    } else {
      ret.msg = "提交失败";
      ret.code = 2;
      res.send(ret);
    }
  },
  // 登录
  async login(req, res) {
    let user = req.body;
    user.password = aes.decrypt(user.password);
    let ret = {
      code: 1,
      msg: "ok",
    };
    let result = await dao.login(user);
    if (result[0]) {
      ret.userid = result[0].userid;
      ret.name = result[0].name;
      ret.username = result[0].username;
      ret.email = result[0].email;
      ret.vip = result[0].vip;
      ret.integral = result[0].integral;
      ret.state = result[0].state;
      ret.token = jwt.sign(ret, "function2023", {
        expiresIn: 20 * 24 * 3600 * 1000,
      });
    } else {
      ret.msg = "账号或密码错误";
      ret.code = 0;
    }
    res.send(ret);
  },
  // 公告栏列表
  async noticeboard(req, res) {
    let ret = {
      code: 1,
      msg: "ok",
      list: [],
    };
    let result = await dao.noticeboard();
    if (result.length >= 1) {
      result.forEach((item) => {
        if (item.state == "1") {
          ret.list.push(item);
        }
      });
    } else {
      ret.code = 2;
      ret.msg = "请求异常!";
    }
    res.send(ret);
  },
};
module.exports = ctrl;
