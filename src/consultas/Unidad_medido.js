const bd_conexion = require("../conexion/bd_conexion");

async function unidad_medida(req, res) {
  const {  id_empresa } = req.body;
  const con = bd_conexion([id_empresa]);

  try {
    const dataunidad_medido = await new Promise((resolve, reject) => {
      con.query(
        `SELECT id, nombre FROM unidadm WHERE id != 36 AND id_pais = 1 ORDER BY nombre ASC `,
        
        function (err, dataunidad_medido) {
          if (err) {
            reject(err);
          } else {
            resolve(dataunidad_medido);
          }
        }
      );
    });

    res.status(200).json(dataunidad_medido);
    con.close(); // cerrar conexion
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({
      error: "Hubo un error en la consulta a la base de datos",
    });
  }
}

module.exports = unidad_medida;
