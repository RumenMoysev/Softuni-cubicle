const User = require('../models/User.js')
const bcrypt = require('bcrypt')
const jwt = require('../lib/jwt.js')

const { SECRET } = require('../config/config.js')

exports.validateAndCreate = async (userData) => {
    let mainUserData = {
        username: userData.username,
        password: userData.password
    }

    const repeatPassword = userData.repeatPassword

    if (mainUserData.password === repeatPassword) {
        mainUserData.password = await bcrypt.hash(mainUserData.password, 10)

        User.create(mainUserData)
    } else {
        throw new Error('Passwords do not match!')
    }
}

exports.findValidateAndReturnUserToken = async (userData) => {
    const user = await User.findOne({ username: userData.username }).lean()

    if (user) {
        const isValid = await bcrypt.compare(userData.password, user.password)

        if (!isValid) {
            throw new Error('Password or username do not match!')
        }
        
        const token = await jwt.sign(user, SECRET, { expiresIn: '2d' })

        return token
    } else {
        throw new Error('Password or username do not match!')
    }
}