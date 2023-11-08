var mysql = require("mysql");

module.exports = function(){
 return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "@ITB123456",
    database: "starlight",
    port: 3306
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