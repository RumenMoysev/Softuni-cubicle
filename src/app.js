const express = require('express');

const SERVER_PORT = 5000
const app = express()

const expressConfigurator = require('./config/expressConfigurator.js')
const handlebarsConfigurator = require('./config/handlebarsConfigurator.js')

const homeController = require('./controllers/homeController.js')
const cubesController = require('./controllers/cubesController.js')

expressConfigurator(app)
handlebarsConfigurator(app)

app.use(homeController)
app.use('/cubes', cubesController)

app.listen(SERVER_PORT, () => {console.log(`Server listening on port ${SERVER_PORT}.`)})