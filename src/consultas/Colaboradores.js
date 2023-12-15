const bd_conexion = require("../conexion/bd_conexion");

async function colaboradores(req, res) {
  const { empresa, id_empresa } = req.body;
  const con = bd_conexion([id_empresa]);

  try {
    const dataColaboradores = await new Promise((resolve, reject) => {
      con.query(
        `SELECT id_cliente, nombre_cliente FROM colaboradores 
        WHERE status_cliente = 1 AND empresa = ? ORDER BY nombre_cliente ASC`,
        [ empresa],
        function (err, dataColaboradores) {
          if (err) {
            reject(err);
          } else {
            resolve(dataColaboradores);
          }
        }
      );
    });

    res.status(200).json(dataColaboradores);
    con.close(); // cerrar conexion
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({
      error: "Hubo un error en la consulta a la base de datos",
    });
  }
}

module.exports = colaboradores;
