var MySQL = require("./MySQL");
let UsersModules = {
  // 查询历史单
  getlist(parms) {
    // console.log(parms.type == "headersize");
    // shome页面header统计数量
    if (parms.type == "headersize") {
      let sql = `SELECT * FROM beiwanglu where userid = "${parms.userid}"`;
      return MySQL.query(sql);
    }
    // 分页查询
    if (parms.page && !parms.type) {
      let pag = (parms.page - 1) * 10;
      let sql = `SELECT * FROM beiwanglu where userid = "${parms.userid}" ORDER BY data DESC LIMIT ${pag},10`;
      return MySQL.query(sql);
    }
    // 条件查询
    if (parms.type == "inquire") {
      if (parms.title && parms.data) {
        let sql = `select * from beiwanglu where title = "${parms.title}" && data between '${parms.data[0]}' and '${parms.data[1]}'`;
        return MySQL.query(sql);
      } else if (parms.title) {
        let sql = `select * from beiwanglu where title LIKE '%${parms.title}%'`;
        return MySQL.query(sql);
      } else {
        let sql = `select * from beiwanglu where  data between '${parms.data[0]}' and '${parms.data[1]}'`;
        return MySQL.query(sql);
      }
    }
  },
  // 删除
  getdelete(user) {
    let sql = `DELETE FROM beiwanglu WHERE id = ${user.id} && userid = ${user.userid}`;
    return MySQL.query(sql);
  },
  // 修改
  getcompile(parms) {
    let state = 2;
    if (parms.state == true) {
      state = 1;
    }
    let sql = `update beiwanglu set title = '${parms.title}', text = '${parms.text}', data = '${parms.data}', state = '${state}' where id = ${parms.id}`;
    return MySQL.query(sql);
  },
  // 数量
  pagelist(parms) {
    var sql = `SELECT COUNT(*) as pagesize FROM beiwanglu where userid = "${parms.userid}"`;
    return MySQL.query(sql);
  },
  pagesize(parms) {
    if (parms.title && parms.data) {
      let sql = `select COUNT(*) as pagesize from beiwanglu where title = "${parms.title}" && data between '${parms.data[0]}' and '${parms.data[1]}'`;
      return MySQL.query(sql);
    } else if (parms.title && !parms.data) {
      let sql = `select COUNT(*) as pagesize from beiwanglu where title = "${parms.title}"`;
      return MySQL.query(sql);
    } else {
      let sql = `select COUNT(*) as pagesize from beiwanglu where  data between '${parms.data[0]}' and '${parms.data[1]}'`;
      return MySQL.query(sql);
    }
  },
};
module.exports = UsersModules;
