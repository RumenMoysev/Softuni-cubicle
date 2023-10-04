const User = require('../models/User.js')
const bcrypt = require('bcrypt')

exports.validateAndCreate = async (userData) => {
    let mainUserData = {
        username: userData.username,
        password: userData.password
    }

    const repeatPassword = userData.repeatPassword

    if(mainUserData.password === repeatPassword) {
        mainUserData.password = await bcrypt.hash(mainUserData.password, 10)

        User.create(mainUserData)
    } else {
        throw new Error('Passwords do not match!')
    }
}