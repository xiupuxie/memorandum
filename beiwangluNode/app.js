var createError = require("http-errors");
var express = require("express");
var path = require("path");
const cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const jwt = require("jsonwebtoken");
var MySQL = require("./dao/MySQL");

var indexRouter = require("./routes/index");
var getlistRouter = require("./routes/getlist");
var webadminRouter = require("./routes/webadmin");
var setaddlistRouter = require("./routes/setaddlist");
var usersRouter = require("./routes/User");
var loginRouter = require("./routes/login");
var publicpageRouter = require("./routes/publicpage");
var publishRouter = require("./routes/publish");
var gettextRouter = require("./routes/text");

var app = express();
// var https = require('https');
// const fs = require('fs');
// var privateKey  = fs.readFileSync('./myfunction.cn.key', 'utf8'); //密钥路径,编码
// var certificate = fs.readFileSync('./myfunction.cn.pem', 'utf8');
// var credentials = {key: privateKey, cert: certificate};
// var httpsServer = https.createServer(credentials, app);
app.listen(3000, () => {
  console.log("server on port in 3000");
});
app.use(cors());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// console.log('server on start')
app.all("*", function (req, res, next) {
  // 设置请求头为允许跨域
  res.header("Access-Control-Allow-Origin", "*");
  // 设置服务器支持的所有头信息字段
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, sessionToken"
  );
  // 设置服务器支持的所有跨域请求的方法
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  if (req.method.toLowerCase() == "options") {
    res.sendStatus(200); // 让options尝试请求快速结束
  } else {
    next();
  }
});
app.use(function (req, res, next) {
  const {
    url,
    headers: { authorization: token },
  } = req;
  // const url = req.url
  // const { authorization: token } = req.headers
  // const token = req.headers.authorization
  // 不需要验证的 请求地址
  console.log(url, "token判断url");
  if (
    url === "/login/" ||
    url === "/login/getvisitorcount" ||
    url === "/login/noticeboard"
  )
    return next();
  // 来到这里表示需要 token 验证
  if (!token) return res.send({ message: "请携带 token 请求", code: 0 });
  const result = token.replace(/^Bearer /, "");
  jwt.verify(result, "function2023", (err, data) => {
    if (err && err.message === "invalid token")
      return res.send({ message: "无效 token", code: 0 });
    if (err && err.message === "jwt expired")
      return res.send({ message: "token 失效", code: 0 });
    next();
  });
});
app.use("/", indexRouter);
app.use("/user", usersRouter);
app.use("/getlist", getlistRouter);
app.use("/webadmin", webadminRouter);
app.use("/setaddlist", setaddlistRouter);
app.use("/login", loginRouter);
app.use("/publicpage", publicpageRouter);
app.use("/publish", publishRouter);
app.use("/text", gettextRouter);

const schedule = require("node-schedule");

const scheduleCronstyle = () => {
  // 每天早上6点刷新签到状态
  schedule.scheduleJob("* * 6 * * *", () => {
    var sql = "UPDATE userinfo SET state = 1";
    MySQL.query(sql);
  });
};

scheduleCronstyle();
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
module.exports = app;
