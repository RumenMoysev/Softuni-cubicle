const jwt = require('../lib/jwt.js')
const { SECRET } = require('../config/config.js')

exports.auth = async (req, res, next) => {
    const token = req.cookies['auth']

    if(token) {

        try {
            const user = await jwt.verify(token, SECRET)

            req.user = user
            res.locals.isLoggedIn = true
            next()
        } catch (error) {
            res.clearCookie('auth')
            res.locals.isLoggedIn = false

            res.redirect('/users/login')
        }
    } else {
        next()
    }
}