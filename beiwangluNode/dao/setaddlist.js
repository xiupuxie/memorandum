var MySQL = require("./MySQL");
let UsersModules = {
  // 新增备忘录
  setaddlist(parms) {
    let stat = 2;
    // true代表已完成 要存入1
    if (parms.delivery == true) {
      stat = 1;
    }
    var sql = `insert into beiwanglu(id,title,text,data,state,userid) values (null,"${parms.name}","${parms.text}","${parms.date}","${stat}","${parms.userid}")`;

    return MySQL.query(sql);
  },
  // 新增公告
  addannouncement(parms) {
    let stat = 2;
    // true代表已完成 要存入1
    if (parms.delivery == true) {
      stat = 1;
    }
    var sql = `insert into noticeboard(id,title,text,data,state,userid) values (null,"${parms.name}","${parms.text}","${parms.date}","${stat}","${parms.userid}")`;

    return MySQL.query(sql);
  },
};
module.exports = UsersModules;
