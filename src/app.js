const express = require('express');

const SERVER_PORT = 5000
const app = express()

const expressConfigurator = require('./config/expressConfigurator.js')
const handlebarsConfigurator = require('./config/handlebarsConfigurator.js')

expressConfigurator(app)
handlebarsConfigurator(app)

app.get('/', (req,res) => {
    res.render('index')
})

app.listen(SERVER_PORT, () => {console.log(`Server listening on port ${SERVER_PORT}.`)})