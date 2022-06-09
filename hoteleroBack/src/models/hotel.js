'use strict'

const mongoose = require('mongoose');

const hotelModel = mongoose.Schema({
    name: String,
    description: String,
    address: String,
});

module.exports = mongoose.model('Hotel', hotelModel);