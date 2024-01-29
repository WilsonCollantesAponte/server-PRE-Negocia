// databaseConfig.js

const mysql = require("mysql2");

const dbConfig = {
  host: "database-4.c5cwec6scauz.us-east-1.rds.amazonaws.com",
  port: "3306",
  user: "admin",
  password: "negocialabsackeyy4",
  database: "database4",
};

const connection4 = mysql.createConnection(dbConfig);

connection4.connect((error) => {
  if (error) {
    console.error("Error al conectar a la base de datos:", error);
    return;
  }
  console.log("Conexión exitosa a la base de datos");
});

module.exports = connection4;
