const login = require("../consultas/Login");
const register = require("../consultas/Register");
const rubros = require("../consultas/Rubros");
const sucursales = require("../consultas/Sucursales");
const colaboradores = require("../consultas/Colaboradores");
const marca = require("../consultas/Marca");
const categoria = require("../consultas/Categoria");
const serie = require("../consultas/Serie");
const correlativo = require("../consultas/Correlativo");

// Otras importaciones necesarias

// Aquí puedes tener otras funciones de tu controlador, si las tienes
module.exports = {
  login,
  register,
  sucursales,
  rubros,
  colaboradores,
  marca, 
  categoria,
  serie,
  correlativo
  // Agrega tu función de registro al objeto exportado
  // Otras funciones del controlador, si las tienes
};
