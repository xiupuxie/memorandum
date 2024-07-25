const mysql = require("mysql");
const config = {
  host: "localhost",
  user: "root",
  password: "root",
  database: "beiwanglu",
};
//创建数据池
const pool = mysql.createPool(config);

var query = function (sql, datas) {
  // console.log("连接数据库");

  var p = new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) reject(err);
      else {
        // console.log("connect success");
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
