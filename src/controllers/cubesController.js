const router = require('express').Router()
const cubeManager = require('../managers/cubeManager.js')
const accessoryManager = require('../managers/accessoryManager.js')
const {getOptionsViewData} = require('../utils/getOptionsViewData.js')
const {routeGuard} = require('../middlewares/routeGuard.js')

router.get('/create', routeGuard, (req, res) => {
    res.status(200).render('cubeTemps/create')
})

router.post('/create', routeGuard, async (req, res) => {
    const data = {
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        difficultyLevel: req.body.difficultyLevel,
        description: req.body.description,
        owner: req.user._id
    }

    if(data.imageUrl && data.name && data.difficultyLevel && data.description) {
        try {
            await cubeManager.validateAndAddCube(data)

            res.redirect('/')
        } catch (error) {
            console.log(error.message)
            
            res.redirect('/cubes/create')
        }
    }
})

router.get('/:cubeId/details', async (req, res) => {
    const cubeId = req.params.cubeId
    
    let accessories = await cubeManager.getAccessories(cubeId)
    accessories = accessories.accessories
    const foundCube = await cubeManager.getCubeByIdLean(cubeId)
    const userId = req.user?._id

    const isOwner = foundCube.owner == userId

    res.status(200).render('cubeTemps/details', {foundCube, accessories, isOwner})
})

router.get('/:cubeId/attach', routeGuard, async (req, res) => {
    const cubeId = req.params.cubeId

    const currentCube = await cubeManager.getCubeByIdLean(cubeId)
    const accessories = await accessoryManager.getAccessories(currentCube.accessories)

    const availableAccessories = accessories.length > 0

    res.render('accessoryTemps/attach', {currentCube, availableAccessories, accessories})
})

router.post('/:cubeId/attach', routeGuard, async (req, res) => {
    const cubeId = req.params.cubeId
    const accessoryId = req.body.accessory

    await cubeManager.addAccessory(cubeId, accessoryId)
    res.redirect(`/cubes/${cubeId}/details`)
})

router.get('/:cubeId/edit', routeGuard, async (req, res) => {
    const cubeId = req.params.cubeId

    const currentCube = await cubeManager.getCubeByIdLean(cubeId)
    const optionsViewData = getOptionsViewData(currentCube.difficultyLevel)

    if(req.user._id != currentCube.owner) {
        return res.redirect(`/cubes/${cubeId}/details`)
    }   

    res.render('cubeTemps/edit', {currentCube, optionsViewData})
})

router.post('/:cubeId/edit', routeGuard, async (req, res) => {
    const cubeId = req.params.cubeId

    const cubeData = {
        imageUrl: req.body.imageUrl,
        name: req.body.name,
        difficultyLevel: req.body.difficultyLevel,
        description: req.body.description
    }

    await cubeManager.updateCubeById(cubeId, cubeData)
    res.redirect('/')
})

router.get('/:cubeId/delete', routeGuard, async (req, res) => {
    const cubeId = req.params.cubeId

    const cube = await cubeManager.getCubeByIdLean(cubeId)
    const optionsViewData = getOptionsViewData(cube.difficultyLevel)

    res.render('cubeTemps/delete', {cube, optionsViewData})
})

router.post('/:cubeId/delete', routeGuard, async (req, res) => {
    const cubeId = req.params.cubeId

    await cubeManager.deleteCubeById(cubeId)

    res.redirect('/')
})

module.exports = router