const bd_conexion = require("../conexion/bd_conexion");

async function productos(req, res) {
  try {
    const { empresa, id_bd } = req.body;
    const conn = bd_conexion([id_bd]);

    const response = await new Promise((resolve, reject) => {
   conn.query(`
    SELECT TABLA_FINAL.ID_PRODUCTO, TABLA_FINAL.CODIGO_PRODUCTO, TABLA_FINAL.NOMBRE_PRODUCTO, TABLA_FINAL.PRECIO_PRODUCTO, 
    TABLA_FINAL.COMPRA_PRODUCTO, TABLA_FINAL.VENTA_PRODUCTO, TABLA_FINAL.CATEGORIA_PRODUCTO, TABLA_FINAL.MARCA_PRODUCTO, 
    TABLA_FINAL.UNIDAD_PRODUCTO, TABLA_FINAL.IGV_PRODUCTO, TABLA_FINAL.TIPO_PRODUCTO, TABLA_FINAL.DESCRIPCION_PRODUCTO, 
    TABLA_FINAL.INVENTARIABLE_PRODUCTO, TABLA_FINAL.CUENTA_PRODUCTO, TABLA_FINAL.FOTO_PRODUCTO, TABLA_FINAL.TEXTO_INVENTARIABLE, 
    TABLA_FINAL.STOCK_MINIMO, TABLA_FINAL.STOCK_INICIAL, TABLA_FINAL.TEXTO_IGV, TABLA_FINAL.TEXTO_TIPO_PRODUCTO, 
    TABLA_FINAL.COSTO_PRODUCTO, TABLA_FINAL.CODIGO_SUNAT, TABLA_FINAL.DATE_ADDED, TABLA_FINAL.ID_CATEGORIA, 
    TABLA_FINAL.ID_MARCA, TABLA_FINAL.ID_UNIDAD, TABLA_FINAL.ISC, TABLA_FINAL.TIPO_ISC, TABLA_FINAL.AFECTO_A, 
    TABLA_FINAL.ID_CUENTA, TABLA_FINAL.ID_FOTO, TABLA_FINAL.ID_USUARIO, TABLA_FINAL.INV_ID_PRODUCTO_ALMACEN, 
    TABLA_FINAL.INV_STOCK_ACTUAL, TABLA_FINAL.INV_COSTO_PROMEDIO, TABLA_FINAL.INV_COSTO_TOTAL, TABLA_FINAL.NOMBRE_CARACTERISTICA,
    TABLA_FINAL.VALOR_CARACTERISTICA, TABLA_FINAL.ESTADO_MATRIZ, TB_NUM_ROWS.NUM_ROWS, TABLA_FINAL.MONEDA, 
    TABLA_FINAL.INV_STOCK_CONTABLE, TABLA_FINAL.INV_COSTO_PROMEDIO_CONTABLE, TABLA_FINAL.INV_COSTO_TOTAL_CONTABLE, 
    TABLA_FINAL.PRECIO_ECOMMERCE, TABLA_FINAL.COD_UNIDAD_M, TABLA_FINAL.EC_MOSTRAR_STOCK, TABLA_FINAL.TABLA_PRINCIPAL, 
    TABLA_FINAL.PRECIO_LP_SUCURSAL, TABLA_FINAL.CODIGO_BARRAS, TABLA_FINAL.CODIGO_BARRAS_TIPO, TABLA_FINAL.ID_UBICACION, 
    TABLA_FINAL.N_UBICACION, TABLA_FINAL.PRECIO_POR_FACTURAR, TABLA_FINAL.CANTIDAD_POR_FACTURAR, TABLA_FINAL.FECHA_POR_FACTURAR, 
    TABLA_FINAL.CANTIDAD_POR_BOLETEAR, TABLA_FINAL.STATUS_PRODUCTO, TABLA_FINAL.CANT_ULT_COMPRA, TABLA_FINAL.ULT_COSTO_COMPRA,
    TABLA_FINAL.ULT_ID_COMPRA, TABLA_FINAL.ULT_ID_TMP, TABLA_FINAL.NOMBRE_SUCURSAL, TABLA_FINAL.N_PROVEEDOR
    FROM ((
    SELECT tb_products.id_producto AS ID_PRODUCTO, tb_products.codigo_producto AS CODIGO_PRODUCTO, 
    tb_products.nombre_producto AS NOMBRE_PRODUCTO, tb_products.precio_producto AS PRECIO_PRODUCTO, 
    tb_products.compra AS COMPRA_PRODUCTO, tb_products.venta AS VENTA_PRODUCTO, 
    tb_familia_productom.nombre AS CATEGORIA_PRODUCTO, tb_marca.nombre AS MARCA_PRODUCTO, 
    tb_unidadm.nombre AS UNIDAD_PRODUCTO, tb_products.igv AS IGV_PRODUCTO, 
    tb_products.tipo_producto AS TIPO_PRODUCTO, tb_products.descripcion AS DESCRIPCION_PRODUCTO, 
    tb_products.inventariable AS INVENTARIABLE_PRODUCTO, tb_flujocaja2.subcategoria AS CUENTA_PRODUCTO, 
    CASE WHEN tb_products.foto = '' THEN 'https://negslab-img-producto.s3.amazonaws.com/null.png' 
    ELSE CONCAT('https://negslab-img-producto.s3.amazonaws.com/', tb_products.foto) END AS FOTO_PRODUCTO, 
    CASE WHEN tb_products.inventariable = '1' THEN 'Producto Inventariable' ELSE 'No Inventariable' END AS TEXTO_INVENTARIABLE, 
    ROUND(tb_producto_almacen.stock_minimo, 3) AS STOCK_MINIMO, tb_movimiento_inventario.cantidad AS STOCK_INICIAL, 
    CASE WHEN tb_products.igv = '0' THEN 'Exonerado (0%)' WHEN tb_products.igv = '1' THEN 'Gravado (18%)' 
    ELSE 'Inafecto (0%)' END AS TEXTO_IGV, CASE WHEN tb_products.tipo_producto = '1' THEN 'Producto Estandar' 
    WHEN tb_products.tipo_producto = '2' THEN 'Servicio' WHEN tb_products.tipo_producto = '3' THEN 'Insumo' 
    WHEN tb_products.tipo_producto = '4' THEN 'Kit' WHEN tb_products.tipo_producto = '5' THEN 'Producto Terminado' 
    ELSE 'Producto Estandar' END AS TEXTO_TIPO_PRODUCTO, CASE WHEN tb_producto_proveedorm.tipo_precio = '2' 
    THEN ROUND(tb_producto_proveedorm.precio, 2) / 100 * ROUND(tb_products.precio_producto, 2) 
    ELSE ROUND(tb_producto_proveedorm.precio, 2) END AS COSTO_PRODUCTO, tb_products.codigo_sunat AS CODIGO_SUNAT, 
    tb_products.date_added AS DATE_ADDED, tb_products.familia_producto AS ID_CATEGORIA, tb_products.marca AS ID_MARCA, 
    tb_products.unidad AS ID_UNIDAD, tb_products.isc AS ISC, tb_products.tipo_isc AS TIPO_ISC, tb_products.afecto_a AS AFECTO_A, 
    tb_products.cuenta AS ID_CUENTA, tb_products.foto AS ID_FOTO, tb_products.id_vendedor AS ID_USUARIO, 
    tb_producto_almacen.id AS INV_ID_PRODUCTO_ALMACEN, ROUND(tb_producto_almacen.stock_actual, 3) AS INV_STOCK_ACTUAL, 
    ROUND(tb_producto_almacen.costo_promedio, 2) AS INV_COSTO_PROMEDIO, ROUND(tb_producto_almacen.costo_total, 2) AS INV_COSTO_TOTAL,
    tb_caracteristica_producto.nombre_caracteristica AS NOMBRE_CARACTERISTICA, tb_caracteristica_producto.valor_caracteristica AS VALOR_CARACTERISTICA, 
    tb_products.estado_matriz AS ESTADO_MATRIZ, 0 AS NUMERO_MOVIMIENTOS, tb_products.tipo_moneda AS MONEDA, 
    ROUND(tb_producto_almacen.stock_contable, 3) AS INV_STOCK_CONTABLE, ROUND(tb_producto_almacen.costo_promedio_contable, 2) AS INV_COSTO_PROMEDIO_CONTABLE, 
    ROUND(tb_producto_almacen.costo_total_contable, 2) AS INV_COSTO_TOTAL_CONTABLE, tb_ecommerce_producto.precio AS PRECIO_ECOMMERCE,
    tb_unidadm.codigo AS COD_UNIDAD_M, (CASE WHEN tb_ecommerce_producto.mostrar_sin_stock IS NULL THEN 1 
    ELSE tb_ecommerce_producto.mostrar_sin_stock END) AS EC_MOSTRAR_STOCK, '1' AS TABLA_PRINCIPAL, 
    tb_lista_precio_detalle.precio_final AS PRECIO_LP_SUCURSAL, tb_products.codigo_barras AS CODIGO_BARRAS, 
    tb_products.codigo_barras_tipo AS CODIGO_BARRAS_TIPO, tb_products.id_ubicacion AS ID_UBICACION, 
    tb_products_ubicacion.nombre AS N_UBICACION, tb_products.precio_por_facturar AS PRECIO_POR_FACTURAR, 
    tb_products.cantidad_por_facturar AS CANTIDAD_POR_FACTURAR, tb_products.fecha_por_facturar AS FECHA_POR_FACTURAR, 
    tb_producto_almacen.cantidad_por_boletear AS CANTIDAD_POR_BOLETEAR, tb_products.status_producto AS STATUS_PRODUCTO,
    '' AS CANT_ULT_COMPRA, '' AS ULT_COSTO_COMPRA, '' AS ULT_ID_COMPRA, '' AS ULT_ID_TMP, 
    tb_sucursal.nombre AS NOMBRE_SUCURSAL, '' AS N_PROVEEDOR
FROM products tb_products
LEFT JOIN producto_almacen tb_producto_almacen ON (tb_producto_almacen.id_producto = tb_products.id_producto AND tb_producto_almacen.id_almacen = '2' AND tb_producto_almacen.empresa = ?)
LEFT JOIN familia_productom tb_familia_productom ON (tb_familia_productom.id = tb_products.familia_producto AND tb_familia_productom.empresa = ?)
LEFT JOIN marca tb_marca ON (tb_marca.id = tb_products.marca AND tb_marca.empresa = ?)
LEFT JOIN unidadm tb_unidadm ON (tb_unidadm.id = tb_products.unidad)
LEFT JOIN flujocaja2 tb_flujocaja2 ON (tb_flujocaja2.id = tb_products.cuenta)
LEFT JOIN movimiento_inventario tb_movimiento_inventario ON (tb_movimiento_inventario.id_producto = tb_products.id_producto AND tb_movimiento_inventario.tipo_movimiento = 3 AND tb_movimiento_inventario.id_almacen = '2' AND tb_movimiento_inventario.empresa = ?)
LEFT JOIN lista_precio tb_lista_precio ON (tb_lista_precio.id_categoria = 4 AND tb_lista_precio.estado = '1' AND tb_lista_precio.sucursal = 2 AND tb_lista_precio.empresa = 2)
LEFT JOIN lista_precio_detalle tb_lista_precio_detalle ON (tb_lista_precio.id = tb_lista_precio_detalle.id_lista_precio AND tb_lista_precio_detalle.id_elemento = tb_products.id_producto AND tb_lista_precio_detalle.tipo_ajuste = 5 AND tb_lista_precio_detalle.empresa = 2)
LEFT JOIN producto_proveedorm tb_producto_proveedorm ON (tb_producto_proveedorm.proveedor = 0 AND tb_producto_proveedorm.producto = tb_products.id_producto AND tb_producto_proveedorm.empresa = ?)
LEFT JOIN caracteristica_producto tb_caracteristica_producto ON (tb_caracteristica_producto.id_producto = tb_products.id_producto AND tb_caracteristica_producto.estado = 1 AND tb_caracteristica_producto.empresa = ?)
LEFT JOIN ecommerce_producto tb_ecommerce_producto ON (tb_ecommerce_producto.id_producto = tb_products.id_producto AND tb_ecommerce_producto.empresa = ?)
LEFT JOIN ecommerce_marca tb_ecommerce_marca ON (tb_ecommerce_marca.id_producto = tb_products.id_producto AND tb_ecommerce_marca.empresa = ?)
LEFT JOIN products_ubicacion tb_products_ubicacion ON (tb_products_ubicacion.id = tb_products.id_ubicacion AND tb_products_ubicacion.empresa = ? AND tb_products_ubicacion.estado = 1)
LEFT JOIN almacen tb_sucursal ON (tb_sucursal.id = '2' AND tb_sucursal.empresa = ?)
WHERE 1 = 1 AND tb_products.empresa = ? AND (tb_products.id_variable_cotizacion = '0') 
AND (CASE WHEN (DATE_FORMAT(tb_caracteristica_producto.valor_caracteristica, '%Y-%m-%d')) 
<= (DATE_FORMAT('2023-12-16', '%Y-%m-%d')) THEN 0 WHEN (DATE_FORMAT(tb_caracteristica_producto.valor_caracteristica, '%Y-%m-%d')) > 
(DATE_FORMAT('2023-12-16', '%Y-%m-%d')) THEN 1 WHEN (tb_products.estado_matriz <= 1 AND 
tb_caracteristica_producto.valor_caracteristica IS NULL) THEN 1 WHEN (tb_caracteristica_producto.valor_caracteristica = ''
AND tb_caracteristica_producto.id_producto = tb_products.id_producto) THEN 1 ELSE 0 END = 1) AND 
tb_products.status_producto = 1 AND tb_products.products_improvisado = 0
GROUP BY tb_products.id_producto
HAVING 1 = 1
ORDER BY tb_products.id_producto DESC) UNION ALL (
SELECT tb_producto_matriz.id AS ID_PRODUCTO, '' AS CODIGO_PRODUCTO, tb_producto_matriz.nombre AS NOMBRE_PRODUCTO, 
tb_producto_matriz.precio AS PRECIO_PRODUCTO, 0 AS COMPRA_PRODUCTO, 0 AS VENTA_PRODUCTO, tb_familia_productom.nombre AS CATEGORIA_PRODUCTO, 
tb_marca.nombre AS MARCA_PRODUCTO, 0 AS UNIDAD_PRODUCTO, 0 AS IGV_PRODUCTO, 0 AS TIPO_PRODUCTO, 0 AS DESCRIPCION_PRODUCTO, 
0 AS INVENTARIABLE_PRODUCTO, 0 AS CUENTA_PRODUCTO, CASE WHEN tb_producto_matriz.imagen = '' 
THEN 'https://negslab-img-producto.s3.amazonaws.com/null.png' ELSE CONCAT('https://negslab-img-producto.s3.amazonaws.com/', 
tb_producto_matriz.imagen) END AS FOTO_PRODUCTO, '' AS TEXTO_INVENTARIABLE, 0 AS STOCK_MINIMO, 0 AS STOCK_INICIAL, 0 AS TEXTO_IGV, 
'Producto Matriz' AS TEXTO_TIPO_PRODUCTO, 0 AS COSTO_PRODUCTO, 0 AS CODIGO_SUNAT, '' AS DATE_ADDED, 0 AS ID_CATEGORIA, 
0 AS ID_MARCA, 0 AS ID_UNIDAD, 0 AS ISC, 0 AS TIPO_ISC, 0 AS AFECTO_A, 0 AS ID_CUENTA, '' AS ID_FOTO, 0 AS ID_USUARIO, 
0 AS INV_ID_PRODUCTO_ALMACEN, 0 AS INV_STOCK_ACTUAL, 0 AS INV_COSTO_PROMEDIO, 0 AS INV_COSTO_TOTAL, '' AS NOMBRE_CARACTERISTICA,
 0 AS VALOR_CARACTERISTICA, 0 AS ESTADO_MATRIZ, 0 AS NUMERO_MOVIMIENTOS, 0 AS MONEDA, 0 AS INV_STOCK_CONTABLE, 
 0 AS INV_COSTO_PROMEDIO_CONTABLE, 0 AS INV_COSTO_TOTAL_CONTABLE, 0 AS PRECIO_ECOMMERCE, 0 AS COD_UNIDAD_M, 
 0 AS EC_MOSTRAR_STOCK, '2' AS TABLA_PRINCIPAL, 0 AS PRECIO_LP_SUCURSAL, '' AS CODIGO_BARRAS, '' AS CODIGO_BARRAS_TIPO, 
 0 AS ID_UBICACION, '' AS N_UBICACION, '' AS PRECIO_POR_FACTURAR, '' AS CANTIDAD_POR_FACTURAR, '' AS FECHA_POR_FACTURAR, 
 '' AS CANTIDAD_POR_BOLETEAR, 1 AS STATUS_PRODUCTO, '' AS CANT_ULT_COMPRA, '' AS ULT_COSTO_COMPRA, '' AS ULT_ID_COMPRA, 
 '' AS ULT_ID_TMP, '' AS NOMBRE_SUCURSAL, '' AS N_PROVEEDOR
FROM producto_matriz tb_producto_matriz
LEFT JOIN familia_productom tb_familia_productom ON (tb_familia_productom.id = tb_producto_matriz.categoria AND tb_familia_productom.empresa = ?)
LEFT JOIN marca tb_marca ON (tb_marca.id = tb_producto_matriz.marca AND tb_marca.empresa = ?)
WHERE tb_producto_matriz.estado_producto = 1 AND tb_producto_matriz.empresa = ?
GROUP BY tb_producto_matriz.id)) AS TABLA_FINAL
LEFT JOIN (
SELECT COUNT(*) AS NUM_ROWS
FROM (
SELECT tb_products.id_producto AS ID_PRODUCTO, tb_products.codigo_producto AS CODIGO_PRODUCTO,
tb_products.nombre_producto AS NOMBRE_PRODUCTO, tb_products.precio_producto AS PRECIO_PRODUCTO, 
tb_products.compra AS COMPRA_PRODUCTO, tb_products.venta AS VENTA_PRODUCTO, tb_familia_productom.nombre AS CATEGORIA_PRODUCTO, 
tb_marca.nombre AS MARCA_PRODUCTO, tb_unidadm.nombre AS UNIDAD_PRODUCTO, tb_products.igv AS IGV_PRODUCTO, 
tb_products.tipo_producto AS TIPO_PRODUCTO, tb_products.descripcion AS DESCRIPCION_PRODUCTO, 
tb_products.inventariable AS INVENTARIABLE_PRODUCTO, tb_flujocaja2.subcategoria AS CUENTA_PRODUCTO, 
CASE WHEN tb_products.foto = '' THEN 'https://negslab-img-producto.s3.amazonaws.com/null.png' ELSE 
CONCAT('https://negslab-img-producto.s3.amazonaws.com/', tb_products.foto) END AS FOTO_PRODUCTO, 
CASE WHEN tb_products.inventariable = '1' THEN 'Producto Inventariable' ELSE 'No Inventariable' END AS TEXTO_INVENTARIABLE, 
ROUND(tb_producto_almacen.stock_minimo, 3) AS STOCK_MINIMO, tb_movimiento_inventario.cantidad AS STOCK_INICIAL, 
CASE WHEN tb_products.igv = '0' THEN 'Exonerado (0%)' WHEN tb_products.igv = '1' THEN 'Gravado (18%)' ELSE 'Inafecto (0%)' 
END AS TEXTO_IGV, CASE WHEN tb_products.tipo_producto = '1' THEN 'Producto Estandar' WHEN tb_products.tipo_producto = '2' 
THEN 'Servicio' WHEN tb_products.tipo_producto = '3' THEN 'Insumo' WHEN tb_products.tipo_producto = '4' THEN 'Kit' 
WHEN tb_products.tipo_producto = '5' THEN 'Producto Terminado' ELSE 'Producto Estandar' END AS TEXTO_TIPO_PRODUCTO, 
CASE WHEN tb_producto_proveedorm.tipo_precio = '2' THEN ROUND(tb_producto_proveedorm.precio, 2) / 100 * ROUND(tb_products.precio_producto, 2) 
ELSE ROUND(tb_producto_proveedorm.precio, 2) END AS COSTO_PRODUCTO, tb_products.codigo_sunat AS CODIGO_SUNAT, 
tb_products.date_added AS DATE_ADDED, tb_products.familia_producto AS ID_CATEGORIA, tb_products.marca AS ID_MARCA, 
tb_products.unidad AS ID_UNIDAD, tb_products.isc AS ISC, tb_products.tipo_isc AS TIPO_ISC, tb_products.afecto_a AS AFECTO_A, 
tb_products.cuenta AS ID_CUENTA, tb_products.foto AS ID_FOTO, tb_products.id_vendedor AS ID_USUARIO, 
tb_producto_almacen.id AS INV_ID_PRODUCTO_ALMACEN, ROUND(tb_producto_almacen.stock_actual, 3) AS INV_STOCK_ACTUAL, 
ROUND(tb_producto_almacen.costo_promedio, 2) AS INV_COSTO_PROMEDIO, ROUND(tb_producto_almacen.costo_total, 2) AS INV_COSTO_TOTAL, 
tb_caracteristica_producto.nombre_caracteristica AS NOMBRE_CARACTERISTICA, tb_caracteristica_producto.valor_caracteristica AS VALOR_CARACTERISTICA, tb_products.estado_matriz AS ESTADO_MATRIZ, 
0 AS NUMERO_MOVIMIENTOS, tb_products.tipo_moneda AS MONEDA, ROUND(tb_producto_almacen.stock_contable, 3) AS INV_STOCK_CONTABLE, 
ROUND(tb_producto_almacen.costo_promedio_contable, 2) AS INV_COSTO_PROMEDIO_CONTABLE, 
ROUND(tb_producto_almacen.costo_total_contable, 2) AS INV_COSTO_TOTAL_CONTABLE, tb_ecommerce_producto.precio AS PRECIO_ECOMMERCE, 
tb_unidadm.codigo AS COD_UNIDAD_M, (CASE WHEN tb_ecommerce_producto.mostrar_sin_stock IS NULL THEN 1 
ELSE tb_ecommerce_producto.mostrar_sin_stock END) AS EC_MOSTRAR_STOCK, '1' AS TABLA_PRINCIPAL, 
tb_lista_precio_detalle.precio_final AS PRECIO_LP_SUCURSAL, tb_products.codigo_barras AS CODIGO_BARRAS, 
tb_products.codigo_barras_tipo AS CODIGO_BARRAS_TIPO, tb_products.id_ubicacion AS ID_UBICACION, 
tb_products_ubicacion.nombre AS N_UBICACION, tb_products.precio_por_facturar AS PRECIO_POR_FACTURAR, 
tb_products.cantidad_por_facturar AS CANTIDAD_POR_FACTURAR, tb_products.fecha_por_facturar AS FECHA_POR_FACTURAR, 
tb_producto_almacen.cantidad_por_boletear AS CANTIDAD_POR_BOLETEAR, tb_products.status_producto AS STATUS_PRODUCTO,
'' AS CANT_ULT_COMPRA, '' AS ULT_COSTO_COMPRA, '' AS ULT_ID_COMPRA, '' AS ULT_ID_TMP, tb_sucursal.nombre AS NOMBRE_SUCURSAL, 
'' AS N_PROVEEDOR
FROM products tb_products
LEFT JOIN producto_almacen tb_producto_almacen ON (tb_producto_almacen.id_producto = tb_products.id_producto AND tb_producto_almacen.id_almacen = '2' AND tb_producto_almacen.empresa = ?)
LEFT JOIN familia_productom tb_familia_productom ON (tb_familia_productom.id = tb_products.familia_producto AND tb_familia_productom.empresa = ?)
LEFT JOIN marca tb_marca ON (tb_marca.id = tb_products.marca AND tb_marca.empresa = ?)
LEFT JOIN unidadm tb_unidadm ON (tb_unidadm.id = tb_products.unidad)
LEFT JOIN flujocaja2 tb_flujocaja2 ON (tb_flujocaja2.id = tb_products.cuenta)
LEFT JOIN movimiento_inventario tb_movimiento_inventario ON (tb_movimiento_inventario.id_producto = tb_products.id_producto AND tb_movimiento_inventario.tipo_movimiento = 3 AND tb_movimiento_inventario.id_almacen = '2' AND tb_movimiento_inventario.empresa = ?)
LEFT JOIN lista_precio tb_lista_precio ON (tb_lista_precio.id_categoria = 4 AND tb_lista_precio.estado = '1' AND tb_lista_precio.sucursal = 2 AND tb_lista_precio.empresa = 2)
LEFT JOIN lista_precio_detalle tb_lista_precio_detalle ON (tb_lista_precio.id = tb_lista_precio_detalle.id_lista_precio AND tb_lista_precio_detalle.id_elemento = tb_products.id_producto AND tb_lista_precio_detalle.tipo_ajuste = 5 AND tb_lista_precio_detalle.empresa = 2)
LEFT JOIN producto_proveedorm tb_producto_proveedorm ON (tb_producto_proveedorm.proveedor = 0 AND tb_producto_proveedorm.producto = tb_products.id_producto AND tb_producto_proveedorm.empresa = ?)
LEFT JOIN caracteristica_producto tb_caracteristica_producto ON (tb_caracteristica_producto.id_producto = tb_products.id_producto AND tb_caracteristica_producto.estado = 1 AND tb_caracteristica_producto.empresa = ?)
LEFT JOIN ecommerce_producto tb_ecommerce_producto ON (tb_ecommerce_producto.id_producto = tb_products.id_producto AND tb_ecommerce_producto.empresa = ?)
LEFT JOIN ecommerce_marca tb_ecommerce_marca ON (tb_ecommerce_marca.id_producto = tb_products.id_producto AND tb_ecommerce_marca.empresa = ?)
LEFT JOIN products_ubicacion tb_products_ubicacion ON (tb_products_ubicacion.id = tb_products.id_ubicacion AND tb_products_ubicacion.empresa = ? AND tb_products_ubicacion.estado = 1)
LEFT JOIN almacen tb_sucursal ON (tb_sucursal.id = '2' AND tb_sucursal.empresa = ?)
WHERE 1 = 1 AND tb_products.empresa = ? AND (tb_products.id_variable_cotizacion = '0') AND (CASE WHEN (DATE_FORMAT(tb_caracteristica_producto.valor_caracteristica, '%Y-%m-%d')) <= (DATE_FORMAT('2023-12-16', '%Y-%m-%d')) THEN 0 WHEN (DATE_FORMAT(tb_caracteristica_producto.valor_caracteristica, '%Y-%m-%d')) > (DATE_FORMAT('2023-12-16', '%Y-%m-%d')) THEN 1 WHEN (tb_products.estado_matriz <= 1 AND tb_caracteristica_producto.valor_caracteristica IS NULL) THEN 1 WHEN (tb_caracteristica_producto.valor_caracteristica = '' AND tb_caracteristica_producto.id_producto = tb_products.id_producto) THEN 1 ELSE 0 END = 1) AND tb_products.status_producto = 1 AND tb_products.products_improvisado = 0
GROUP BY tb_products.id_producto
HAVING 1 = 1
ORDER BY tb_products.id_producto DESC) AS TB_NUM_ROWS) AS TB_NUM_ROWS ON 1 = 1
WHERE 1=1 AND TABLA_FINAL.TABLA_PRINCIPAL = 1
GROUP BY TABLA_FINAL.ID_PRODUCTO
ORDER BY TABLA_FINAL.ID_PRODUCTO DESC
LIMIT 0, 20
      `, 
      [empresa],
      function (err, results) {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    const withFrontSintax = response.map((productosObject) => productosObject.productos);

    res.status(200).json(withFrontSintax);
    conn.close(); // cerrar conexion
  } catch (error) {
    res.status(500).json({ error });
  }
}

module.exports = productos;
