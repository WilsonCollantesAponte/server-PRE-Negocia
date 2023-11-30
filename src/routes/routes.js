const express = require('express');
const router = express.Router();
const controller = require('../controller/controlles');

// Otras importaciones necesarias
// Ruta de login
router.post('/login', controller.register);

// Ruta de registro
router.post('/register', controller.register);

// Otras rutas, si las tienes

module.exports = router;
