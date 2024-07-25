var MySQL = require("./MySQL");
let UsersModules = {
  // 新增公告
  publish(parms) {
    if (parms.textid) {
      const basurl = new Buffer(parms.text).toString("base64");
      var sql = `UPDATE sklist SET type = '${parms.type}',title = '${parms.title}',size = '${parms.size}',text = '${basurl}' WHERE textid = '${parms.textid}'`;
      return MySQL.query(sql);
    } else {
      const basurl = new Buffer(parms.text).toString("base64");
      // console.log(basurl);
      var sql = `insert into sklist(userid,username,title,text,size,name,time,type,textid) values ("${parms.userid}","${parms.username}","${parms.title}","${basurl}","${parms.size}","${parms.name}","${parms.time}","${parms.type}",null)`;
      return MySQL.query(sql);
    }
  },
};
module.exports = UsersModules;
