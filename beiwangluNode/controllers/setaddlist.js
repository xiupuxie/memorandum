const dao = require("../dao/setaddlist");
let ctrl = {
  // 新增历史单
  async setaddlist(req, res) {
    let user = req.body;
    let ret = {
      code: 1,
      msg: "ok",
    };
    let result = await dao.setaddlist(user);
    if (result.serverStatus == 2) {
      ret.msg = "提交成功";
      res.send(ret);
    } else {
      ret.msg = "提交失败";
      ret.code = 2;
      res.send(ret);
    }
  },
  async addannouncement(req, res){
    let user = req.body;
    let ret = {
      code: 1,
      msg: "ok",
    };
    let result = await dao.addannouncement(user);
    if (result.serverStatus == 2) {
      ret.msg = "提交成功";
      res.send(ret);
    } else {
      ret.msg = "提交失败";
      ret.code = 2;
      res.send(ret);
    }
  }
};
module.exports = ctrl;
