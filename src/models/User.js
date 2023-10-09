const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minLength: 5,
        validate: /^[a-zA-Z0-9]+$/,
        unique:true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;