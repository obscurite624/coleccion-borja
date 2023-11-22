const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// Función con la consulta para insertar datos en la base de datos: INSERT
async function insertData(req, res) {
    // data tiene los datos que vamos a insertar en la base de datos. Los coge de req.query
    // Para acceder a cada uno de los datos: data.nombre, data.precio, ...
    const data = req.query;
    const result = await db.query(
        `INSERT INTO coleccion(nombre, marca, tipo, precio) VALUES('${data.nombre}', '${data.marca}', '${data.tipo}', '${data.precio}')`
    );
    /* En la variable result se almacena lo que devuelve la consulta.
    Si accedemos a affectedRows nos da el número de filas de la base de
    datos que ha sido modificado o añadido.
    Si ese número es mayor que cero es que ha habido inserción en la base de datos. */
    return result.affectedRows;
}

// FUNCION CON CONSULTA DE OBTENER DATOS DE LA BD SELECT ^FROM COLLECTION
async function getData(req, res) {
    // ROWS ALMACENA LOS DATOS OBTENIDOS EN LA CONSULTA SELECT
    const rows = await db.query('SELECT * FROM coleccion');
    // LOS DATOS OBTENIDOS DE LA CONSULTA SELECT SE PASAN POR LA FUNCION HELPER PA VE SI NO HAY DATOS DEVUELTOS, DEVUELVA ARRAY VACIO
    const data = helper.emptyOrRows(rows);

    // DEVOLVEMOS EL RESULTADO DEL SELECT, QUE SE ALMACENÓ EN LA VARIABLE DATA
    return {
        data,
    };
}

// Función con la consulta para borrar datos de la base de datos: DELETE
async function deleteData(req, res) {
    // En data almaceno los datos que me pasan para poder realizar el delete, me pasarán el id.
    const data = req.query;
    const result = await db.query(
        `DELETE FROM coleccion WHERE id = ${data.id}`
    );
    /* En la variable result se almacena lo que devuelve la consulta.
    Si accedemos a affectedRows nos da el número de filas de la base de
    datos que ha sido borrado.
    Si ese número es mayor que cero es que ha habido borrado en la base de datos. */
    return result.affectedRows;
}

module.exports = {
    getData,
    insertData,
    deleteData,
};
