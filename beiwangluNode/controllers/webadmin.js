const dao = require("../dao/webadmin");
let ctrl = {
  // 查询公告
  async getlist(req, res) {
    let user = req.body;
    let ret = {
      code: 1,
      msg: "ok",
    };
    // 普通初始化查询
    if (user && Object.keys(user).length > 0 && !req.body.type) {
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
  // 新增账号
  async addUsers(req, res) {
    let user = req.body;
    let ret = {
      code: 1,
      msg: "ok",
    };
    let result = await dao.addUsers(user);
    if (result.serverStatus == 2) {
      ret.msg = "提交成功";
      res.send(ret);
    } else {
      ret.msg = "提交失败";
      ret.code = 2;
      res.send(ret);
    }
  },
  // 查找/修改用户信息
  async setUserinfo(req, res) {
    let user = req.body;
    let ret = {
      code: 1,
      msg: "ok",
    };
    if (user.userid == "1") {
      let result = await dao.setUserinfo(user);
      // console.log(result);
      ret.list = result;
      res.send(ret);

    }else{
      ret.msg = "无权限";
      ret.code = 2;
      res.send(ret);
    }
  },
  // 删除用户
  async userremove(req, res){
    let user = req.body;
    let ret = {
      code: 1,
      msg: "ok",
    };
    let result = await dao.userremove(user);
    if (result.serverStatus == 2) {
      ret.msg = "删除成功";
      res.send(ret);
    } else {
      ret.msg = "删除失败";
      ret.code = 2;
      res.send(ret);
    }
  }
};
module.exports = ctrl;
