const bcryptjs = require("bcryptjs");
const bd_conexion = require("../conexion/bd_conexion.js");

async function login(req, res) {
  const { user, clave } = req.body;
// ...
try {
    const results = await new Promise((resolve, reject) => {
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
  
    if (results.length === 0) {
        return res.status(200).json({ userExist: false });
      }
      
      const passwordIsCorrect = await new Promise((resolve, reject) => {
        bcryptjs.compare(clave, results[0].clave, (err, result) => {
          if (err) reject(err);
          else resolve(result);
        });
      });
      
      if (passwordIsCorrect) {
        res.status(200).json({ userExist: true, passwordIsCorrect,  userData: results[0] });
      } else {
        res.status(200).json({ userExist: true, passwordIsCorrect: false });
      }
      
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({
      error: "Hubo un error en la consulta a la base de datos",
    });
  }
  // ...
  
}

module.exports = login;
