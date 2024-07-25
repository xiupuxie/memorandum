// 后台每次部署都会覆盖mysq链接信息,这里做备用
const mysql = require("mysql");
const config = {
  host: "60.205.182.111",
  user: "function",
  password: "?function?.cC",
  database: "beiwanglu",
};

//创建数据池
const pool = mysql.createPool(config);

var query = function (sql, datas) {
  var p = new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) reject(err);
      else {
        connection.query(sql, datas, function (error, results) {
          if (error) reject(error);
          else resolve(results);
          connection.release(); //释放链接
        });
      }
    });
  });
  return p;
};

exports.query = query;
