var express = require("express");
var request = require("request");
var router = express.Router();

router.all("/", async (req, res, next) => {
  // 获取请求的地址以及请求方法
  const method = req.method.toLowerCase();
  //   发送数据请求
  if (method === "get") {
    const params = req.query;
    request(params.url, function (error, response, body) {
      //body为返回的数据
      res.json(body);
    });
  } else if (method === "post") {
    const params = req.request.body;
    const result = await request.post({
      uri: params.url,
      body: data,
    });
    res.json(result);
  }
});

module.exports = router;
