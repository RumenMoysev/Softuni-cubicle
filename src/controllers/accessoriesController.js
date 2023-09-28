const router = require('express').Router()

const accessoryManager = require('../managers/accessoryManager.js')

router.get('/add-accessory', (req, res) => {
    res.render('accessoryTemps/create')
})

router.post('/add-accessory', async (req, res) => {
    const body = req.body

    const cubeData = {
        imageUrl: body.imageUrl,
        name: body.name,
        description: body.description
    }

    await accessoryManager.create(cubeData)
    res.redirect('/')
})

module.exports = router