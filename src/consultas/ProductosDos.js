const bd_conexion = require("../conexion/bd_conexion");
 
    
    async function productos_dos(req, res) {
    try {
    // Log the entire request body
console.log('Request Body:', req.body);

// Access specific values
console.log('fn_id_producto:', req.body.fn_id_producto);
console.log('fn_id_sucursal:', req.body.fn_id_sucursal);
// ... (other properties)

// Example usage in your code
var fn_id_producto = req.body.fn_id_producto || '';
var fn_id_sucursal = parseInt(req.body.fn_id_sucursal) || 0;
// ... (other variables)

res.status(200).json(req.body);
    } catch (error) {
    return res.status(500).json({ message: 'Algo salió mal: fn_principal_producto' })
    }
    }

    module.exports = productos_dos;