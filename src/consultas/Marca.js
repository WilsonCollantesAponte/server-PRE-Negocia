const bd_conexion = require("../conexion/bd_conexion");

async function marca(req, res) {
  const { empresa, id_empresa } = req.body;
  const con = bd_conexion([id_empresa]);

  try {
    const dataMarca = await new Promise((resolve, reject) => {
      con.query(
        `SELECT id, nombre FROM marca 
        WHERE estado = '1' AND empresa = ? ORDER BY nombre ASC `,
        [ empresa],
        function (err, dataMarca) {
          if (err) {
            reject(err);
          } else {
            resolve(dataMarca);
          }
        }
      );
    });

    res.status(200).json(dataMarca);
    con.close(); // cerrar conexion
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({
      error: "Hubo un error en la consulta a la base de datos",
    });
  }
}

module.exports = marca;
