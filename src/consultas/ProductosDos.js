const bd_conexion = require("../conexion/bd_conexion");
 
    
    async function productos_dos(req, res) {
    try {
res.status(200).json('Request Body');
    } catch (error) {
    return res.status(500).json({ message: 'Algo salió mal: fn_principal_producto' })
    }
    }

    module.exports = productos_dos;