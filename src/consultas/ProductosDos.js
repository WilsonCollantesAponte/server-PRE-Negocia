//const bd_conexion = require("../conexion/bd_conexion");
const { fn_conexion } = require('../../src/conexion/NewConexion.js');

const explode_filtros_globales_v2 = require('../funcion/funciones.js'); 
    
    async function productos_dos(req, res) {
        try {
            var isConditionTrue = true
            var empresa = parseInt(req.body.empresa)
            const conn_empresa = await fn_conexion(req, res, empresa);
           // var id_empresa = parseInt(req.body.id_bd)
            //const conn_empresa = bd_conexion([id_empresa]);
            //FILTROS
            if (isConditionTrue) {
            
            if (isConditionTrue) {
            var EC2_BUCKET_S3 = 'negslat';    
            var empresa = parseInt(req.body.empresa)
            var fn_id_producto = req.body.fn_id_producto || ''
            var fn_id_sucursal = parseInt(req.body.fn_id_sucursal) || ''
            var fn_offset = parseInt(req.body.fn_offset) || ''
            var fn_per_page = parseInt(req.body.fn_per_page) || ''
            var fn_id_categoria = req.body.fn_id_categoria || ''
            var fn_id_marca = req.body.fn_id_marca || ''
            var fn_id_unidad = req.body.fn_id_unidad || ''
            var fn_tipo = req.body.fn_tipo || ''
            var fn_id_cuenta = req.body.fn_id_cuenta || ''
            var fn_filtro_stock_minimo = req.body.fn_filtro_stock_minimo || ''
            var fn_productos_actividad = req.body.fn_productos_actividad || ''
            var fn_is_venta = parseInt(req.body.fn_is_venta) || ''
            var fn_is_compra = parseInt(req.body.fn_is_compra) || ''
            var fn_is_inventariable = parseInt(req.body.fn_is_inventariable) || ''
            var fn_texto_busqueda = req.body.fn_texto_busqueda || ''
            var fn_reporte_inventario_valorizado = parseInt(req.body.fn_reporte_inventario_valorizado) || ''
            
            var fn_join_producto_almacen
            if (fn_reporte_inventario_valorizado == 1) {
            fn_join_producto_almacen = 'INNER'
            } else {
            fn_join_producto_almacen = 'LEFT'
            }
            
            var fn_productos_existentes = req.body.fn_productos_existentes
            var fn_codigo_sunat = parseInt(req.body.fn_codigo_sunat)
            
            }
            
            if (isConditionTrue) {
            // 1. ES ECOMMERCE SHO
            // 2. ECOMMERCE DE NEGOCIA PRODUCTOS
            var fn_ecommerce_products = parseInt(req.body.fn_ecommerce_products)
            var img_default
            
            if (fn_ecommerce_products) {
            img_default = 'imagen_predeterminada_ec.png'
            } else {
            img_default = 'null.png'
            }
            
            // 1. REGISTROS PRODUCTOS
            // 0. INVENTARIO VALORIZADO
            var fn_producto_procedencia = parseInt(req.body.fn_producto_procedencia)
            
            if (fn_ecommerce_products === 1) {
            var filtro_marca = ''
            var filtro_marca_matriz = ''
            
            if (fn_id_marca) {
            var array_marcas = fn_id_marca.split(',')
            var i = 1
            var or = ''
            
            array_marcas.forEach((id_valor_marca) => {
            var id_marca = parseInt(id_valor_marca)
            
            if (i !== 1) {
            or = ' OR '
            }
            
            filtro_marca += `${or}(tb_products.marca = '${id_marca}' OR tb_ecommerce_marca.id_marca = '${id_marca}')`
            filtro_marca_matriz += `${or}(tb_producto_matriz.marca = '${id_marca}')`
            
            i++
            })
            
            consulta_array_marcas += ` AND (${filtro_marca})`
            consulta_array_marcas_matriz += ` AND (${filtro_marca_matriz})`
            }
            
            if (fn_ecommerce_products === 1 && !isNaN(fn_id_categoria)) {
            var filtro_categorias_oculta = ''
            var filtro_categorias_matriz = ''
            
            if (fn_id_categoria) {
            var array_categorias_ocultas = fn_id_categoria.split(',')
            var j = 1
            var or = ''
            
            array_categorias_ocultas.forEach((id_valor_c) => {
            var id_categoria_c = parseInt(id_valor_c)
            
            if (j !== 1) {
            or = 'OR '
            }
            
            filtro_categorias_oculta += `${or}(tb_products.familia_producto = '${id_categoria_c}' OR tb_categoria_producto.id_categoria = '${id_categoria_c}')`
            filtro_categorias_matriz += `${or}(tb_producto_matriz.categoria = '${id_categoria_c}')`
            
            j++
            })
            
            filtro_array_categoria += ` AND (${filtro_categorias_oculta})`
            filtro_array_categoria_matriz += ` AND (${filtro_categorias_matriz})`
            }
            }
            
            }
            
            }
            
            if (isConditionTrue) {
            var fn_tipo_documento = parseInt(req.body.fn_tipo_documento)
            
            // ORDEN ASC Y DESC
            var array_asc_desc = req.body.array_asc_desc || ''
            var array_tipo_asc_desc = array_asc_desc[0] || ''
            var array_order_asc_desc = array_asc_desc[1] || ''
            
            // ORDENAR POR PRECIO
            var tipo_orden_precio = parseInt(req.body.tipo_orden_precio)
            
            // ORDENAR POR STOCK
            var filtro_stock_producto = req.body.filtro_stock_producto
            
            // TIPO TABLA 1.PRODUCTOS 2.MATRIZ_PRODUCTOS
            var negocia_tabla_principal = parseInt(req.body.negocia_tabla_principal)
            
            // FILTRO STOCK INVENTARIO
            var array_filtro_busqueda_stock = req.body.array_filtro_busqueda_stock || 0
            var estado_busqueda_stock = array_filtro_busqueda_stock[0] || 0
            var filtro_cantidad_inventario = array_filtro_busqueda_stock[1] || 0
            
            var array_filtro_busqueda_lotes = req.body.array_filtro_busqueda_lotes
            var array_filtro_busqueda_lotes_ventas = req.body.array_filtro_busqueda_lotes_ventas
            var array_filtros_adicionales = parseInt(req.body.array_filtros_adicionales)
            var array_filtros_productos_vencidos = parseInt(req.body.array_filtros_productos_vencidos)
            
            var group_codigo = parseInt(req.body.group_codigo)
            
            var filtro_cantidad_por_facturar = parseInt(req.body.filtro_cantidad_por_facturar)
            
            var filtro_ecommerce_stock = parseInt(req.body.filtro_ecommerce_stock)
            
            // ULTIMA POSICION ARRAY
            var busqueda_variable_cotizacion = parseInt(req.body.busqueda_variable_cotizacion)
            
            // SIN NUMROWS PARA JSON AUTOCOMPvarE
            var no_conciderar_numrows = parseInt(req.body.no_conciderar_numrows)
            }
            
            if (isConditionTrue) {
            
            var order_precio_e = 'TABLA_FINAL.ID_PRODUCTO DESC'
            if (tipo_orden_precio == 2) {
            order_precio_e = 'ROUND(TABLA_FINAL.PRECIO_PRODUCTO,2) DESC'
            }
            if (tipo_orden_precio == 1) {
            order_precio_e = 'ROUND(TABLA_FINAL.PRECIO_PRODUCTO,2) ASC'
            }
            
            // FILTRO DE BUSQUEDA AVANZADO
            var filtro_texto_busqueda = ''
            var filtro_texto = ''
            
            if (fn_texto_busqueda) {
            
            // ES NUMERICO
            if (!isNaN(parseFloat(fn_texto_busqueda)) && isFinite(fn_texto_busqueda)) {
            var tipo_buscador = 1
            }
            // ES TEXTO
            else {
            var tipo_buscador = 2
            }
            
            var i = 1
            var and = ''
            
            // CONSULTA - CAMPO ADICIONAL PRODUCTO
            var sql_campos_adicionales = `SELECT id FROM producto_campo_adicional_tipo 
            WHERE empresa = "${empresa}" AND estado = 1 ORDER BY id ASC LIMIT 15`
            var [query_campos_adicionales] = await conn_empresa.query(sql_campos_adicionales)
            //var numrows_campos_adicionales = query_campos_adicionales.length
            
            
            // ACTUALIZACION FERNANDO - VALOR NUMERICO, BARCODE
            // ES NUMERICO
            if (tipo_buscador == 1) {
            // BUSQUEDA INTELIGENTE 
            var n_barcode = `
            (
            tb_products.codigo_producto = '${fn_texto_busqueda}'
            OR tb_products.codigo_producto LIKE '%${fn_texto_busqueda}%'
            OR (
            CASE 
            WHEN (tb_products.codigo_barras_tipo = 1)
            THEN ( 
            CAST((SUBSTRING(tb_products.codigo_barras, 1, 12)) AS UNSIGNED) = CAST((SUBSTRING('${fn_texto_busqueda}', 1, 12)) AS UNSIGNED)
            OR CAST((SUBSTRING(tb_products.codigo_barras, 1, 12)) AS UNSIGNED) LIKE CAST((CONCAT('%',SUBSTRING('${fn_texto_busqueda}', 1, 12),'%')) AS UNSIGNED)
            )
            WHEN (tb_products.codigo_barras_tipo = 2)
            THEN (tb_products.codigo_barras = '${fn_texto_busqueda}' OR tb_products.codigo_barras LIKE '%${fn_texto_busqueda}%')
            END
            )
            OR tb_products.nombre_producto LIKE '%${fn_texto_busqueda}%'
            `
            query_campos_adicionales.forEach((row) => {
            var id_campo_adicional = parseInt(row.id)
            n_barcode += ` OR (tb_detalle_${id_campo_adicional}.nombre REGEXP CONCAT('', '${fn_texto_busqueda}')) `
            })
            
            n_barcode += ` ) `
            
            filtro_texto += and + ` (${n_barcode})`
            
            
            }
            
            
            // ES TEXTO
            if (tipo_buscador == 2) {
            var fn_texto_reset = fn_texto_busqueda.split(' ')
            
            for (var j = 0; j < fn_texto_reset.length; j++) {
            var valor_texto_busqueda = fn_texto_reset[j]
            
            if (i != 1) {
            and = ' AND '
            }
            
            // TEXTO
            if (tipo_buscador == 2) {
            
            
            if (req.body.poc_busq_precisa_producto == 0) {
            
            filtro_texto += and + ` (
            tb_products.nombre_producto REGEXP CONCAT('', '${valor_texto_busqueda}')
            OR (tb_products.codigo_producto REGEXP CONCAT('', '${valor_texto_busqueda}'))
            OR (tb_marca.nombre REGEXP CONCAT('', '${valor_texto_busqueda}'))
            OR (tb_products.descripcion REGEXP CONCAT('', '${valor_texto_busqueda}'))
            OR (tb_familia_productom.nombre REGEXP CONCAT('', '${valor_texto_busqueda}'))
            OR (tb_caracteristica_producto.nombre_caracteristica REGEXP CONCAT('', '${valor_texto_busqueda}'))
            OR (tb_products_ubicacion.nombre REGEXP CONCAT('', '${valor_texto_busqueda}'))
            OR (
            CASE
            WHEN (tb_products.codigo_barras_tipo = 2) THEN (tb_products.codigo_barras = '${valor_texto_busqueda}' OR tb_products.codigo_barras LIKE '%${valor_texto_busqueda}%')
            END
            )`
            
            query_campos_adicionales.forEach((row) => {
            var id_campo_adicional = parseInt(row.id)
            filtro_texto += ` OR (tb_detalle_${id_campo_adicional}.nombre REGEXP CONCAT('', '${valor_texto_busqueda}')) `
            })
            
            
            filtro_texto += ` ) `
            
            
            }
            
            
            // ACTUALIZACION BUSQUEDA BETA - AIRTON
            if (req.body.poc_busq_precisa_producto == 2) {
            filtro_texto += and + ` ( CONCAT( ' ', tb_products.nombre_producto ,' ') REGEXP CONCAT(' ',  '${valor_texto_busqueda}', ' ' )) `
            }
            
            }
            
            
            
            i++
            }
            }
            
            // NUEVO FILTRO POR SEPARADO (BUSQUEDA INTELIGENTE, BUSQUEDA POR PALABRA)
            if (req.body.poc_busq_precisa_producto == 0 || req.body.poc_busq_precisa_producto == 2) {
            filtro_texto_busqueda += ` (${filtro_texto})`
            }
            
            
            // FILTRO ANTIGUO (BUSQUEDA PRECISA)
            if (req.body.poc_busq_precisa_producto == 1) {
            filtro_texto_busqueda += ` (
            tb_products.nombre_producto REGEXP CONCAT('', '${fn_texto_busqueda}') 
            OR (tb_products.codigo_producto REGEXP CONCAT('', '${fn_texto_busqueda}')) 
            OR (tb_marca.nombre REGEXP CONCAT('', '${fn_texto_busqueda}')) 
            OR (tb_products.descripcion REGEXP CONCAT('', '${fn_texto_busqueda}')) 
            OR (tb_familia_productom.nombre REGEXP CONCAT('', '${fn_texto_busqueda}')) 
            OR (tb_caracteristica_producto.nombre_caracteristica REGEXP CONCAT('', '${fn_texto_busqueda}')) 
            OR (tb_products_ubicacion.nombre REGEXP CONCAT('', '${fn_texto_busqueda}')) 
            OR ( 
            CASE  
            WHEN (tb_products.codigo_barras_tipo = 1) 
            THEN ( 
            CAST((SUBSTRING(tb_products.codigo_barras, 1, 12)) AS UNSIGNED) = CAST((SUBSTRING('${fn_texto_busqueda}', 1, 12)) AS UNSIGNED) 
            OR CAST((SUBSTRING(tb_products.codigo_barras, 1, 12)) AS UNSIGNED) LIKE CAST((CONCAT('%',SUBSTRING('${fn_texto_busqueda}', 1, 12),'%')) AS UNSIGNED) 
            ) 
            WHEN (tb_products.codigo_barras_tipo = 2) 
            THEN (tb_products.codigo_barras = '${fn_texto_busqueda}' OR tb_products.codigo_barras LIKE '%${fn_texto_busqueda}%') 
            END 
            ) 
            )`
            }
            }
            
            }
            
            // NUEVOS FILTROS - MDL1 - REPORTE DE PRODUCTOS
            if (isConditionTrue) {
            var array_mdl_cg_3 = req.body.array_mdl_cg_3 || []
            var mdl_cg_3_productos_x_proveedor = array_mdl_cg_3.mdl_cg_3_productos_x_proveedor || ''
            var mdl_cg_3_id_proveedor = array_mdl_cg_3.mdl_cg_3_id_proveedor || ''
            var mdl_cg_3_n_fecha_hasta = array_mdl_cg_3.mdl_cg_3_n_fecha_hasta || ''
            var mdl_cg_3_n_fecha_desde = array_mdl_cg_3.mdl_cg_3_n_fecha_desde || ''
            var mdl_cg_3_status_producto = array_mdl_cg_3.mdl_cg_3_status_producto || ''
            var mdl_cg_3_array_campos_adicionales = array_mdl_cg_3.mdl_cg_3_array_campos_adicionales || []
            var mdl_cg_3_tmp_selected = array_mdl_cg_3.mdl_cg_3_tmp_selected || ''
            var mdl_cg_3_session_id = array_mdl_cg_3.mdl_cg_3_session_id || ''
            var estado_delete = array_mdl_cg_3.estado_delete || ''
            }
            
            if (isConditionTrue) {
            var fnlab_compra_vende = req.body.fnlab_compra_vende
            var compra_vende = req.body.compra_vende // INVENTARIO-VALORIZADO
            
            // BUSCADOR SOLO ECOMMERCE GENERAL
            if (fn_ecommerce_products && fn_texto_busqueda) {
            var filtro_texto_busqueda = " tb_products.nombre_producto.match(new RegExp('', '" + fn_texto_busqueda + "'))"
            }
            
            var fecha_actual = new Date().toISOString().split('T')[0]
            }
            
            }
            
            //CONSULTA GENERAL (OPTIMIZADA)
            if (isConditionTrue) {
            var tabla_final = `
            SELECT
            TABLA_FINAL.ID_PRODUCTO,
            TABLA_FINAL.CODIGO_PRODUCTO,
            TABLA_FINAL.NOMBRE_PRODUCTO,
            TABLA_FINAL.PRECIO_PRODUCTO,
            TABLA_FINAL.COMPRA_PRODUCTO,
            TABLA_FINAL.VENTA_PRODUCTO,
            TABLA_FINAL.CATEGORIA_PRODUCTO,
            TABLA_FINAL.MARCA_PRODUCTO,
            TABLA_FINAL.UNIDAD_PRODUCTO,
            TABLA_FINAL.IGV_PRODUCTO,
            TABLA_FINAL.TIPO_PRODUCTO,
            TABLA_FINAL.DESCRIPCION_PRODUCTO,
            TABLA_FINAL.INVENTARIABLE_PRODUCTO,
            TABLA_FINAL.CUENTA_PRODUCTO,
            TABLA_FINAL.FOTO_PRODUCTO,
            TABLA_FINAL.TEXTO_INVENTARIABLE,
            TABLA_FINAL.STOCK_MINIMO,
            TABLA_FINAL.STOCK_INICIAL,
            TABLA_FINAL.TEXTO_IGV,
            TABLA_FINAL.TEXTO_TIPO_PRODUCTO,
            TABLA_FINAL.COSTO_PRODUCTO,
            TABLA_FINAL.CODIGO_SUNAT,
            TABLA_FINAL.DATE_ADDED,
            TABLA_FINAL.ID_CATEGORIA,
            TABLA_FINAL.ID_MARCA,
            TABLA_FINAL.ID_UNIDAD,
            TABLA_FINAL.ISC,
            TABLA_FINAL.TIPO_ISC,
            TABLA_FINAL.AFECTO_A,
            TABLA_FINAL.ID_CUENTA,
            TABLA_FINAL.ID_FOTO,
            TABLA_FINAL.ID_USUARIO,
            TABLA_FINAL.INV_ID_PRODUCTO_ALMACEN,
            TABLA_FINAL.INV_STOCK_ACTUAL,
            TABLA_FINAL.INV_COSTO_PROMEDIO,
            TABLA_FINAL.INV_COSTO_TOTAL,
            TABLA_FINAL.NOMBRE_CARACTERISTICA,
            TABLA_FINAL.VALOR_CARACTERISTICA,
            TABLA_FINAL.ESTADO_MATRIZ,`
            
            // SIN NUMROWS PARA JSON AUTOCOMPvarE
            if (!no_conciderar_numrows) {
            tabla_final += ` 0 AS NUM_ROWS`
            } else {
            tabla_final += ` TB_NUM_ROWS.NUM_ROWS`
            }
            
            if (fn_productos_actividad) {
            tabla_final += `, TABLA_FINAL.NUMERO_MOVIMIENTOS`
            }
            
            tabla_final += `
            , TABLA_FINAL.MONEDA,
            TABLA_FINAL.INV_STOCK_CONTABLE,
            TABLA_FINAL.INV_COSTO_PROMEDIO_CONTABLE,
            TABLA_FINAL.INV_COSTO_TOTAL_CONTABLE,
            TABLA_FINAL.PRECIO_ECOMMERCE,
            TABLA_FINAL.COD_UNIDAD_M,
            TABLA_FINAL.EC_MOSTRAR_STOCK,
            TABLA_FINAL.TABLA_PRINCIPAL,
            TABLA_FINAL.PRECIO_LP_SUCURSAL,
            TABLA_FINAL.CODIGO_BARRAS,
            TABLA_FINAL.CODIGO_BARRAS_TIPO,
            TABLA_FINAL.ID_UBICACION,
            TABLA_FINAL.N_UBICACION,
            TABLA_FINAL.PRECIO_POR_FACTURAR,
            TABLA_FINAL.CANTIDAD_POR_FACTURAR,
            TABLA_FINAL.FECHA_POR_FACTURAR,
            TABLA_FINAL.CANTIDAD_POR_BOLETEAR,
            TABLA_FINAL.STATUS_PRODUCTO`
            
            // PRODUCTOS COMPRADOS POR PROVEEDOR   
            if (mdl_cg_3_productos_x_proveedor) {
            
            tabla_final += `,
            TABLA_FINAL.CANT_ULT_COMPRA,
            TABLA_FINAL.ULT_COSTO_COMPRA,
            TABLA_FINAL.ULT_ID_COMPRA`
            
            // ULT ID TMP
            if (mdl_cg_3_tmp_selected) {
            tabla_final += `, TABLA_FINAL.ULT_ID_TMP`
            }
            
            } else {
            tabla_final += `,
            TABLA_FINAL.CANT_ULT_COMPRA,
            TABLA_FINAL.ULT_COSTO_COMPRA,
            TABLA_FINAL.ULT_ID_COMPRA,
            TABLA_FINAL.ULT_ID_TMP`
            }
            
            // AGREGAR AQUÍ LOS NUEVOS SELECTS
            tabla_final += `
            , TABLA_FINAL.NOMBRE_SUCURSAL
            , TABLA_FINAL.N_PROVEEDOR
            , TABLA_FINAL.TIPO_PRECIO_PRODUCTO
            `
            
            // CAMPOS ADICIONALES
            var sql_campos_adicionales = `SELECT id FROM producto_campo_adicional_tipo 
            WHERE empresa = "${empresa}" AND estado = 1 ORDER BY id ASC LIMIT 15`
            var [query_campos_adicionales] = await conn_empresa.query(sql_campos_adicionales)
            var numrows_campos_adicionales = query_campos_adicionales.length
            if (numrows_campos_adicionales) {
            query_campos_adicionales.forEach((row) => {
            var id_campo_adicional = parseInt(row.id)
            tabla_final += `,
            TABLA_FINAL.ID_CAMPO_ADICIONAL_${id_campo_adicional} AS ID_CAMPO_ADICIONAL_${id_campo_adicional},
            TABLA_FINAL.CAMPO_ADICIONAL_${id_campo_adicional} AS CAMPO_ADICIONAL_${id_campo_adicional}
            `
            })
            }
            
            tabla_final += `
            FROM (
            `
            
            }
            
            //CONSULTA PRINCIPAL T3_UNO
            if (isConditionTrue) {
            
            var t3_uno = `
            SELECT
            tb_products.id_producto AS ID_PRODUCTO,
            tb_products.codigo_producto AS CODIGO_PRODUCTO,
            tb_products.nombre_producto AS NOMBRE_PRODUCTO,
            tb_products.precio_producto AS PRECIO_PRODUCTO,
            tb_products.compra AS COMPRA_PRODUCTO,
            tb_products.venta AS VENTA_PRODUCTO,
            tb_familia_productom.nombre AS CATEGORIA_PRODUCTO,
            tb_marca.nombre AS MARCA_PRODUCTO,
            tb_unidadm.nombre AS UNIDAD_PRODUCTO,
            tb_products.igv AS IGV_PRODUCTO,
            tb_products.tipo_producto AS TIPO_PRODUCTO,
            tb_products.descripcion AS DESCRIPCION_PRODUCTO,
            tb_products.inventariable AS INVENTARIABLE_PRODUCTO,
            tb_flujocaja2.subcategoria AS CUENTA_PRODUCTO,
            CASE WHEN tb_products.foto = '' THEN 'https://${EC2_BUCKET_S3}-img-producto.s3.amazonaws.com/${img_default}'  
            ELSE CONCAT('https://${EC2_BUCKET_S3}-img-producto.s3.amazonaws.com/', tb_products.foto) END AS FOTO_PRODUCTO,
            CASE WHEN tb_products.inventariable = '1' THEN 'Producto Inventariable' ELSE 'No Inventariable' END AS TEXTO_INVENTARIABLE,
            ROUND(tb_producto_almacen.stock_minimo, 3) AS STOCK_MINIMO,
            tb_movimiento_inventario.cantidad AS STOCK_INICIAL,
            CASE WHEN tb_products.igv = '0' THEN 'Exonerado (0%)' WHEN tb_products.igv = '1' THEN 'Gravado (18%)' ELSE 'Inafecto (0%)' END AS TEXTO_IGV,
            CASE WHEN tb_products.tipo_producto = '1' THEN 'Producto Estandar' WHEN tb_products.tipo_producto = '2' THEN 'Servicio' 
            WHEN tb_products.tipo_producto = '3' THEN 'Insumo' WHEN tb_products.tipo_producto = '4' THEN 'Kit' WHEN tb_products.tipo_producto = '5' 
            THEN 'Producto Terminado' ELSE 'Producto Estandar' END AS TEXTO_TIPO_PRODUCTO,
            CASE WHEN tb_producto_proveedorm.tipo_precio = '2' THEN ROUND(tb_producto_proveedorm.precio, 2) / 100 * ROUND(tb_products.precio_producto, 2) 
            ELSE ROUND(tb_producto_proveedorm.precio, 2) END AS COSTO_PRODUCTO,
            tb_products.codigo_sunat AS CODIGO_SUNAT,
            tb_products.date_added AS DATE_ADDED,
            tb_products.familia_producto AS ID_CATEGORIA,
            tb_products.marca AS ID_MARCA,
            tb_products.unidad AS ID_UNIDAD,
            tb_products.isc AS ISC,
            tb_products.tipo_isc AS TIPO_ISC,
            tb_products.afecto_a AS AFECTO_A,
            tb_products.cuenta AS ID_CUENTA,
            tb_products.foto AS ID_FOTO,
            tb_products.id_vendedor AS ID_USUARIO,
            tb_producto_almacen.id AS INV_ID_PRODUCTO_ALMACEN,
            ROUND(tb_producto_almacen.stock_actual, 3) AS INV_STOCK_ACTUAL,
            ROUND(tb_producto_almacen.costo_promedio, 2) AS INV_COSTO_PROMEDIO,
            ROUND(tb_producto_almacen.costo_total, 2) AS INV_COSTO_TOTAL,
            tb_caracteristica_producto.nombre_caracteristica AS NOMBRE_CARACTERISTICA,
            tb_caracteristica_producto.valor_caracteristica AS VALOR_CARACTERISTICA,
            tb_products.estado_matriz AS ESTADO_MATRIZ
            `
            
            // PRODUCTOS EN ACTIVIDAD
            if (fn_productos_actividad) {
            t3_uno += `, CASE WHEN tb_movimiento_inventario_2.id IS NULL THEN 0 ELSE tb_movimiento_inventario_2.id END AS NUMERO_MOVIMIENTOS`
            } else {
            t3_uno += `, 0 AS NUMERO_MOVIMIENTOS`
            }
            
            t3_uno += `
            , tb_products.tipo_moneda AS MONEDA,
            ROUND(tb_producto_almacen.stock_contable, 3) AS INV_STOCK_CONTABLE,
            ROUND(tb_producto_almacen.costo_promedio_contable, 2) AS INV_COSTO_PROMEDIO_CONTABLE,
            ROUND(tb_producto_almacen.costo_total_contable, 2) AS INV_COSTO_TOTAL_CONTABLE,
            tb_ecommerce_producto.precio AS PRECIO_ECOMMERCE,
            tb_unidadm.codigo AS COD_UNIDAD_M,
            
            (CASE 
            WHEN tb_ecommerce_producto.mostrar_sin_stock IS NULL THEN 1
            ELSE tb_ecommerce_producto.mostrar_sin_stock
            END) AS EC_MOSTRAR_STOCK,
            '1' AS TABLA_PRINCIPAL,
            
            tb_lista_precio_detalle.precio_final AS PRECIO_LP_SUCURSAL,
            
            tb_products.codigo_barras AS CODIGO_BARRAS,
            tb_products.codigo_barras_tipo AS CODIGO_BARRAS_TIPO,
            
            tb_products.id_ubicacion AS ID_UBICACION,
            tb_products_ubicacion.nombre AS N_UBICACION,
            
            tb_products.precio_por_facturar AS PRECIO_POR_FACTURAR,
            tb_products.cantidad_por_facturar AS CANTIDAD_POR_FACTURAR,
            tb_products.fecha_por_facturar AS FECHA_POR_FACTURAR,
            tb_producto_almacen.cantidad_por_boletear AS CANTIDAD_POR_BOLETEAR,
            
            tb_products.status_producto AS STATUS_PRODUCTO
            `
            
            // PRODUCTOS COMPRADOS POR PROVEEDOR
            if (mdl_cg_3_productos_x_proveedor) {
            t3_uno += `,
            (SELECT CONCAT(detalle_compra.cantidad, ' (', unidadm.abreviatura, ')') FROM detalle_compra
            LEFT JOIN unidadm
            ON (unidadm.id = detalle_compra.uequivalente)
            LEFT JOIN compras
            ON (compras.id_factura = detalle_compra.id_compra AND compras.empresa = tb_products.empresa)
            WHERE tb_products.id_producto = detalle_compra.id_producto AND detalle_compra.empresa = tb_products.empresa
            ORDER BY compras.fecha_factura DESC LIMIT 1
            ) AS CANT_ULT_COMPRA,
            
            (SELECT 
            CASE WHEN compras.moneda = 1 THEN ((detalle_compra.valor_compra + detalle_compra.igv_compra + detalle_compra.isc_compra) / detalle_compra.cantidad)
            ELSE ((detalle_compra.valor_compra + detalle_compra.igv_compra + detalle_compra.isc_compra) / detalle_compra.cantidad) * compras.tipo_cambio
            END AS P_unit FROM detalle_compra
            LEFT JOIN compras
            ON (compras.id_factura = detalle_compra.id_compra AND compras.empresa = tb_products.empresa)
            WHERE tb_products.id_producto = detalle_compra.id_producto AND detalle_compra.empresa = tb_products.empresa
            ORDER BY compras.fecha_factura DESC LIMIT 1
            ) AS ULT_COSTO_COMPRA,
            
            (SELECT detalle_compra.id_compra FROM detalle_compra
            LEFT JOIN compras
            ON (compras.id_factura = detalle_compra.id_compra AND compras.empresa = tb_products.empresa)
            WHERE tb_products.id_producto = detalle_compra.id_producto AND detalle_compra.empresa = tb_products.empresa
            ORDER BY compras.fecha_factura DESC LIMIT 1
            ) AS ULT_ID_COMPRA
            `
            
            // ULT ID TMP
            if (mdl_cg_3_tmp_selected) {
            t3_uno += `,
            (SELECT ${mdl_cg_3_tmp_selected}.id_tmp FROM ${mdl_cg_3_tmp_selected}
            WHERE tb_products.id_producto = ${mdl_cg_3_tmp_selected}.id_producto
            AND ${mdl_cg_3_tmp_selected}.session_id = '${mdl_cg_3_session_id}'
            ORDER BY ${mdl_cg_3_tmp_selected}.id_tmp DESC LIMIT 1
            ) AS ULT_ID_TMP
            `
            }
            
            }
            else {
            t3_uno += `,
            '' AS CANT_ULT_COMPRA,
            '' AS ULT_COSTO_COMPRA,
            '' AS ULT_ID_COMPRA,
            '' AS ULT_ID_TMP
            `
            }
            
            if (fn_id_sucursal) {
            t3_uno += `, tb_sucursal.nombre AS NOMBRE_SUCURSAL `
            } else {
            t3_uno += `, 'Todas' AS NOMBRE_SUCURSAL `
            }
            
            if (mdl_cg_3_id_proveedor) {
            t3_uno += `,
            CONCAT(tb_proveedoresm.ruc, ' - ', tb_proveedoresm.razon) AS N_PROVEEDOR
            `
            } else {
            t3_uno += `,
            '' AS N_PROVEEDOR
            `
            }
            
            t3_uno += `, tb_producto_proveedorm.tipo_precio AS TIPO_PRECIO_PRODUCTO `
            
            // CAMPOS ADICIONALES
            var sql_campos_adicionales = `SELECT id FROM producto_campo_adicional_tipo 
            WHERE empresa = "${empresa}" AND estado = 1 ORDER BY id ASC LIMIT 15`
            var [query_campos_adicionales] = await conn_empresa.query(sql_campos_adicionales)
            var numrows_campos_adicionales = query_campos_adicionales.length
            if (numrows_campos_adicionales) {
            query_campos_adicionales.forEach((row) => {
            var id_campo_adicional = parseInt(row.id)
            t3_uno += `,
            GROUP_CONCAT(DISTINCT tb_detalle_${id_campo_adicional}.id) AS ID_CAMPO_ADICIONAL_${id_campo_adicional},
            GROUP_CONCAT(DISTINCT tb_detalle_${id_campo_adicional}.nombre) AS CAMPO_ADICIONAL_${id_campo_adicional}
            `
            })
            }
            
            
            t3_uno += `
            FROM 
            products tb_products
            `
            
            // TABLA ALMACENES EMPRESA
            if (fn_id_sucursal) {
            t3_uno += ` LEFT JOIN almacen tb_sucursal 
            ON ( tb_sucursal.id = '${fn_id_sucursal}' AND tb_sucursal.empresa = tb_products.empresa )`
            }
            
            t3_uno += `     
            ${fn_join_producto_almacen} JOIN producto_almacen tb_producto_almacen
            ON (tb_producto_almacen.id_producto = tb_products.id_producto AND tb_producto_almacen.id_almacen = tb_sucursal.id
            AND tb_producto_almacen.empresa = tb_products.empresa)
            
            LEFT JOIN familia_productom tb_familia_productom
            ON (tb_familia_productom.id = tb_products.familia_producto AND tb_familia_productom.empresa = tb_products.empresa)
            
            LEFT JOIN marca tb_marca
            ON (tb_marca.id = tb_products.marca AND tb_marca.empresa = tb_products.empresa)
            
            LEFT JOIN unidadm tb_unidadm
            ON (tb_unidadm.id = tb_products.unidad)
            
            LEFT JOIN flujocaja2 tb_flujocaja2
            ON (tb_flujocaja2.id = tb_products.cuenta)
            
            LEFT JOIN movimiento_inventario tb_movimiento_inventario
            ON (tb_movimiento_inventario.id_producto = tb_products.id_producto AND tb_movimiento_inventario.tipo_movimiento = 3 
            AND tb_movimiento_inventario.id_almacen = tb_sucursal.id AND tb_movimiento_inventario.empresa = tb_products.empresa)
            
            LEFT JOIN lista_precio tb_lista_precio
            ON (tb_lista_precio.id_categoria = 4 AND tb_lista_precio.estado = '1' 
            AND tb_lista_precio.sucursal = ${fn_id_sucursal} AND tb_lista_precio.empresa = ${empresa})
            
            LEFT JOIN lista_precio_detalle tb_lista_precio_detalle
            ON (tb_lista_precio.id = tb_lista_precio_detalle.id_lista_precio AND tb_lista_precio_detalle.id_elemento = tb_products.id_producto 
            AND tb_lista_precio_detalle.tipo_ajuste = 5 AND tb_lista_precio_detalle.empresa = ${empresa})
            
            `
            
            // PRODUCTOS EN ACTIVIDAD
            if (fn_productos_actividad) {
            t3_uno += `
            LEFT JOIN movimiento_inventario tb_movimiento_inventario_2
            ON (tb_movimiento_inventario_2.id_producto = tb_products.id_producto 
            AND tb_movimiento_inventario_2.tipo_movimiento != 3 
            AND tb_movimiento_inventario_2.id_almacen = tb_sucursal.id 
            AND tb_movimiento_inventario_2.empresa = tb_products.empresa)
            `
            }
            
            t3_uno += `
            LEFT JOIN producto_proveedorm tb_producto_proveedorm
            ON (tb_producto_proveedorm.proveedor = 0 AND tb_producto_proveedorm.producto = tb_products.id_producto 
            AND tb_producto_proveedorm.empresa = tb_products.empresa)
            
            LEFT JOIN caracteristica_producto tb_caracteristica_producto
            ON (tb_caracteristica_producto.id_producto = tb_products.id_producto 
            AND tb_caracteristica_producto.estado = 1 AND tb_caracteristica_producto.empresa = tb_products.empresa)
            
            LEFT JOIN ecommerce_producto tb_ecommerce_producto
            ON (tb_ecommerce_producto.id_producto = tb_products.id_producto AND tb_ecommerce_producto.empresa = tb_products.empresa)
            
            LEFT JOIN ecommerce_marca tb_ecommerce_marca ON (tb_ecommerce_marca.id_producto = tb_products.id_producto
            AND tb_ecommerce_marca.empresa = tb_products.empresa) 
            
            LEFT JOIN products_ubicacion tb_products_ubicacion
            ON (tb_products_ubicacion.id = tb_products.id_ubicacion AND tb_products_ubicacion.empresa = tb_products.empresa 
            AND tb_products_ubicacion.estado = 1 )
            
            `
            
            // CATEGORIAS ADICIONALES ECOMMERCE
            if (fn_ecommerce_products === 1) {
            t3_uno += ` LEFT JOIN categoria_producto tb_categoria_producto 
            ON ( tb_categoria_producto.id_producto = tb_products.id_producto AND tb_categoria_producto.estado = '1'
            AND tb_categoria_producto.empresa = tb_products.empresa )`
            }
            
            // PRODUCTOS COMPRADOS POR PROVEEDOR
            if (mdl_cg_3_productos_x_proveedor) {
            t3_uno += ` INNER JOIN compras tb_compras ON ( 1 = 1 `
            
            if (mdl_cg_3_id_proveedor) {
            t3_uno += ` AND tb_compras.id_cliente = ${mdl_cg_3_id_proveedor}`
            }
            
            t3_uno += `
            AND tb_compras.empresa = tb_products.empresa
            AND (DATE_FORMAT(tb_compras.fecha_factura, '%Y-%m-%d') BETWEEN DATE_FORMAT('${mdl_cg_3_n_fecha_desde}', '%Y-%m-%d')
            AND DATE_FORMAT('${mdl_cg_3_n_fecha_hasta}', '%Y-%m-%d'))
            )
            INNER JOIN detalle_compra tb_detalle_compra
            ON (tb_products.id_producto = tb_detalle_compra.id_producto AND tb_detalle_compra.id_compra = tb_compras.id_factura 
            AND tb_detalle_compra.empresa = tb_products.empresa)`
            
            if (mdl_cg_3_id_proveedor) {
            t3_uno += `
            LEFT JOIN proveedoresm tb_proveedoresm
            ON (tb_compras.id_cliente = tb_proveedoresm.id AND tb_proveedoresm.empresa = tb_compras.empresa)`
            }
            }
            
            // CAMPOS ADICIONALES
            var sql_campos_adicionales = `SELECT id FROM producto_campo_adicional_tipo WHERE empresa = '${empresa}'
            AND estado = '1' ORDER BY id ASC LIMIT 15`
            var [query_campos_adicionales] = await conn_empresa.query(sql_campos_adicionales)
            var numrows_campos_adicionales = query_campos_adicionales.length
            if (numrows_campos_adicionales) {
            t3_uno += ` LEFT JOIN producto_relacion_detalle_adicional tb_relacion
            ON (tb_relacion.id_producto = tb_products.id_producto AND tb_relacion.empresa = tb_products.empresa
            AND tb_relacion.estado = 1 )`
            
            query_campos_adicionales.forEach((row) => {
            var id_campo_adicional = parseInt(row.id)
            t3_uno += ` LEFT JOIN producto_detalle_campo_adicional tb_detalle_${id_campo_adicional}
            ON (tb_relacion.id_detalle_adiconal = tb_detalle_${id_campo_adicional}.id 
            AND tb_detalle_${id_campo_adicional}.empresa = tb_products.empresa`
            
            var n_campo_adicional = mdl_cg_3_array_campos_adicionales[`mdl_cg_3_id_campo_adicional_${id_campo_adicional}`] || ''
            if (n_campo_adicional) {
            t3_uno += ` AND tb_detalle_${id_campo_adicional}.id = ${n_campo_adicional}`
            }
            
            t3_uno += ` AND tb_detalle_${id_campo_adicional}.id_campo_adicional = ${id_campo_adicional})`
            
            })
            
            }
            
            // T3_TRES
            t3_uno += ` WHERE 1 = 1 `
            
            // FILTRO EMPRESA
            t3_uno += ` AND tb_products.empresa = '${empresa}' `
            
            // FILTRO VENTA ELECTRONICA
            if (fn_tipo_documento === 3 || fn_tipo_documento === 4 || fn_tipo_documento === 19) {
            t3_uno += ` AND tb_products.venta_electronica = 1`
            }
            
            // FILTRO PROCEDENCIA DEL PRODUCTO
            if (fn_producto_procedencia) {
            t3_uno += ` AND (tb_products.estado_matriz = 1 OR tb_products.estado_matriz = 2) AND tb_products.id_matriz = 0`
            }
            
            // FILTRO ID PRODUCTO
            if (fn_id_producto) {
            var array_filtro_id_producto = explode_filtros_globales_v2('tb_products.id_producto', fn_id_producto)
            t3_uno += ` AND (${array_filtro_id_producto})`
            }
            
            // FILTRO NOMBRE PRODUCTO 109
            if (filtro_texto_busqueda) {
            t3_uno += ` AND (${filtro_texto_busqueda})`
            }
            
            // FILTRO TIPO DE PRODUCTO
            if (fn_tipo) {
            var array_filtro_tipo_producto = explode_filtros_globales_v2('tb_products.tipo_producto', fn_tipo)
            t3_uno += ` AND (${array_filtro_tipo_producto})`
            }
            
            // ECOMMERCE SOLO PRODUCTOS ACTIVADOS
            if (fn_ecommerce_products && fn_ecommerce_products === 1) {
            t3_uno += ` AND (tb_products.estado_ecommerce = '1')`
            }
            
            // ECOMMERCE SOLO PRODUCTOS DESACTIVADOS
            if (fn_ecommerce_products !== '' && fn_ecommerce_products === 4) {
            t3_uno += " AND (tb_products.estado_ecommerce = '0')"
            }
            
            // FILTRO ADICIONAL
            if (array_filtros_adicionales) {
            t3_uno += ` AND (tb_producto_relacion_detalle_adicional.id_detalle_adiconal = '${array_filtros_adicionales}')`
            }
            
            // FILTRO ID MARCA
            if (fn_ecommerce_products && fn_ecommerce_products === 1) {
            t3_uno += `${consulta_array_marcas}`
            } else {
            if (fn_id_marca) {
            var array_filtro_id_marca = explode_filtros_globales_v2('tb_products.marca', fn_id_marca)
            t3_uno += ` AND (${array_filtro_id_marca})`
            }
            }
            
            
            // FILTRO ID CATEGORIA
            if (fn_ecommerce_products && fn_ecommerce_products === 1 && isNaN(fn_id_categoria)) {
            t3_uno += ` ${filtro_array_categoria}`
            } else {
            if (fn_id_categoria) {
            var array_filtro_id_categoria = explode_filtros_globales_v2('tb_products.familia_producto', fn_id_categoria)
            t3_uno += ` AND (${array_filtro_id_categoria})`
            }
            }
            
            // FILTRAR SOLO LOTES
            if (array_filtro_busqueda_lotes) {
            t3_uno += ` AND tb_products.id_producto IN (SELECT id_producto FROM caracteristica_producto 
            WHERE tipo_caracteristica = '1' AND empresa ='${empresa}' AND estado = '1')`
            }
            
            // FILTRO DE VALOR COTIZACION
            if (busqueda_variable_cotizacion) {
            t3_uno += ` AND (tb_products.id_variable_cotizacion = '0')`
            }
            
            // FILTRO STOCK
            if (estado_busqueda_stock) {
            var array_filtro_stock_cantidades = explode_filtros_globales_v2('tb_producto_almacen.stock_actual', filtro_cantidad_inventario)
            t3_uno += ` AND (${array_filtro_stock_cantidades})`
            }
            
            // PERMISO PARA MOSTRAR PRODUCTOS DEL ECOMMERCE CON O SIN STOCK
            if (filtro_ecommerce_stock) {
            t3_uno += ` AND (CASE WHEN tb_ecommerce_producto.mostrar_sin_stock IS NULL 
            AND (ROUND(tb_producto_almacen.stock_actual, 3) > '0')  THEN 1 
            WHEN tb_ecommerce_producto.mostrar_sin_stock = 1 
            AND (ROUND(tb_producto_almacen.stock_actual, 3) > '0') THEN 1
            WHEN  (tb_ecommerce_producto.mostrar_sin_stock = 0)  THEN 1
            WHEN  (tb_products.tipo_producto = 2)  THEN 1
            ELSE 0  END = 1)`
            }
            
            // FILTRO SI ES INVENTARIABLE
            if (fn_is_inventariable) {
            t3_uno += ` AND (tb_products.inventariable = '${fn_is_inventariable}')`
            }
            
            // FILTRO PRODUCTO DE VENTA
            if (fn_is_venta) {
            t3_uno += ` AND (tb_products.venta = '${fn_is_venta}')`
            }
            
            // FILTRO POR FACTURAR
            if (filtro_cantidad_por_facturar) {
            t3_uno += ` AND (tb_products.cantidad_por_facturar > '0.00' )`
            }
            
            // FILTRO PRODUCTO DE COMPRA
            if (fn_is_compra) {
            t3_uno += ` AND (tb_products.compra = '${fn_is_compra}')`
            }
            
            // FILTRO STOCK MINIMO
            if (fn_filtro_stock_minimo === 1) {
            t3_uno += ` AND (ROUND(tb_producto_almacen.stock_actual, 3) <= ROUND(tb_producto_almacen.stock_minimo, 3))`
            }
            
            // PRODUCTOS CON Y SIN STOCK
            if (filtro_stock_producto) {
            // VALIDACION STOCK
            var array_campo_stock = filtro_stock_producto.split(',')
            array_campo_stock.forEach((id_valor_stock_product) => {
            var id_campo_stock = parseInt(id_valor_stock_product)
            filtro_operacion_stock += id_campo_stock
            })
            var operacion_stock = filtro_operacion_stock
            if (operacion_stock === 1) { filtro_stock_producto = 1 }
            if (operacion_stock === 2) { filtro_stock_producto = 2 }
            if (operacion_stock === 3) { filtro_stock_producto = 0 }
            
            if (filtro_stock_producto && filtro_stock_producto === 1) {
            t3_uno += ` AND (ROUND(tb_producto_almacen.stock_actual, 3) > '0') `
            }
            if (filtro_stock_producto && filtro_stock_producto === 2) {
            t3_uno += ` AND (ROUND(tb_producto_almacen.stock_actual, 3) <= '0') `
            }
            }
            
            //PRODUCTOS EN ACTIVIDAD
            if (fn_productos_actividad) {
            
            //VALIDACION ACTIVIDAD
            var filtro_operacion_actividad = 0
            fn_productos_actividad.split(',').forEach(id_valor_actividad_product => {
            var id_campo_actividad = parseInt(id_valor_actividad_product.trim())
            filtro_operacion_actividad += id_campo_actividad
            })
            if (filtro_operacion_actividad === 1) {
            fn_productos_actividad = 1
            }
            if (filtro_operacion_actividad === 2) {
            fn_productos_actividad = 2
            }
            if (filtro_operacion_actividad === 3) {
            fn_productos_actividad = 0
            }
            
            //PRODUCTOS CON ACTIVIDAD
            if (fn_productos_actividad === 1) {
            t3_uno += ` AND (CASE WHEN tb_movimiento_inventario_2.id IS NULL THEN 0 ELSE tb_movimiento_inventario_2.id END > 0)`
            }
            
            //PRODUCTOS SIN ACTIVIDAD
            if (fn_productos_actividad === 2) {
            t3_uno += ` AND (CASE WHEN tb_movimiento_inventario_2.id IS NULL THEN 0 ELSE tb_movimiento_inventario_2.id END <= 0)`
            }
            
            }
            
            //PRODUCTOS EXISTENTES
            if (fn_productos_existentes) {
            
            //VALIDACION ACTIVIDAD
            var filtro_operacion_existente = 0
            array_campo_existentes.split(',').forEach(id_valor_existente_product => {
            var id_campo_existente = parseInt(id_valor_existente_product.trim())
            filtro_operacion_existente += id_campo_existente
            })
            if (filtro_operacion_existente === 1) {
            fn_productos_existentes = 1
            }
            if (filtro_operacion_existente === 2) {
            fn_productos_existentes = 2
            }
            if (filtro_operacion_existente === 3) {
            fn_productos_existentes = 0
            }
            
            //PRODUCTOS EXISTENTES
            if (fn_productos_existentes === 1) {
            t3_uno += ` AND (tb_producto_almacen.id > 0 AND tb_producto_almacen.estado = '1')`
            }
            
            //PRODUCTOS NO EXISTENTES
            if (fn_productos_existentes === 2) {
            t3_uno += ` AND (tb_producto_almacen.id <= 0 OR tb_producto_almacen.id IS NULL OR tb_producto_almacen.estado = '0')`
            }
            
            }
            
            //SE VENDE SE COMPRA
            if (fnlab_compra_vende) {
            
            if (fnlab_compra_vende === 3) {
            t3_uno += ` AND (tb_products.compra = '1' AND tb_products.venta = '1')`
            }
            if (fnlab_compra_vende === 1) {
            t3_uno += ` AND (tb_products.compra = '1')`
            }
            if (fnlab_compra_vende === 2) {
            t3_uno += ` AND (tb_products.venta = '1')`
            }
            
            }
            
            // ARRAY COMPRA VENDE - INVENTARIO
            if (compra_vende) {
            var i = 1
            var or = ''
            
            compra_vende.split(',').forEach(id_compra_vende => {
            var id_compra_vende = parseInt(id_compra_vende.trim())
            
            if (i >= 1) {
            or = ' AND '
            }
            if (id_compra_vende === 1) {
            t3_uno += ` ${or}(tb_products.compra = '1') `
            }
            
            if (id_compra_vende === 2) {
            t3_uno += ` ${or}(tb_products.venta = '1') `
            }
            
            if (id_compra_vende === 1 && id_compra_vende === 2) {
            t3_uno += ` ${or}(tb_products.compra = '1' AND tb_products.venta = '1') `
            }
            i++
            })
            
            }
            
            // FILTRO CODIGO SUNAT
            if (fn_codigo_sunat) {
            t3_uno += ` AND (tb_products.codigo_sunat = '${fn_codigo_sunat}')`
            }
            
            if (array_filtros_productos_vencidos === 1) {
            t3_uno += ` AND (CASE WHEN (DATE_FORMAT(tb_caracteristica_producto.valor_caracteristica, '%Y-%m-%d')) <= (DATE_FORMAT('${fecha_actual}', '%Y-%m-%d')) THEN 0 
            WHEN (DATE_FORMAT(tb_caracteristica_producto.valor_caracteristica, '%Y-%m-%d')) > (DATE_FORMAT('${fecha_actual}', '%Y-%m-%d')) THEN 1 `
            } else if (array_filtros_productos_vencidos === 2) {
            t3_uno += ` AND (CASE WHEN (DATE_FORMAT(tb_caracteristica_producto.valor_caracteristica, '%Y-%m-%d')) <= (DATE_FORMAT('${fecha_actual}', '%Y-%m-%d')) THEN 1 `
            } else {
            if (array_filtro_busqueda_lotes_ventas && array_filtro_busqueda_lotes_ventas === 1) {
            t3_uno += ` AND (CASE WHEN (DATE_FORMAT(tb_caracteristica_producto.valor_caracteristica, '%Y-%m-%d')) >= (DATE_FORMAT('${fecha_actual}', '%Y-%m-%d'))`
            
            // PERMISO - VENDER SIN STOCK
            if (req.body.neg_vender_sin_stock_6) {
            t3_uno += ` AND (ROUND(tb_producto_almacen.stock_actual, 3) > '0') `
            }
            
            t3_uno += ` THEN 1`
            } else if (array_filtro_busqueda_lotes_ventas === 2) {
            t3_uno += ` AND (CASE WHEN (DATE_FORMAT(tb_caracteristica_producto.valor_caracteristica, '%Y-%m-%d')) >= (DATE_FORMAT('${fecha_actual}', '%Y-%m-%d')) THEN 1`
            } else {
            t3_uno += ` AND (CASE WHEN (DATE_FORMAT(tb_caracteristica_producto.valor_caracteristica, '%Y-%m-%d')) >= (DATE_FORMAT('${fecha_actual}', '%Y-%m-%d')) 
            OR (ROUND(tb_producto_almacen.stock_actual, 3) > '0') THEN 1`
            }
            }
            
            // MATRICES
            t3_uno += ` WHEN (`
            if (fn_producto_procedencia === 0) {
            t3_uno += ` tb_products.estado_matriz <= 1 AND `
            }
            t3_uno += ` tb_caracteristica_producto.valor_caracteristica IS NULL) THEN 1 ELSE 0 END = 1)`
            
            
            // PRODUCTOS COMPRADOS POR PROVEEDOR
            if (mdl_cg_3_productos_x_proveedor) {
            
            // FILTRO STATUS PRODUCTO
            if (mdl_cg_3_status_producto) {
            var mdl_cg_3_status_producto_final = mdl_cg_3_status_producto
            if (mdl_cg_3_status_producto === 2) {
            mdl_cg_3_status_producto_final = 0
            }
            t3_uno += ` AND tb_products.status_producto = ${mdl_cg_3_status_producto_final}`
            }
            }
            
            // T3_TRES
            else {
            if (estado_delete) {
            t3_uno += ` AND tb_products.status_producto = 0 `
            } else {
            t3_uno += ` AND tb_products.status_producto = 1 `
            }
            }
            
            // PRODUCTO IMPROVISADOS
            t3_uno += ` AND tb_products.products_improvisado = 0 `
            
            // GROUP BY
            if (group_codigo) {
            t3_uno += ` GROUP BY tb_products.codigo_producto `
            } else {
            t3_uno += ` GROUP BY tb_products.id_producto `
            }
            
            t3_uno += ` HAVING 1 = 1 `
            
            
            
            
            
            
            
            
            // FILTROS DE CAMPOS ADICIONALES
            var sql_campos_adicionales = `SELECT id FROM producto_campo_adicional_tipo WHERE empresa = '${empresa}' AND estado = '1' ORDER BY id ASC LIMIT 15`
            var [query_campos_adicionales] = await conn_empresa.query(sql_campos_adicionales)
            var numrows_campos_adicionales = query_campos_adicionales.length
            if (numrows_campos_adicionales) {
            query_campos_adicionales.forEach((row) => {
            var id_campo_adicional = parseInt(row.id)
            var n_campo_adicional = mdl_cg_3_array_campos_adicionales[`mdl_cg_3_id_campo_adicional_${id_campo_adicional}`]
            if (n_campo_adicional) {
            t3_uno += ` AND ID_CAMPO_ADICIONAL_${id_campo_adicional} = ${n_campo_adicional}`
            }
            })
            }
            
            // ORDER BY
            if (fn_ecommerce_products) {
            if (array_tipo_asc_desc && array_order_asc_desc) {
            // TIPO ASC O DESC
            var n_array_order_asc_desc = ''
            if (array_order_asc_desc === 1) {
            n_array_order_asc_desc = ' ASC'
            }
            if (array_order_asc_desc === 2) {
            n_array_order_asc_desc = ' DESC'
            }
            
            // TIPO DE COLUMNA
            var n_array_tipo_asc_desc = ''
            if (array_tipo_asc_desc === 2) {
            n_array_tipo_asc_desc = `tb_products.codigo_producto${n_array_order_asc_desc}`
            }
            if (array_tipo_asc_desc === 3) {
            n_array_tipo_asc_desc = `tb_products.nombre_producto${n_array_order_asc_desc}`
            }
            if (array_tipo_asc_desc === 4) {
            n_array_tipo_asc_desc = `tb_marca.nombre${n_array_order_asc_desc}`
            }
            if (array_tipo_asc_desc === 5) {
            n_array_tipo_asc_desc = `tb_unidadm.nombre${n_array_order_asc_desc}`
            }
            if (array_tipo_asc_desc === 6) {
            n_array_tipo_asc_desc = `ROUND(tb_producto_almacen.stock_actual, 3)${n_array_order_asc_desc}`
            }
            if (array_tipo_asc_desc === 7) {
            n_array_tipo_asc_desc = `ROUND(tb_producto_almacen.stock_minimo, 3)${n_array_order_asc_desc}`
            }
            if (array_tipo_asc_desc === 8) {
            n_array_tipo_asc_desc = `ROUND(tb_producto_almacen.costo_promedio, 2)${n_array_order_asc_desc}`
            }
            if (array_tipo_asc_desc === 9) {
            n_array_tipo_asc_desc = `ROUND(tb_producto_almacen.costo_total, 2)${n_array_order_asc_desc}`
            }
            
            t3_uno += ` ORDER BY ${n_array_tipo_asc_desc}`
            } else {
            t3_uno += " ORDER BY tb_products.id_producto DESC"
            }
            }
            
            tabla_final += ` (${t3_uno}) `
            
            
            
            
            
            
            
            
            }
            
            tabla_final += ` ) AS TABLA_FINAL `
            
            if(fn_offset){
            tabla_final += ` LIMIT ${fn_offset}, ${fn_per_page} `
            } else {
            tabla_final += ` LIMIT 20 `
            }
            
            
            var [rows] = await conn_empresa.query(tabla_final)
            es.status(200).json(rows);
            //res.json(rows)
            //res.status(200).json({ message: `ver consulta:  ${tabla_final}` });
             // Libera la conexión después de la consulta
            conn_empresa.release();
            } catch (error) {
                console.error('Error en tuFuncion:', error);

                // Puedes ajustar el mensaje de error según tus necesidades
                return res.status(500).json({ message: `Algo salió mal: productos_dos. Detalles del error 1235:  ${error.message, tabla_final}` });
              
            }
    }

    module.exports = productos_dos;