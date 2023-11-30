const bd_conexion = require("../conexion/bd_conexion");

async function login(req, res) {
  const { user, clave } = req.body;

  try {
    const results = await bd_conexion(1).query("SELECT * FROM users WHERE user = ?", [user]);

    if (results.length === 0) return res.status(200).json({ userExist: false });

    const passwordIsCorrect = await bcryptjs.compare(clave, results[0].clave);

    res.status(200).json({
      userExist: results.length !== 0,
      passwordIsCorrect,
      userData: results[0],
    });
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({
      error: "Hubo un error en la consulta a la base de datos",
    });
    res.status(401).json({ userExist: false });
  }
}

module.exports = login;
