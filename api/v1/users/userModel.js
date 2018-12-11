const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
});

module.exports = mongoose.model('users', userSchema);
const User = module.exports;

module.exports.getAllUsers = (callback) => {
    User.find({}, callback);
};

module.exports.createNewUser = (user, callback) => {
    const newUser = new User(user);
    newUser.save(callback);
};

module.exports.checkIfUserExists = (username, callback) => {
    User.findOne({
        username,
    }, callback);
};