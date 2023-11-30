const db = require('./db');
const helper = require('../helper');
const config = require('../config');

// INSERT
async function insertUser(req) {

    // data: tiene los datos de cada campo
    const data = req.query;
    const result = await db.query(
        `INSERT INTO usuarios(nombre, login, password, rol) VALUES('${data.nombre}', '${data.login}', '${data.password}', '${data.rol}')`
    );

    // result: guarda los datos a devolver
    return result.affectedRows;

}

// SELECT
async function getUsers() {

    const rows = await db.query('SELECT * FROM usuarios');
    // Se usa la función helper para evitar recibir de vuelta un array vacío
    const data = helper.emptyOrRows(rows);

    return {
        data,
    };

}

// DELETE
async function deleteUser(req) {

    // Data: Almacena el id a borrar
    const data = req.query;
    const result = await db.query(
        `DELETE FROM usuarios WHERE id = ${data.id}`
    );
    
    // affectedRows: Muestra el número de columnas afectadas (en este caso 1)
    return result.affectedRows;

}

module.exports = {
    getUsers,
    insertUser,
    deleteUser,
};
