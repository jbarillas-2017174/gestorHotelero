'use strict'

const mongoose = require('mongoose');

const eventModel = mongoose.Schema({
    name: String,
    description: String,
    hotel: { type: mongoose.Schema.ObjectId, ref: 'Hotel' }
});

module.exports = mongoose.model('Event', eventModel);