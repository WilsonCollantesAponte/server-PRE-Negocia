const bcryptjs = require("bcryptjs");
const bd_conexion = require("../conexion/bd_conexion");

async function login(req, res) {
  const { user, clave } = req.body;

  //PONER EN VARIABLE LA CONEXION - CLOSE
  const con = bd_conexion(1);
  try {
    const results = await new Promise((resolve, reject) => {
        con.query(
          `SELECT
          tb_users.user_id AS IDUSUARIO,
          tb_users.clave AS clave,
          tb_users.empresa AS IDEMPRESA,
          tb_users.estado AS ESTADO_USUARIO,
          tb_perfil.estado AS ESTADO_EMPRESA,
          tb_base_datos.user_db AS USER_DB,
          tb_base_datos.clave_db AS CLAVE_DB,
          tb_base_datos.host_db AS HOST_DB,
          tb_base_datos.name_db AS NAME_DB,
          
          
          tb_perfil.ruc AS labsac_empresa_ruc,
          (CASE WHEN tb_perfil.nombre_empresa = '' THEN tb_perfil.nombre_comercial ELSE tb_perfil.nombre_empresa END) AS labsac_empresa_razon_social,
          tb_perfil.nombre_comercial AS labsac_empresa_nombre_comercial,
          tb_perfil.descripcion AS labsac_empresa_descripcion,
          tb_perfil.logo_url AS labsac_empresa_logo,
          tb_perfil.rubro AS labsac_empresa_rubro,
          tb_perfil.ubigueo AS labsac_empresa_ubigueo,
          tb_perfil.pais AS labsac_empresa_pais,
          tb_perfil.departamento AS labsac_empresa_departamento,
          tb_perfil.provincia AS labsac_empresa_provincia,
          tb_perfil.distrito AS labsac_empresa_distrito,
          tb_perfil.direccion AS labsac_empresa_direccion,
          tb_perfil.telefono AS labsac_empresa_telefono,
          tb_perfil.email AS labsac_empresa_email,
          tb_perfil.web AS labsac_empresa_web,
          tb_perfil.moneda AS labsac_empresa_moneda,
          tb_perfil.impuesto AS labsac_empresa_impuesto,
          tb_perfil.fecha AS labsac_empresa_fecha_inicio,
          tb_perfil.fechavencimiento AS labsac_empresa_fecha_vencimiento,
          tb_perfil.facturacion AS labsac_empresa_facturacion,
          tb_perfil.tipo_facturacion AS labsac_empresa_tipo_facturacion,
          tb_perfil.user_cpe AS labsac_empresa_user_cpe,
          tb_perfil.pass_cpe AS labsac_empresa_pass_cpe,
          tb_perfil.id_cpe AS labsac_empresa_cert_cpe,
          tb_perfil.ruta_cpe AS labsac_empresa_ruta_cpe,
          tb_perfil.id_plan AS labsac_empresa_id_plan,
          tb_perfil.punto_venta AS labsac_empresa_punto_venta,
          tb_perfil.alerta_suscripcion AS labsac_empresa_alerta_suscripcion,
          tb_perfil.alerta_fecha AS labsac_empresa_alerta_fecha,
          tb_perfil.id_bd AS labsac_empresa_id_bd,
          tb_perfil.id_sistema AS labsac_empresa_id_sistema,
          
          tb_users.dni AS labsac_usuario_dni,
          tb_users.firstname AS labsac_usuario_nombres,
          tb_users.lastname AS labsac_usuario_apellidos,
          tb_users.foto AS labsac_usuario_foto,
          tb_users.firma AS labsac_usuario_firma,
          tb_users.cargo AS labsac_usuario_cargo,
          tb_users.user AS labsac_usuario_email,
          tb_users.telefono AS labsac_usuario_telefono,
          tb_users.usuario_rol AS labsac_usuario_rol,
          tb_users.date_added AS labsac_usuario_fecha_inicio,
          tb_perfil.id_envio_facturacion AS labsac_usuario_id_envio_facturacion,
          tb_perfil.id_impuesto AS labsac_empresa_id_impuesto,
          TB_PERMISO_EMPRESA.estado AS ESTADO_PERMISO_MODO_RESTAURANT,
          tb_perfil.plan_nro_usuarios AS plan_nro_usuarios,
          tb_perfil.estado_configuracion_inicial AS estado_configuracion_inicial,
          tb_perfil.validacion_por_usuario AS validacion_por_usuario,
          tb_perfil.api_sunat_client_id AS api_sunat_client_id,
          tb_perfil.api_sunat_client_secret AS api_sunat_client_secret,
          tb_perfil.api_token_pse,
          
          tb_base_datos.replica AS REPLICA_DB
          
          FROM users tb_users
          
          INNER JOIN perfil tb_perfil
          ON (tb_users.empresa = tb_perfil.id_perfil AND tb_users.estado = 1 AND tb_users.user =  ? )
          
          INNER JOIN base_datos tb_base_datos
          ON (tb_base_datos.id = tb_perfil.id_bd AND tb_perfil.id_perfil = tb_users.empresa)
          
          LEFT JOIN permisos_otras_configuraciones_empresa TB_PERMISO_EMPRESA
          ON (TB_PERMISO_EMPRESA.id_permiso = 150 AND TB_PERMISO_EMPRESA.empresa = tb_users.empresa)`
          ,
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
    con.close(); //cerrar conexion
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({
      error: "Hubo un error en la consulta a la base de datos",
    });
  }
}

module.exports = login;
