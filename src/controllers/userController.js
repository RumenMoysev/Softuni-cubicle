const router = require('express').Router()

router.get('/register', (req, res) => {
    res.render('userTemps/register')
})

module.exports = router