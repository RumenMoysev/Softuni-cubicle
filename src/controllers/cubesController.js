const router = require('express').Router()
const cubeManager = require('../managers/cubeManager.js')

router.get('/create', (req, res) => {
    res.status(200).render('create')
})

router.post('/create', async (req, res) => {
    const data = {
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        difficultyLevel: req.body.difficultyLevel,
        description: req.body.description,
        accessories: [],
    }

    if(data.imageUrl && data.name && data.difficultyLevel && data.description) {
        await cubeManager.addCube(data)

        res.redirect('/')
    }
})

router.get('/:cubeId/details', async (req, res) => {
    const cubeId = req.params.cubeId
    const foundCube = await cubeManager.getCubeByIdLean(cubeId)
    
    res.status(200).render('details', {foundCube})
})

module.exports = router