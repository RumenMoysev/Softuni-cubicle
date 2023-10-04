const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const {auth} = require('../middlewares/auth.js')

function expressConfigurator(app) {
    app.use(express.static(path.resolve(__dirname, '../static')))
    app.use(express.urlencoded({extended: true}))
    app.use(cookieParser())
    app.use(auth)
}

module.exports = expressConfigurator