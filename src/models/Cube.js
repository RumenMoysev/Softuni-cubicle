const mongoose = require('mongoose');

const cubeSchema = new mongoose.Schema({
    imageUrl: {
        required: true,
        type: String,
    },
    name: {
        required: true,
        type: String,
    },
    difficultyLevel: {
        required: true,
        type: Number,
    },
    description: {
        required: true,
        type: String,
    },
    accessories: {
        type: mongoose.Types.ObjectId,
        // ref:
    },
})

const Cube = mongoose.model('Cube', cubeSchema);

module.exports = Cube;