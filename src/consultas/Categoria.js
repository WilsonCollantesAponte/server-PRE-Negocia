const bd_conexion = require("../conexion/bd_conexion");

async function categoria(req, res) {
  const { empresa, id_empresa } = req.body;
  const con = bd_conexion([id_empresa]);

  try {
    const datacategoria = await new Promise((resolve, reject) => {
      con.query(
        `SELECT id, nombre FROM familia_productom 
        WHERE estado = '1' AND empresa = ? AND nombre != '' ORDER BY nombre ASC LIMIT `,
        [ empresa],
        function (err, datacategoria) {
          if (err) {
            reject(err);
          } else {
            resolve(datacategoria);
          }
        }
      );
    });

    res.status(200).json(datacategoria);
    con.close(); // cerrar conexion
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({
      error: "Hubo un error en la consulta a la base de datos",
    });
  }
}

module.exports = categoria;
