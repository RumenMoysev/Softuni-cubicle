const router = require('express').Router()
const cubeManager = require('../managers/cubeManager.js')

router.get('/create', (req, res) => {
    res.status(200).render('create')
})

router.post('/create', (req, res) => {
    const data = {
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        difficultyLevel: req.body.difficultyLevel,
        description: req.body.description
    }

    if(data.imageUrl && data.name && data.difficultyLevel && data.description) {
        addCube(data)

        res.redirect('/')
    }
})

router.get('/:cubeId/details', (req, res) => {
    const cubeId = req.params.cubeId
    const foundCube = cubeManager.getCubeById(cubeId)
    res.status(200).render('details', {foundCube})
})

module.exports = router