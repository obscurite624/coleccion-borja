const db = require('./db')
const helper = require('../helper')
const config = require('../config')

async function insertData(req, res) {
    const data = req.body;

    // Check for duplicate entry
    const existingData = await db.query(
        `SELECT * FROM coleccion WHERE nombre = ? AND marca = ? AND tipo = ? AND precio = ?`,
        [data.nombre, data.marca, data.tipo, data.precio]
    );

    if (existingData.length > 0) {
        // Duplicate entry found
        return res.status(400).json({ error: 'Duplicate entry' });
    }

    // No duplicate entry, proceed with insertion
    const result = await db.query(
        `INSERT INTO coleccion(nombre, marca, tipo, precio) VALUES (?, ?, ?, ?)`,
        [data.nombre, data.marca, data.tipo, data.precio]
    );

    const newProductId = result.insertId;

    // Assuming there's a function to get the newly added product
    const newProduct = await getProductById(newProductId);

    return res.json(newProduct);
}




// FUNCION CON CONSULTA DE OBTENER DATOS DE LA BD SELECT ^FROM COLLECTION
async function getData(req, res) {
    // ROWS ALMACENA LOS DATOS OBTENIDOS EN LA CONSULTA SELECT
    const rows = await db.query(
        `SELECT * FROM coleccion`
    )
    // LOS DATOS OBTENIDOS DE LA CONSULTA SELECT SE PASAN POR LA FUNCION HELPER PA VE SI NO HAY DATOS DEVUELTOS, DEVUELVA ARRAY VACIO
    const data = helper.emptyOrRows(rows)

    // DEVOLVEMOS EL RESULT DEL SELECT, QUE SE ALMACENO ENLA VARIABLE DATA
    return {
        data
    }
}


//Función con la consulta para borrar datos de la base de datos: DELETE
async function deleteData(req, res) {
    // En data almaceno los datos que me pasan para poder realizar el delete, me pasarán el id.
    const data = req.body;
    const result = await db.query(
        `DELETE FROM coleccion WHERE id = ${data.id}`
    );
    /* En la variable result se almacena lo que devuelve la consulta.
    Si accedemos a affectedRows nos da el número de filas de la base de datos que ha sido borrado.
    Si ese número es mayor que cero es que ha habido borrado en la base de datos. */
    return result.affectedRows;
}




module.exports = {
    getData,
    insertData,
    deleteData
}