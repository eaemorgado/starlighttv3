var mysql = require("mysql2");

module.exports = function(){
 return mysql.createConnection({
  host: "monorail.proxy.rlwy.net",
  user: "root",
  password: "DGaAhcG3FfG5-Gd5dcehgCB14heA3eE5",
  database: "railway",
  port: "54209"  
  });
}

// module.exports = function(){
//   return mysql.createConnection({
//      host: "127.0.0.1",
//      user: "root",
//      password: "@ITB123456",
//      database: "starlight",
//      port: 3306
//    });
//  }