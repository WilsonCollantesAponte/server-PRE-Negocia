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
router.post("/colaboradores", controller.colaboradores);

// Ruta de marcas
router.post("/marca", controller.marca);

// Ruta de Categorias
router.post("/categoria", controller.categoria);

// Ruta de Categorias
router.post("/serie", controller.serie);

// Ruta de Correlativo
router.post("/correlativo", controller.correlativo);

// Ruta de Clientes
router.post("/clientes", controller.clientes);

// Ruta de Productos
router.post("/productos", controller.productos);

module.exports = router;
