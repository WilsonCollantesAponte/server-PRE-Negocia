const bd_conexion = require("../conexion/bd_conexion");

async function correlativo(req, res) {
  const { empresa, id_empresa, id_serie, tipo_serie } = req.body;
  const con = bd_conexion([id_empresa]);

  try {
    let consulta;

    if (tipo_serie <= 5) {
      consulta = `
        SELECT * FROM (
          SELECT numero_factura AS NUMERO
          FROM facturas 
          WHERE serie = ? AND (tipo_resumen != '9999' AND estado_sunat != '9999') 
            AND empresa = ? 
          
          UNION ALL 
          
          SELECT numero_factura AS NUMERO
          FROM ingresos 
          WHERE serie = ?  
            AND empresa = ? AND (tipodoc = 5 OR tipodoc = 6)  
        ) AS TB_FINAL ORDER BY TB_FINAL.NUMERO DESC LIMIT 1
      `;
    } else if (tipo_serie >= 6 && tipo_serie < 9) {
      consulta = "SELECT ROUND(numero_factura) as numero FROM notas_credito WHERE serie = ? AND empresa = ? ORDER BY numero DESC LIMIT 1";
    } else if (tipo_serie >= 9 && tipo_serie < 12) {
      consulta = "SELECT ROUND(numero_factura) as numero FROM notas_debito WHERE serie = ? AND empresa = ? ORDER BY numero DESC LIMIT 1";
    } else if ((tipo_serie >= 12 && tipo_serie <= 13) || (tipo_serie >= 14 && tipo_serie < 19)) {
      consulta = "SELECT ROUND(correlativo) as numero FROM guia_remision WHERE serie = ? AND empresa = ? ORDER BY numero DESC LIMIT 1";
    } else if (tipo_serie >= 19) {
      consulta = "SELECT ROUND(numero_factura) as numero FROM facturas WHERE serie = ? AND empresa = ? ORDER BY numero DESC LIMIT 1";
    }

    const dataCorrelativo = await new Promise((resolve, reject) => {
      con.query(
        consulta,
        [id_serie, empresa, id_serie, empresa ],
        function (err, dataCorrelativo) {
          if (err) {
            reject(err);
          } else {
            resolve(dataCorrelativo);
          }
        }
      );
    });

    res.status(200).json(dataCorrelativo);
    con.close(); // cerrar conexion
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({
      error: "Hubo un error en la consulta a la base de datos",
    });
  }
}

module.exports = correlativo;
