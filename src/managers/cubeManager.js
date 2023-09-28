const uniqId = require('uniqid')
const Cube = require('../models/Cube.js')

const cubes = [
    {
        imageUrl: 'https://ae01.alicdn.com/kf/HTB1CSddXRxRMKJjy0Fdq6yifFXa6/Gan-356-Air-SM-3x3-Black-Magic-cube-GAN-Air-SM-Magnetic-3x3x3-Speed-cube-gans.jpg',
        name: 'Gan356 Air SM',
        difficultyLevel: 3,
        description: 'a Rubic cube',
        id: uniqId()
    },
    {
        imageUrl: 'https://www.awesomeinventions.com/wp-content/uploads/2016/10/Simple-Rubiks-Cube.jpg',
        name: 'Dragancho',
        difficultyLevel: 1,
        description: 'a Rubics nigga cube',
        id: uniqId()
    },
    {
        imageUrl: 'https://images.interestingengineering.com/images/JULY/Erno_Rubik_Magic_Cube.jpg',
        name: 'Rumen',
        difficultyLevel: 6,
        description: 'the hardest one',
        id: uniqId()
    }
]

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

exports.getCubeById = (id) => Cube.findById(id)
exports.getCubeByIdLean = (id) => Cube.findById(id).lean()