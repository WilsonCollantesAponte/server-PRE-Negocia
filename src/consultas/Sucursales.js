const bd_conexion = require("../conexion/bd_conexion");

async function sucursales(req, res) {
  const { empresa, id_usuario, id_empresa } = req.body;

  try {
    const dataSucursal = await new Promise((resolve, reject) => {
      bd_conexion([id_empresa]).query(
        `SELECT almacen_usuario.id_sucursal, almacen.nombre, almacen.direccion, 
        almacen.observaciones FROM almacen, almacen_usuario 
        WHERE almacen_usuario.id_usuario = ? AND almacen_usuario.id_sucursal = almacen.id AND almacen.estado = 1 
        AND (almacen.tipo = '1' OR almacen.tipo='3') AND almacen.empresa = ? AND almacen_usuario.empresa = ?
        GROUP BY almacen_usuario.id_sucursal ORDER BY almacen.id ASC`,
        [id_usuario, empresa, empresa],
        function (err, dataSucursal) {
          if (err) {
            reject(err);
          } else {
            resolve(dataSucursal);
          }
        }
      );
    });

    res.status(200).json(dataSucursal); // Cambiado de { dataSucursal: results } a solo results
    bd_conexion([id_empresa]).close();
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({
      error: "Hubo un error en la consulta a la base de datos",
    });
  }finally {
    // Cerrar la conexión a la base de datos aquí
    bd_conexion([id_empresa]).close();

    // Asegurarse de que la respuesta se haya enviado antes de finalizar la función
   // res.end();
  }
}

module.exports = sucursales;
