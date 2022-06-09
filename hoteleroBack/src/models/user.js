'use strict'

const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    name: String,
    username: String,
    email: String,
    password: String,
    role: String,
    details: String,
});

module.exports = mongoose.model('User', userModel);