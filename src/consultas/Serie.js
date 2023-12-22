const bd_conexion = require("../conexion/bd_conexion");

async function serie(req, res) {
  const { empresa, id_empresa, IDUSUARIO, tipo_serie, id_almacen } = req.body;
  const con = bd_conexion([id_empresa]);

  try {
    const dataSerie = await new Promise((resolve, reject) => {
      con.query(
        `
        SELECT  almacen_serie.almacen, almacen_serie.serie, numero_serie.numero,
(case when serie_asignados.id > 0 then 1 ELSE 0 END) AS ESTADO_SERIE_ASIGNADO   
FROM almacen_serie 
INNER JOIN numero_serie
ON ( almacen_serie.serie = numero_serie.id and numero_serie.tipo = ? AND numero_serie.empresa = almacen_serie.empresa AND numero_serie.tipo_offline = '0' ) 
LEFT JOIN serie_asignados
ON ( serie_asignados.id_serie = numero_serie.id AND serie_asignados.empresa = almacen_serie.empresa AND serie_asignados.id_usuario = ?
AND serie_asignados.id_almacen = almacen_serie.almacen AND serie_asignados.estado = 1) 
WHERE almacen_serie.almacen = ? and almacen_serie.empresa = ?
`,
        [tipo_serie, IDUSUARIO, id_almacen, empresa],
        function (err, dataSerie) {
          if (err) {
            reject(err);
          } else {
            resolve(dataSerie);
          }
        }
      );
    });

    res.status(200).json(dataSerie);
    con.close(); // cerrar conexion
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({
      error: "Hubo un error en la consulta a la base de datos",
    });
  }
}

module.exports = serie;
