'use strict'

const mongoose = require('mongoose');

const serviceModel = mongoose.Schema({
    service: String,
    description: String,
});

module.exports = mongoose.model('Service', serviceModel);