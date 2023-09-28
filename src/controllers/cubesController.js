const router = require('express').Router()
const cubeManager = require('../managers/cubeManager.js')
const accessoryManager = require('../managers/accessoryManager.js')

router.get('/create', (req, res) => {
    res.status(200).render('create')
})

router.post('/create', async (req, res) => {
    const data = {
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        difficultyLevel: req.body.difficultyLevel,
        description: req.body.description,
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

router.get('/:cubeId/attach', async (req, res) => {
    const cubeId = req.params.cubeId

    const currentCube = await cubeManager.getCubeByIdLean(cubeId)
    const accessories = await accessoryManager.getAccessories(currentCube.accessories)

    const availableAccessories = accessories.length > 0

    res.render('accessoryTemps/attach', {currentCube, availableAccessories, accessories})
})

router.post('/:cubeId/attach', async (req, res) => {
    const cubeId = req.params.cubeId
    const accessoryId = req.body.accessory

    await cubeManager.addAccessory(cubeId, accessoryId)
    res.redirect(`/cubes/${cubeId}/details`)
})

module.exports = router