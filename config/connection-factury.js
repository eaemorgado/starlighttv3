var mysql = require("mysql");

module.exports = function(){
 return mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "@ITB123456",
    database: "starlight",
    port: 3306
  });
}