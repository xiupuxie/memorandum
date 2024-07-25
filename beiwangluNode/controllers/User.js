const dao = require("../dao/User");
const nodemailer = require("nodemailer");
var moment = require("moment");
var codestoken = "";
let ctrl = {
  // 发送验证码
  async useremail(req, res) {
    let ret = {
      code: 1,
      msg: "ok",
    };
    let result = await dao.userinfoemail(req.body.userid);
    if (result) {
      const code = String(Math.floor(Math.random() * 1000000)).padEnd(6, "0"); //生成6位随机验证码
      codestoken = code;
      //创建一个SMTP客户端配置对象
      const transporter = nodemailer.createTransport({
        // 默认支持的邮箱服务包括：”QQ”、”163”、”126”、”iCloud”、”Hotmail”、”Yahoo”等
        service: "QQ",
        auth: {
          // 发件人邮箱账号
          user: "1005615416@qq.com",
          //发件人邮箱的授权码 需要在自己的邮箱设置中生成,并不是邮件的登录密码
          pass: "lmbiagyaylyjbfac",
        },
      });
      // 配置收件人信息
      const receiver = {
        // 发件人 邮箱  '昵称<发件人邮箱>'
        from: `"function"<1005615416@qq.com>`,
        // 主题
        subject: "function团队验证码通知",
        // 收件人 的邮箱 可以是其他邮箱 不一定是qq邮箱
        to: result[0].email,
        // 可以使用html标签
        html: `
 <h1>欢迎访问function团队，您的验证码如下</h1>
 <br>
 <table width="100%" style="border-collapse: collapse; border-spacing: 0;border: 0;height:120px;">
                 <tr height="40px" style="padding: 0;border: 0;">
                     <td style="width: 50px;font-size: 30px;font-weight: bold;line-height: 21px;color: rgba(255, 95, 46, 1);"
                         colspan="1"> ${code} </td>
                 </tr>
                 <tr>
                     <td style="font-size: 14px;font-weight: bold;line-height: 19px;color: rgba(151, 151, 151, 1);  padding: 0;border: 0;"
                         colspan="1"> VX联系方式:</td>
                     <td style="position: relative;left: -10px;font-size: 12px;line-height: 19px;color: rgba(151, 151, 151, 1); padding: 0;border: 0;"
                         colspan="1" style="position: relative;left: -10px;font-size: 12px;line-height: 19px;color:
                         rgba(151, 151, 151, 1);">
                        womeiyouzhuce </td>
                 </tr>
                 <tr>
                     <td style="font-size: 14px;font-weight: bold;line-height: 19px;color: rgba(151, 151, 151, 1);  padding: 0;border: 0;"
                         colspan='1'> 官网:</td>
                     <td style="position: relative;left: -10px;font-size: 12px;line-height: 19px;color: rgba(151, 151, 151, 1); padding: 0;border: 0;"
                         colspan="3"> https://henglink.gitee.io/css/
                     </td>
                 </tr>
                 <tr>
                     <td
                         style="font-size: 14px;font-weight: bold;line-height: 19px;color: rgba(151, 151, 151, 1);  padding: 0;border: 0;">
                         地址:</td>
                     <td style="position: relative;left: -10px;font-size: 12px;line-height: 19px;color: rgba(151, 151, 151, 1); padding: 0;border: 0;"
                         colspan="3">江苏省苏州市工业园区人工智能产业园 </td>
                 </tr>
             </table>
 `,
      };

      // 发送邮件
      transporter.sendMail(receiver, (error, info) => {
        if (error) {
          ret.code = 0;
          ret.msg = "发送失败，请检查邮箱是否正常!";
          res.send(ret);
        }
        transporter.close();
        res.send(ret);
      });
    } else {
      ret.msg = "发送失败";
      ret.code = 2;
      res.send(ret);
    }
  },
  // 修改密码
  async setPassword(req, res) {
    let ret = {
      code: 1,
      msg: "ok",
    };
    if (req.body.code == codestoken) {
      let result = await dao.setPassword(req.body);
      if (result.serverStatus == 2) {
        ret.msg = "修改成功!";
        res.send(ret);
      } else {
        ret.msg = "异常，请联系管理员!";
        res.send(ret);
      }
    }
  },
  // 修改用户信息
  async personalUser(req, res) {
    let ret = {
      code: 1,
      msg: "ok",
    };
    if (req.body.code == codestoken) {
      let result = await dao.personalUser(req.body);
      if (result.serverStatus == 2) {
        ret.msg = "修改成功!";
        res.send(ret);
      } else {
        ret.msg = "异常，请联系管理员!";
        res.send(ret);
      }
    }
  },
  // 签到
  async signin(req, res) {
    let ret = {
      code: 1,
      msg: "ok",
    };

    // 拿到旧日期和掉用日期作比较, 然后再判断是否掉用签到函数
    var time = moment(Date.now()).format("YYYY-MM-DD");
    let op = await dao.op(req.body);
    let opdate = await dao.opdate(req.body, time);
    if (op[0].date == "" || op[0].date == null) {
      // console.log("为空");
      // 执行签到函数
      let result = await dao.signin(req.body);
      if (result.serverStatus == 2) {
        ret.msg = "签到成功";
        res.send(ret);
      } else {
        ret.msg = "禁止重复签到";
        ret.code = 2;
        res.send(ret);
      }
    } else {
      if (time > op[0].date) {
        // 这次把签到日期替换成新的
        let opdate = await dao.opdate(req.body, time);
        let result = await dao.signin(req.body);
        if (result.serverStatus == 2) {
          ret.msg = "签到成功";
          res.send(ret);
        } else {
          ret.msg = "禁止重复签到";
          ret.code = 2;
          res.send(ret);
        }
      } else {
        ret.msg = "禁止重复签到";
        ret.code = 2;
        res.send(ret);
      }
    }
  },
  // 查询用户信息
  async userinfo(req, res) {
    let ret = {
      code: 1,
      msg: "ok",
    };

    let result = await dao.userinfo(req.body);
    if (result[0]) {
      ret.userid = result[0].userid;
      ret.name = result[0].name;
      ret.username = result[0].username;
      ret.email = result[0].email;
      ret.vip = result[0].vip;
      ret.integral = result[0].integral;
      ret.state = result[0].state;
    } else {
      ret.msg = "系统错误!";
      ret.code = 0;
    }
    
    res.send(ret);
  },
};
module.exports = ctrl;
