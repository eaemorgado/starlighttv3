var mysql = require("mysql2");

module.exports = function(){
    return mysql.createConnection({
        host:"localhost",
        user:"root",
        password:"",
        database:"starlight",
        port: 3306
    });
}