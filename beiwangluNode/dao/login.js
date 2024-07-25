var MySQL = require("./MySQL");
let UsersModules = {
  // 查询访问人数
  getvisitorcount() {
    console.log("查询访问人数");
    var sql = "select * from getvisitorcount";
    return MySQL.query(sql);
  },
  // 访问人数递增+1
  getvisitorcountadd() {
    console.log("掉用访问人数递增接口");
    var sql =
      "UPDATE getvisitorcount SET getvisitorcount = getvisitorcount + 1";
    return MySQL.query(sql);
  },
  // 登录
  login(user) {
    console.log("登录");

    var sql = `select * from userinfo where username = '${user.username}' && password = '${user.password}'`;
    return MySQL.query(sql);
  },
  // 公告栏列表
  noticeboard() {
    console.log("查询公告");

    // select * from users order by user_id desc
    var sql = "select * from noticeboard order by data desc";
    return MySQL.query(sql);
  },
};
module.exports = UsersModules;
