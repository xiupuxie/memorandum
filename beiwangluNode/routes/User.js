var express = require("express");
var router = express.Router();
var $ = require("../controllers/User");

router
  .post("/", $.useremail)
  .post("/password", $.setPassword)
  .post("/personalUser", $.personalUser)
  .post("/signin",$.signin)
  .post("/userinfo",$.userinfo)
module.exports = router;
