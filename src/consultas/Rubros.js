const bd_conexion = require("../conexion/bd_conexion");

async function rubros(req, res) {
  try {
    const conn = bd_conexion(1);

    const response = await new Promise((resolve, reject) => {
      conn.query("SELECT rubro FROM rubro_empresa", function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    const withFrontSintax = response.map((rubroObject) => rubroObject.rubro);

    res.status(200).json(withFrontSintax);
    conn.close(); // cerrar conexion
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = rubros;
