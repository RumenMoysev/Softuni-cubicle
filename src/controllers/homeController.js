const router = require('express').Router()
const { getCubes } = require('../managers/cubeManager.js')

router.get('/', (req, res) => {
    const cubes = getCubes()
    res.status(200).render('home', { cubes })
})

router.get('/about', (req, res) => {
    res.status(200).render('about')
})

module.exports = router