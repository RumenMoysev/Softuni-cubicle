const router = require('express').Router()
const userManager = require('../managers/userManager.js')

router.get('/register', (req, res) => {
    res.render('userTemps/register')
});

router.post('/register', async (req, res) => {
    const body = {
        username: req.body.username,
        password: req.body.password,
        repeatPassword: req.body.repeatPassword,
    }

    try {
        await userManager.validateAndCreate(body)

        res.redirect('/users/login')
    } catch (error) {
        res.redirect('/users/register')
    }
})

router.get('/login', (req, res) => {
    res.render('userTemps/login')
})

module.exports = router