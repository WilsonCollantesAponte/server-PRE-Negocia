const bd_conexion = require("../conexion/bd_conexion");

async function cliente(req, res) {
  const { empresa, id_empresa, valor_texto_busqueda } = req.body;
  const con = bd_conexion([id_empresa]);

  try {
    const dataCliente = await new Promise((resolve, reject) => {
      const likeValue = `%${valor_texto_busqueda}%`; // Variable para evitar repetir la lógica del LIKE

      con.query(
        `
        SELECT clientes.id_cliente, 
        (CASE WHEN clientes.nombre_cliente = '' THEN clientes.nombre_comercial ELSE clientes.nombre_cliente END) as orden, 
        clientes.dni, 
        clientes.direccion_cliente, 
        clientes.id_zona, 
        (SELECT zona_registros.nombre FROM zona_registros	
        WHERE zona_registros.id = clientes.id_zona AND zona_registros.empresa = '1') AS ZONA, 
        clientes.codigo_cliente,
        tipo_relacion_adicional_cliente.id_detalle
        
        FROM clientes 
        
        LEFT JOIN tipo_relacion_adicional_cliente ON ( tipo_relacion_adicional_cliente.id_cliente = clientes.id_cliente)
        
        LEFT JOIN tipo_detalle_adicional_cliente ON ( tipo_detalle_adicional_cliente.id = tipo_relacion_adicional_cliente.id_detalle_cliente)
        
        
        WHERE clientes.status_cliente = 1
         
        AND (clientes.codigo_cliente LIKE ? 
        OR clientes.nombre_cliente LIKE ? 
        OR clientes.nombre_comercial LIKE ? 
        OR clientes.dni LIKE ?
        OR tipo_detalle_adicional_cliente.nombre LIKE ?) 
            
        AND clientes.empresa = ? 
            
        GROUP BY clientes.id_cliente ORDER BY orden ASC LIMIT 10 
`,
        [likeValue, likeValue, likeValue, likeValue, likeValue, empresa],
        function (err, dataCliente) {
          if (err) {
            reject(err);
          } else {
            resolve(dataCliente);
          }
        }
      );
    });

    res.status(200).json(dataCliente);
    con.close(); // cerrar conexion
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({
      error: "Hubo un error en la consulta a la base de datos",
    });
  }
}

module.exports = cliente;
