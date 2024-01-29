// databaseConfig.js

const mysql = require("mysql2");

function bd_conexion(db) {
  const dbConfig = {
    host: `database-${db}.c5cwec6scauz.us-east-1.rds.amazonaws.com`,
    port: "3306",
    user: "admin",
    password: `negocialabsackeyy${db}`,
    database: `database${db}`,
  };

  const connection = mysql.createConnection(dbConfig);

  connection.connect((error) => {
    if (error) {
      console.error("Error al conectar a la base de datos:", error);
      return;
    }
    console.log("Conexión exitosa a la base de datos");
  });
  return connection;
}

module.exports = bd_conexion;
