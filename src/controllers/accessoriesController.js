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

    if(cubeData) {
        try {
            await accessoryManager.validateAndCreate(cubeData)

            res.redirect('/')
        } catch (error) {
            const errorMsg = error.message
            res.status(400).render('accessoryTemps/create', {errorMsg})
        }
    } else {
        res.redirect('/accessories/add-accessory')
    }
})

module.exports = router