// NewConexion.js

import { createPool } from "mysql2/promise";
import { DB_HOST, DB_USER, DB_PASSWORD, DB_PORT, DB_DATABASE } from '../config/BdPromise.js'; // Corregido aquí

const pool = createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  port: DB_PORT,
  database: DB_DATABASE
});

export const fn_conexion = async (req, res, id_empresa) => {
    try {
        if (req.session.USER_DB && req.session.CLAVE_DB &&
            req.session.HOST_DB && req.session.NAME_DB) {
            console.log('CONEXIÓN POR SESIÓN');
            return await createPool({
                host: req.session.HOST_DB,
                user: req.session.USER_DB,
                password: req.session.CLAVE_DB,
                port: 3306,
                database: req.session.NAME_DB
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
        console.error("Error in fn_conexion:", error.message);
        throw new Error("Something went wrong in fn_conexion");
    }
};

export const conn = async () => {
  const connection = await pool.getConnection();
  return {
    query: connection.execute.bind(connection),
    release: connection.release.bind(connection)
  };
};