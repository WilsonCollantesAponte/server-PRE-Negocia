const express = require("express");
const router = express.Router();
const controller = require("../controller/controlles");

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
router.post("/fn_productos", controller.fn_principal_producto);

// Ruta de Productos
router.post("/productos_dos", controller.productos_dos);


// Ruta de Productos
router.post("/categoriados", controller.categoriados);
module.exports = router;
