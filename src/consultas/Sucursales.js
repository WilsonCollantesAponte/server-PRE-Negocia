const bcryptjs = require("bcryptjs");
const bd_conexion = require("../conexion/bd_conexion");

async function Sucursales(req, res) {
  const { empresa } = req.body;

  try {
    const results = await new Promise((resolve, reject) => {
      bd_conexion(1).query(
        "SELECT * FROM almacen WHERE empresa = ?",
        [empresa],
        function (err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    res.status(200).json({
      dataSucursal: results[0]
    });
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({
      error: "Hubo un error en la consulta a la base de datos",
    });
  }
}

module.exports = Sucursales;
