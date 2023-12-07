const express = require("express");
const router = express.Router();
const controller = require("../controller/controlles");
const bd_conexion = require("../conexion/bd_conexion");

// Otras importaciones necesarias
// Ruta de login
router.post("/login", controller.login);

// Ruta de registro
router.post("/register", controller.register);

// Ruta de sucursales
router.post("/sucursales", controller.sucursales);

router.get("/rubros", controller.rubros);
// Otras rutas, si las tienes

module.exports = router;
