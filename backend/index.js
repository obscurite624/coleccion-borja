const express = require('express')
const cors = require('cors')
const login = require('./services/login')
const item = require('./services/items')


const port = 3030 // puerto de la api

const app = express()
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors())

// Endpoint /login
// Realiza la función del Login con el usuario y contraseña introducidos
// Usa el método de 'login.js' getUserData
app.get('/login', async function (req, res, next) {

    console.log(req.query)

    try {
        res.json(await login.getUserData(req.query.user, req.query.password))
    } catch (err) {
        console.error(`Error al obtener los datos `, err.message);
        next(err);
    }

})

// Endpoint /addItem
app.get('/addItem', async function (req, res, next) {

    console.log(req)

    try {
        res.json(await item.insertData(req))
    } catch (err) {
        console.error(`Error al insertar items `, err.message);
        next(err);
    }

})

// Endpoint /getData
app.get('/getData', async function (req, res, next) {

    try {
        res.json(await item.getData(req, res));
    } catch (err) {
        console.error(`Error al obtener los datos `, err.message);
        next(err);
    }

});

// Endpoint /deleteItem
app.get('/deleteItem', async function (req, res, next) {

    try {
        res.json(await item.deleteData(req, res))
    } catch (err) {
        console.error(`Error al borrar items `, err.message);
        next(err);
    }

})

//Iniciamos la API
app.listen(port, () => {
    console.log(`La API está escuchando en el puerto ${port}`);
});
