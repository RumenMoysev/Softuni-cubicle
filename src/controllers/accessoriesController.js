const router = require('express').Router()

router.get('/add-accessory', (req, res) => {
    res.render('accessoryTemps/attach')
})

module.exports = router