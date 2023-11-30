const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const router = require("../routes/routes");
const server = express();

// Configuración de middleware
server.use(morgan("dev"));
server.use(express.json());

// Configuración de middleware CORS
const corsOptions = {
  origin: "https://server-pre-negocia.onrender.com", // Reemplaza con tu dominio
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Origin, X-Requested-With, Content-Type, Accept",
};

server.use(cors(corsOptions));

// Configuración de rutas
server.use("/", router);

// Middleware de manejo de errores CORS
server.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    // Manejar errores de CORS
    res.status(401).json({ error: "No autorizado" });
  } else {
    next(err);
  }
});

module.exports = server;
