const router = require('express').Router()
const cubeManager = require('../managers/cubeManager.js')
const accessoryManager = require('../managers/accessoryManager.js')

router.get('/create', (req, res) => {
    console.log(req.user)
    res.status(200).render('cubeTemps/create')
})

router.post('/create', async (req, res) => {
    const data = {
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        difficultyLevel: req.body.difficultyLevel,
        description: req.body.description,
        owner: req.user._id
    }

    if(data.imageUrl && data.name && data.difficultyLevel && data.description) {
        await cubeManager.addCube(data)

        res.redirect('/')
    }
})

router.get('/:cubeId/details', async (req, res) => {
    const cubeId = req.params.cubeId
    
    let accessories = await cubeManager.getAccessories(cubeId)
    accessories = accessories.accessories
    const foundCube = await cubeManager.getCubeByIdLean(cubeId)

    res.status(200).render('cubeTemps/details', {foundCube, accessories})
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