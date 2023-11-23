const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// INSERT
async function insertData(req) {

    // data: tiene los datos de cada campo
    const data = req.query;
    const result = await db.query(
        `INSERT INTO coleccion(nombre, marca, tipo, precio) VALUES('${data.nombre}', '${data.marca}', '${data.tipo}', '${data.precio}')`
    );

    // result: guarda los datos a devolver
    return result.affectedRows;

}

// SELECT
async function getData() {

    const rows = await db.query('SELECT * FROM coleccion');
    // Se usa la función helper para evitar recibir de vuelta un array vacío
    const data = helper.emptyOrRows(rows);

    return {
        data,
    };

}

// DELETE
async function deleteData(req) {

    // Data: Almacena el id a borrar
    const data = req.query;
    const result = await db.query(
        `DELETE FROM coleccion WHERE id = ${data.id}`
    );
    
    // affectedRows: Muestra el número de columnas afectadas (en este caso 1)
    return result.affectedRows;

}

module.exports = {
    getData,
    insertData,
    deleteData,
};
