var express = require("express");
var router = express.Router();
var $ = require("../controllers/webadmin");

router
  .post("/", $.getlist)  // 查询
  .post("/getdelete", $.getdelete) // 删除
  .post("/getcompile", $.getcompile) // 修改
  .post("/addUsers", $.addUsers)
  .post("/setUserinfo",$.setUserinfo)
  .post("/userremove",$.userremove)
module.exports = router;
