const router = require('express').Router()
const cubeManager = require('../managers/cubeManager.js')

router.get('/', async (req, res) => {
    const query = req.query
    const searchName = query.search
    const from = query.from
    const to = query.to

    if(searchName || from || to) {
        const cubes = cubeManager.getCubesByQuery(searchName, from, to)
        return res.status(200).render('home', {cubes, searchName, from, to})
    }

    const cubes = await cubeManager.getCubesLean()
    res.status(200).render('home', { cubes })
})

router.get('/about', (req, res) => {
    res.status(200).render('about')
})

module.exports = router