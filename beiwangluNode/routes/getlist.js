var express = require("express");
var router = express.Router();
var $ = require("../controllers/getlist");

router
  .post("/", $.getlist)  // 查询历史单
  .post("/getdelete", $.getdelete) // 删除
  .post("/getcompile", $.getcompile) // 修改
module.exports = router;
