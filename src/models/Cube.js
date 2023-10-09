const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    imageUrl: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
        minLength: 5,
        validate: /^[a-zA-Z0-9\s]+$/
    },
    difficultyLevel: {
        required: true,
        type: Number,
    },
    description: {
        required: true,
        type: String,
        minLength: 20,
        validate: /^[a-zA-Z0-9\s]+$/
    },
    accessories: [{
        type: mongoose.Types.ObjectId,
        ref: 'Accessory'
    }],
    owner:{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;