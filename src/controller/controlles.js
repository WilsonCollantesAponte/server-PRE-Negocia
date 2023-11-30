const login = require("../consultas/Login");
const register = require("../consultas/Register");
const sucursales = require("../consultas/Sucursales");

// Otras importaciones necesarias

// Aquí puedes tener otras funciones de tu controlador, si las tienes

module.exports = {
    login,
  register,
  sucursales, // Agrega tu función de registro al objeto exportado
  // Otras funciones del controlador, si las tienes
};
