const mongoose = require('mongoose')

const accessorySchema = new mongoose.Schema({
    imageUrl: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    }
});

const Accessory = mongoose.model('Accessory', accessorySchema)

module.exports = Accessory