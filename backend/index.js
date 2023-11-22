//importo el express y el cors
const express = require('express')
const cors = require('cors')
//importo el fichero login.js que está en la carpeta services
const login = require('./services/login')
const item = require('./services/items')

//Definimos el puerto por que va a escuchar nuestra API las peticiones
const port = 3030 // PUERTO API

const app = express()
app.use(express.json())
app.use(
    express.urlencoded({
        extended: true
    })
)
app.use(cors())

//Creación del endpoint /login
//llama al fichero login.js usando el método getUserData pasándole
//el login (user) y la contraseña (password)
app.get('/login', async function (req, res, next) {
    console.log(req.query)
    try {
        res.json(await login.getUserData(req.query.user, req.query.password))
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
})

// esto son los endnpointd+s
app.get('/addItem', async function (req, res, next) {
    console.log(req)
    try {
        res.json(await item.insertData(req))
    } catch (err) {
        console.error(`Error while inserting items `, err.message);
        next(err);
    }
})

app.get('/getData', async function (req, res, next) {
    try {
        res.json(await item.getData(req, res));
    } catch (err) {
        console.error(`Error while getting data `, err.message);
        next(err);
    }
});

app.get('/deleteItem', async function (req, res, next) {
    try {
        res.json(await item.deleteData(req, res))
    } catch (err) {
        console.error(`Error while deleting items `, err.message);
        next(err);
    }
})

//Iniciamos la API
app.listen(port)
console.log('API escuchando en el puerto ' + port)