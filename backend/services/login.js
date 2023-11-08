const db = require('./db')
const helper = require('../helper')
const config = require('../config')

async function getUserData(user, password) {
    const rows = await db.query(`
    SELECT * FROM usuarios
    WHERE login = ? AND password = ?
`, [user, password]);


    const data = helper.emptyOrRows(rows[0])

    return {
        data
    }
}

module.exports = {
    getUserData
}