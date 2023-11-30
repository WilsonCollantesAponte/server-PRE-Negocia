const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const bd_conexion = require("../conexion/bd_conexion");

//Consultas en la base de datos 1
router.post("/login", async (req, res) => {
  const { user, clave } = req.body;

  try {
    const results = await new Promise((resolve, reject) => {
      bd_conexion(1).query(
        "SELECT * FROM users WHERE user = ?",
        // "SELECT * FROM users WHERE user = ? AND clave = ?",
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

    // return res.status(200).json(results);

    if (results.length === 0) return res.status(200).json({ userExist: false });

    const passwordIsCorrect = await new Promise((resolve, reject) => {
      bcryptjs.compare(clave, results[0].clave, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });

    //Responde con informacón que determina si existe un usuario y clave
    res
      .status(200)
      .json({ userExist: results.length !== 0, passwordIsCorrect }),
       results[0];
  } catch (error) {
    console.error("Error en la consulta a la base de datos:", error);
    res.status(500).json({
      error: "Hubo un error en la consulta a la base de datos",
    });
  }
});

//Cosultas en la base de datos 1 y 4
router.post("/register", async (req, res) => {
  const user = req.body.user;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const clave = req.body.clave;
  const telefono = req.body.telefono;
  const nombre_empresa = req.body.nombre_empresa;
  // const rubro = req.body.rubro;
  const impuesto = 18;
  const moneda = "S/";
  const activo = 1;
  const id_plan = 0;
  const facturacion = 0;
  const tipo_facturacion = 1;
  const punto_venta = 1;
  const format_ticket = 1;
  const format_pdf = 1;
  const pais = 1;
  const alerta_suscripcion = 1;
  const estado = 7;
  const usuario_rol = 1;
  const nombre_almacen = "Sucursal Principal";
  const fechaActual = new Date();
  const dia = fechaActual.getDate();
  const mes = fechaActual.getMonth() + 1; // Los meses comienzan en 0, así que se suma 1
  const anio = fechaActual.getFullYear();
  const date_added = `${anio}-${mes}-${dia}`;

  //INSERT INTO TABLA PERFIL
  //Para la base de datos 1
  bd_conexion(1).query(
    "INSERT INTO perfil set ?",
    {
      nombre_comercial: nombre_empresa,
      telefono: telefono,
      email: user,
      fecha: date_added,
      rubro: rubro,
      estado: estado,
      impuesto: impuesto,
      moneda: moneda,
      activo: activo,
      id_plan: id_plan,
      facturacion: facturacion,
      tipo_facturacion: tipo_facturacion,
      punto_venta: punto_venta,
      format_ticket: format_ticket,
      format_pdf: format_pdf,
      pais: pais,
      alerta_suscripcion,
    },
    async (error, results) => {
      if (error) {
        console.log(error);
      }
    }
  );
  //Para la base de datos 4
  bd_conexion(4).query(
    "INSERT INTO perfil set ?",
    {
      nombre_comercial: nombre_empresa,
      telefono: telefono,
      email: user,
      fecha: date_added,
      rubro: rubro,
      estado: estado,
      impuesto: impuesto,
      moneda: moneda,
      activo: activo,
      id_plan: id_plan,
      facturacion: facturacion,
      tipo_facturacion: tipo_facturacion,
      punto_venta: punto_venta,
      format_ticket: format_ticket,
      format_pdf: format_pdf,
      pais: pais,
      alerta_suscripcion,
    },
    async (error, results) => {
      if (error) {
        console.log(error);
      }
    }
  );
  const sql = `SELECT id_perfil FROM perfil WHERE email = ? AND nombre_comercial = ? AND rubro = ?`;
  // Variable para almacenar el resultado
  let empresaId;
  //Para la base de datos 1
  bd_conexion(1).query(
    sql,
    [user, nombre_empresa, rubro],
    (error, results, fields) => {
      if (results.length > 0) {
        empresaId = results[0].id_perfil;

        // Utilizar la variable empresaId aquí dentro
        if (empresaId) {
          // INSERT INTO TABLA USERS
          bcryptjs.hash(clave, 8, (error, passwordHash) => {
            if (error) {
              console.log(error);
            } else {
              bd_conexion(1).query(
                "INSERT INTO users SET ?",
                {
                  user,
                  firstname,
                  lastname,
                  clave: passwordHash,
                  empresa: empresaId,
                  usuario_rol,
                  date_added,
                },
                (error, results) => {
                  if (error) {
                    console.log(error);
                  }
                }
              );
            }
          });

          const fechaActual = new Date();
          const dia = fechaActual.getDate();
          const mes = fechaActual.getMonth() + 1; // Los meses comienzan en 0, así que se suma 1
          const anio = fechaActual.getFullYear();
          const hora = fechaActual.getHours();
          const minutos = fechaActual.getMinutes();
          const segundos = fechaActual.getSeconds();
          const date_added = `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

          bd_conexion(1).query(
            "INSERT INTO almacen SET ?",
            {
              nombre: nombre_almacen,
              telefono,
              email: user,
              date_added: date_added,
              estado: "1",
              empresa: empresaId,
            },
            (error, results) => {
              if (error) {
                console.log(error);
              }
            }
          );
        } else {
          console.log("No se encontró ningún ID de perfil en la consulta.");
        }
      }
    }
  );
  //Para la base de datos 4
  bd_conexion(4).query(
    sql,
    [user, nombre_empresa, rubro],
    (error, results, fields) => {
      if (results.length > 0) {
        empresaId = results[0].id_perfil;

        // Utilizar la variable empresaId aquí dentro
        if (empresaId) {
          // INSERT INTO TABLA USERS
          bcryptjs.hash(clave, 8, (error, passwordHash) => {
            if (error) {
              console.log(error);
            } else {
              bd_conexion(4).query(
                "INSERT INTO users SET ?",
                {
                  user,
                  firstname,
                  lastname,
                  clave: passwordHash,
                  empresa: empresaId,
                  usuario_rol,
                  date_added,
                },
                (error, results) => {
                  if (error) {
                    console.log(error);
                  }
                }
              );
            }
          });

          const fechaActual = new Date();
          const dia = fechaActual.getDate();
          const mes = fechaActual.getMonth() + 1; // Los meses comienzan en 0, así que se suma 1
          const anio = fechaActual.getFullYear();
          const hora = fechaActual.getHours();
          const minutos = fechaActual.getMinutes();
          const segundos = fechaActual.getSeconds();
          const date_added = `${anio}-${mes}-${dia} ${hora}:${minutos}:${segundos}`;

          bd_conexion(4).query(
            "INSERT INTO almacen SET ?",
            {
              nombre: nombre_almacen,
              telefono,
              email: user,
              date_added: date_added,
              estado: "1",
              empresa: empresaId,
            },
            (error, results) => {
              if (error) {
                console.log(error);
              }
            }
          );
        } else {
          console.log("No se encontró ningún ID de perfil en la consulta.");
        }
      }
    }
  );
  // Hacer la consulta SQL para obtener las categorías desde tu base de datos
  bd_conexion(1).query(
    "SELECT * FROM rubro_empresa",
    (error, results, fields) => {
      if (error) {
        console.error("Error al ejecutar la consulta: ", error);
        return;
      }

      const result_datos = results; // Almacenar los resultados de la consulta en un array

      res.render("register", {
        alert: true,
        alertTitle: "Registar",
        alertMessage: "Registrado exitosamente",
        alertIcon: "success",
        showConfirmButton: false,
        time: 1500,
        ruta: "/login",
        rubro: result_datos,
      });
    }
  );
});

module.exports = router;
