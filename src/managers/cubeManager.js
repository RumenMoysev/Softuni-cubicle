const Cube = require('../models/Cube.js')

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

exports.addCube = (cube) => Cube.create(cube)
exports.addAccessory = (cubeId, accessoryId) => Cube.findByIdAndUpdate(cubeId, {$push: {accessories: accessoryId}})

exports.getCubeById = (id) => Cube.findById(id)
exports.getCubeByIdLean = (id) => Cube.findById(id).lean()