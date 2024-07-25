var express = require("express");
var router = express.Router();
var $ = require("../controllers/login");

router
  .post("/", $.login) // 登录接口
  .get("/getvisitorcount", $.getvisitorcount) // 查询访问人数
  .get("/noticeboard",$.noticeboard)
  
module.exports = router;
