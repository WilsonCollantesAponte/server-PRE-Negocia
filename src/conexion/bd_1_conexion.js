// databaseConfig.js

const mysql = require("mysql2");

const dbConfig = {
  host: "database-1.c5cwec6scauz.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "negocialabsackeyy1",
  database: "database1",
};

const connection1 = mysql.createConnection(dbConfig);

connection1.connect((error) => {
  if (error) {
    console.error("Error al conectar a la base de datos:", error);
    return;
  }
  console.log("Conexión exitosa a la base de datos");
});

module.exports = connection1;
