const router = require('express').Router()

router.get('/add-accessory', (req, res) => {
    res.render('accessoryTemps/create')
})

module.exports = router