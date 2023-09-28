const Accessory = require('../models/Accessory.js');

exports.create = (accessoryData) => Accessory.create(accessoryData);
exports.getAccessories = (cubeAccessories) => Accessory.find({_id: {$nin: cubeAccessories}}).lean()