var mysql = require("mysql");

const dbConfig = {
    host:"localhost",
        user:"root",
        password:"",
        database:"starlight",
        port: 3306
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
    if (err) {
      console.error('Erro na conexão com o banco de dados: ' + err.stack);
      return;
    }
    console.log('Conectado ao banco de dados com ID ' + connection.threadId);
  });
  
  module.exports = connection;