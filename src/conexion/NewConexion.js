// NewConexion.js

const { createPool } = require('mysql2/promise');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE } = require('../config/ConfigBD.js');

const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASE
});

exports.fn_conexion = async (req, res, id_empresa) => {
    try {
        if (req.session.DB_USER && req.session.DB_PASSWORD &&
            req.session.DB_HOST && req.session.DB_DATABASE) {
            console.log('CONEXIÓN POR SESIÓN');
            return await createPool({
                host: req.session.DB_HOST,
                user: req.session.DB_USER,
                password: req.session.DB_PASSWORD,
                port: 3306,
                database: req.session.DB_DATABASE
            });
        } else {
            const sql = `
                SELECT base_datos.* FROM perfil 
                LEFT JOIN base_datos 
                ON (base_datos.id = perfil.id_bd)
                WHERE perfil.id_perfil = ? LIMIT 1
            `;
            const [rows] = await pool.query(sql, [id_empresa]);
            console.log('CONEXIÓN POR CONSULTA DB1');

            return await createPool({
                host: rows[0]['host_db'],
                user: rows[0]['user_db'],
                password: rows[0]['clave_db'],
                port: 3306,
                database: rows[0]['name_db']
            });
        }
    } catch (error) {
        console.error(`Error en fn_principal_producto: ${error.message}`);
        console.error(error.stack); // Imprime la pila de llamadas
        throw new Error(`Something went wrong in fn_principal_producto: ${error.message}`);
      
    }
};

exports.conn = async () => {
  const connection = await pool.getConnection();
  return {
    query: connection.execute.bind(connection),
    release: connection.release.bind(connection)
  };
};
