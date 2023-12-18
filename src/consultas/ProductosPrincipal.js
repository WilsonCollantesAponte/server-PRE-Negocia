import { fn_conexion } from ("../conexion/NewConexion.js");

export function explode_filtros_globales_v2(n_campo, n_tipo_campo) {
var filtro_campo = ''

if (n_tipo_campo) {
var i = 1
var or = ''

n_tipo_campo.split(',').forEach(id_valor => {
var id_campo = parseInt(id_valor.trim())

if (i !== 1) {
or = ' OR '
}

filtro_campo += `${or}(${n_campo} = '${id_campo}')`
i++
})
}

return filtro_campo
}


async function fn_principal_producto(req, res) {
try {
    res.status(200).json('holaaa');
} catch (error) {
return res.status(500).json({ 
    message: 'Algo salió mal: fn_principal_producto',
    datos: tabla_final,
 })
}
}

 
module.exports = fn_principal_producto;