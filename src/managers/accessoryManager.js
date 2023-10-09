const Accessory = require('../models/Accessory.js');

const regex = /^[a-zA-Z0-9\s]+$/

exports.validateAndCreate = (accessoryData) => {

    if (accessoryData.name.length < 5 || !regex.test(accessoryData.name)) {
        throw new Error('Accessory name should consist of English letters, digits and spaces, and more than 5 ch. long')
    }
    if (accessoryData.description.length < 20 || !regex.test(accessoryData.description)) {
        throw new Error('Accessory description should consist of English letters, digits and spaces, and more than 20 ch. long')
    }
    if (accessoryData.imageUrl.startsWith('http://') || accessoryData.imageUrl.startsWith('https://')) {
    } else {
        throw new Error('You need to provide a correct URL')
    }
    
    return Accessory.create(accessoryData)
};
exports.getAccessories = (cubeAccessories) => Accessory.find({_id: {$nin: cubeAccessories}}).lean()