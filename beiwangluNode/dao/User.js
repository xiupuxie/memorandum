var MySQL = require("./MySQL");
let UsersModules = {
  // 查询用户邮箱
  userinfoemail(id) {
    var sql = `select email from userinfo where userid = "${id}"`;
    return MySQL.query(sql);
  },
  // 修改密码
  setPassword(body) {
    var sql = `UPDATE userinfo SET password = '${body.password}' WHERE userid = '${body.userid}'`;
    return MySQL.query(sql);
  },
  // 修改用户信息
  personalUser(body) {
    var sql = `UPDATE userinfo SET username = '${body.name}', email = '${body.email}' WHERE userid = '${body.userid}' && username = '${body.username}'`;
    return MySQL.query(sql);
  },
  // 签到
  signin(body) {
    var sql = `UPDATE userinfo SET integral = integral + 1,state = state + 1  WHERE userid = '${body.userid}' &&  username = '${body.username}'`;
    return MySQL.query(sql);
  },
  op(body) {
    var sql = `select date from userinfo  WHERE userid = '${body.userid}' &&  username = '${body.username}'`;
    return MySQL.query(sql);
  },
  opdate(body, time) {
    var sql = `UPDATE userinfo SET date = '${time}' WHERE userid = '${body.userid}' && username = '${body.username}'`;
    return MySQL.query(sql);
  },
  userinfo(body) {
    let num = Number(body.integral) / 30;
    if (num >= 1) {
      if (Number(body.integral) < 181) {
        var sql = `UPDATE userinfo SET vip = ${num} WHERE userid = '${body.userid}' &&  username = '${body.username}'`;
        MySQL.query(sql);
      } else {
      }
    }
    var sql = `select * from userinfo where userid = "${body.userid}"`;
    return MySQL.query(sql);
  },
};
module.exports = UsersModules;
