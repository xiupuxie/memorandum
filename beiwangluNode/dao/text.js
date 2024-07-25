var MySQL = require("./MySQL");
let UsersModules = {
  // 文章列表
  gettext(parms) {
    let pag = (parms.page - 1) * 10;
    if (parms.type != "") {
      let sql = `SELECT * FROM sklist where type = '${parms.type}' && title LIKE '%${parms.keyword}%' ORDER BY time DESC LIMIT ${pag},10`;
      return MySQL.query(sql);
    } else {
      // console.log(parms);
      let sql = `SELECT * FROM sklist where title LIKE '%${parms.keyword}%' ORDER BY time DESC LIMIT ${pag},10`;
      return MySQL.query(sql);
    }
  },
  browse(parms){
    var sql = `UPDATE sklist SET size = size + 1  WHERE textid = '${parms.textid}'`;
    return MySQL.query(sql);
  },
  removeText(parms){
    let sql = `DELETE FROM sklist WHERE textid = ${parms.textid} && userid = ${parms.userid}`;
    return MySQL.query(sql);
  }
};
module.exports = UsersModules;
