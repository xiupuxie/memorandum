const dao = require("../dao/getlist");
let ctrl = {
  // 查询历史单
  async getlist(req, res) {
    let user = req.body;
    let ret = {
      code: 1,
      msg: "ok",
    };
    // 普通初始化查询
    if (user && Object.keys(user).length > 0 && !req.body.type || req.body.type == "headersize") {
      let result = await dao.getlist(user);
      if (result.length >= 1) {
        ret.list = result;
      } else {
        ret.list = [];
      }
      let total = await dao.pagelist(user);
      ret.total = total[0].pagesize;
      // inquire代表条件查询
    } else if (req.body.type == "inquire") {
      let result = await dao.getlist(user);
      if (result.length >= 1) {
        ret.list = result;
      } else {
        ret.list = [];
      }
      let totalshai = await dao.pagesize(user);
      ret.totalshai = totalshai[0].pagesize;
    } else {
      let result = await dao.getlist(user);
      if (result.length >= 1) {
        ret.list = result;
      } else {
        ret.list = [];
      }
      let total = await dao.pagelist(user);
      ret.total = total[0].pagesize;
    }
    res.send(ret);
  },
  // 删除
  async getdelete(req, res) {
    let user = req.body;
    let ret = {
      code: 1,
      msg: "ok",
    };
    let result = await dao.getdelete(user);
    if (result.serverStatus == 2) {
      ret.msg = "删除成功";
      res.send(ret);
    } else {
      ret.msg = "删除失败";
      ret.code = 2;
      res.send(ret);
    }
  },
  // 修改
  async getcompile(req, res) {
    let user = req.body;
    let ret = {
      code: 1,
      msg: "ok",
    };
    let result = await dao.getcompile(user);
    if (result.serverStatus == 2) {
      ret.msg = "修改成功";
      res.send(ret);
    } else {
      ret.msg = "修改失败";
      ret.code = 2;
      res.send(ret);
    }
  },
};
module.exports = ctrl;
