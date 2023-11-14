const express = require('express')
const cors = require('cors')
const login = require('./services/login')
const items = require('./services/items');

// Puerto de la API
const port = 3030

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
app.post('/addItem', async function (req, res, next) {  // Changed to POST
    try {
        const result = await items.insertData(req);
        const newProduct = await items.getProductById(result); // Assuming there's a function to get the newly added product

        res.json(newProduct);
    } catch (err) {
        console.error(`Error al intentar `, err.message);
        next(err);
    }
});

app.get('/getData', async function (req, res, next) {
    try {
        res.json(await items.getData(req, res));
    } catch (err) {
        console.error(`Error al recibir los datos `, err.message);
        next(err);
    }
});
app.delete('/deleteData', async function (req, res, next) {
    try {
        res.json(await items.deleteData(req, res));
    } catch (err) {
        console.error(`Error while deleting items `, err.message);
        next(err);
    }
});


// Inización de la API
app.listen(port)
console.log('API escuchando en el puerto ' + port)