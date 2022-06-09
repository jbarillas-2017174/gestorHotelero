'use strict'

const mongoose = require('mongoose');

const roomsModel = mongoose.Schema({
    roomNum: Number,
    description: String,
    available: Boolean,
    price: Number,
    hotel: {type: mongoose.Schema.ObjectId, ref: 'Hotel'},
    history: [{ type: mongoose.Schema.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Room', roomsModel);