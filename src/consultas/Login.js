const bcryptjs = require("bcryptjs");
const bd_conexion = require("../conexion/bd_conexion");

async function login(req, res) {
  const { user, clave } = req.body;

  try {

    const results = await bd_conexion(1).query("SELECT * FROM users WHERE user = ?", [user]);

   /* const results = await new Promise((resolve, reject) => {
      bd_conexion(1).query(
        "SELECT * FROM users WHERE user = ?",
        [user],
        function (err, results) {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });
*/

    if (results.length === 0) {
        return res.status(200).json({ userExist: false, message: "Usuario no encontrado" });
      }
   
      const passwordIsCorrect = await bcryptjs.compare(clave, results[0].clave);

   /*
      const passwordIsCorrect = await new Promise((resolve, reject) => {
      bcryptjs.compare(clave, results[0].clave, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
*/
    res.status(200).json({
      userExist: results.length !== 0,
      passwordIsCorrect,
      userData: results[0]
    });
    return; // O res.end();
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({
      error: "Hubo un error en la consulta a la base de datos",
    });
  } finally {
    // Cerrar la conexión a la base de datos aquí
    bd_conexion(1).end();

    // Asegurarse de que la respuesta se haya enviado antes de finalizar la función
   // res.end();
  }
}

module.exports = login;
