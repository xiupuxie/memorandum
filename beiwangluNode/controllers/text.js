const dao = require("../dao/text");
let ctrl = {
  // 文章列表
  async gettext(req, res) {
    let user = req.body;
    let ret = {
      code: 1,
      msg: "ok",
    };
    let result = await dao.gettext(user);
    if (result.length >= 1) {
      ret.list = result;
    } else {
      ret.list = [];
    }
    res.send(ret);
  },
  async browse(req, res) {
    let user = req.body;
    let ret = {
      code: 1,
      msg: "ok",
    };
    let result = await dao.browse(user);
    // console.log(result);
    if (result.serverStatus == 2) {
      res.send(ret);
    } else {
      ret.msg = "系统错误联系管理员";
      ret.code = 2;
      res.send(ret);
    }
  },
  async removeText(req, res){
    let user = req.body;
    let ret = {
      code: 1,
      msg: "ok",
    };
    let result = await dao.removeText(user);
    if (result.serverStatus == 2) {
      res.send(ret);
    } else {
      ret.msg = "系统错误联系管理员";
      ret.code = 2;
      res.send(ret);
    }
  }
};
module.exports = ctrl;
