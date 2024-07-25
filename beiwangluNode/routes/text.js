var express = require("express");
var router = express.Router();
var $ = require("../controllers/text");

router
  .post("/", $.gettext) // 文章列表
  .post("/browse", $.browse) // 浏览量递增
  .post("/removeText",$.removeText) // 删除文章
  
module.exports = router;
