const dao = require("../dao/publish");
let ctrl = {
  // 发布公告
  async publish(req, res) {
    let user = req.body;
    let ret = {
      code: 1,
      msg: "ok",
    };
    let result = await dao.publish(user);
    if (result.serverStatus == 2) {
      ret.msg = "发布成功";
      res.send(ret);
    } else {
      ret.msg = "发布失败";
      ret.code = 2;
      res.send(ret);
    }
  },
};
module.exports = ctrl;
