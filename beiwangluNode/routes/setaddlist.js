var express = require("express");
var router = express.Router();
var $ = require("../controllers/setaddlist");

router
    .post("/", $.setaddlist)
    .post("/announcement", $.addannouncement)
module.exports = router;
