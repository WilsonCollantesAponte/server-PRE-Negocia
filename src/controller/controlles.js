const login = require("../consultas/Login");
const register = require("../consultas/Register");
const rubros = require("../consultas/Rubros");
const sucursales = require("../consultas/Sucursales");
const colaboradores = require("../consultas/Colaboradores");
const marca = require("../consultas/Marca");
const categoria = require("../consultas/Categoria");
const serie = require("../consultas/Serie");
const correlativo = require("../consultas/Correlativo");
const clientes = require("../consultas/Clientes");
const fn_principal_producto = require("../consultas/ProductosPrincipal");
const productos_dos = require("../consultas/ProductosDos");
const cad_dos = require("../consultas/Categoriados");

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
  correlativo,
  clientes,
  fn_principal_producto,
  productos_dos,
  cad_dos
  // Agrega tu función de registro al objeto exportado
  // Otras funciones del controlador, si las tienes
};
