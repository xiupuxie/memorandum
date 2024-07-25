var express = require("express");
var router = express.Router();
var $ = require("../controllers/publish");

router
  .post("/", $.publish) // 发布公告
  
module.exports = router;
