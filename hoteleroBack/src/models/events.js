'use strict'

const mongoose = require('mongoose');

const eventsModel = mongoose.Schema({
    name: String,
    description: String,
    hotel: {type: mongoose.Schema.ObjectId, ref: 'Hotel'},
});

module.exports = mongoose.model('Events', eventsModel);
