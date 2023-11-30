const bcryptjs = require("bcryptjs");
const bd_conexion = require("../conexion/bd_conexion");

async function Sucursales(req, res) {
  const { empresa, id_usuario } = req.body;

  try {
    const results = await new Promise((resolve, reject) => {
      bd_conexion(1).query(
        `SELECT almacen_usuario.id_sucursal, almacen.nombre, almacen.direccion, 
        almacen.observaciones FROM almacen, almacen_usuario 
        WHERE almacen_usuario.id_usuario = ? AND almacen_usuario.id_sucursal = almacen.id AND almacen.estado = 1 
        AND (almacen.tipo = '1' OR almacen.tipo='3') AND almacen.empresa = ? AND almacen_usuario.empresa = ?
        GROUP BY almacen_usuario.id_sucursal ORDER BY almacen.id ASC`,
        [id_usuario, empresa, empresa],
        function (err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    res.status(200).json(results); // Cambiado de { dataSucursal: results } a solo results
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({
      error: "Hubo un error en la consulta a la base de datos",
    });
  }
}

module.exports = Sucursales;
