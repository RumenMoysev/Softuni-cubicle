const router = require('express').Router()
const homeController = require('./controllers/homeController.js')
const cubesController = require('./controllers/cubesController.js')


router.use(homeController)
router.use('/cubes', cubesController)

module.exports = router 