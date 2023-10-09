const Cube = require('../models/Cube.js')

const regex = /^[a-zA-Z0-9\s]+$/

exports.getCubes = () => Cube.find()
exports.getCubesLean = () => Cube.find().lean()

exports.getCubesByQueryLean = async (queryObj) => {
    let startingLevel = 0
    let maxLevel = 7
    if(queryObj.from) {
        startingLevel = Number(queryObj.from)
    }
    if(queryObj.to) {
        maxLevel = Number(queryObj.to)
    }

    let foundCubes = await Cube.find({$and: [{difficultyLevel: {$gte: startingLevel}}, {difficultyLevel: {$lte: maxLevel}}]}).lean()

    if(queryObj.searchName) {
        foundCubes = foundCubes.filter((x) => x.name.toLowerCase().includes(queryObj.searchName.toLowerCase()))
    }

    return foundCubes
}

exports.validateAndAddCube = (cube) => {

    if (cube.name.length < 5 || !regex.test(cube.name)) {
        throw new Error('Cube name should consist of English letters, digits and spaces, and more than 5 ch. long')
    }
    if(cube.description.length < 20 || !regex.test(cube.description)) {
        throw new Error('Cube description should consist of English letters, digits and spaces, and more than 20 ch. long')
    }
    if(cube.imageUrl.startsWith('http://') || cube.imageUrl.startsWith('https://')) {
    } else {
        throw new Error('You need to provide a correct URL')
    }
    if(!cube.difficultyLevel) {
        throw new Error('Please provide a difficultyLevel')
    }

    return Cube.create(cube)
}
exports.addAccessory = (cubeId, accessoryId) => Cube.findByIdAndUpdate(cubeId, {$push: {accessories: accessoryId}})
exports.getAccessories = (cubeId) => Cube.findById(cubeId).populate('accessories').lean()

exports.getCubeById = (id) => Cube.findById(id)
exports.getCubeByIdLean = (id) => Cube.findById(id).lean()

exports.validateAndUpdateCubeById = (id, data) => {
    if(!id) {
        throw new Error('Please provide a cubeId')
    };
    if(data.name.length < 5 || !regex.test(data.name)) {
        throw new Error('Cube name should consist of English letters, digits and spaces, and more than 5 ch. long')
    }
    if (data.description.length < 20 || !regex.test(data.description)) {
        throw new Error('Cube description should consist of English letters, digits and spaces, and more than 20 ch. long')
    }
    if (data.imageUrl.startsWith('http://') || data.imageUrl.startsWith('https://')) {
    } else {
        throw new Error('You need to provide a correct URL')
    }
    if (!data.difficultyLevel) {
        throw new Error('Please provide a difficultyLevel')
    }
    
    return Cube.findByIdAndUpdate(id, data)
}
exports.deleteCubeById = (id) => Cube.findByIdAndDelete(id)