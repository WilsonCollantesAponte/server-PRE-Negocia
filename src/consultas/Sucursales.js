const bd_conexion = require("../conexion/bd_conexion");

async function sucursales(req, res) {
  const { empresa, id_usuario, id_empresa } = req.body;

  // Usar pool de conexiones
  const pool = bd_conexion.pool([id_empresa]);

  try {
    console.log("Iniciando la consulta a la base de datos...");

    const dataSucursal = await new Promise((resolve, reject) => {
      pool.query(
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
    }).catch(error => {
      console.error("Error adicional en la promesa:", error);
      throw error; // Re-lanzar el error para que se maneje en el bloque catch externo
    });

    console.log("Consulta exitosa. Enviando resultados al cliente...");
    res.status(200).json(dataSucursal);
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({
      error: "Hubo un error en la consulta a la base de datos",
    });
  } finally {
    // Liberar la conexión al pool
    pool.releaseConnection();
    console.log("Conexión liberada.");
  }
}

module.exports = sucursales;
