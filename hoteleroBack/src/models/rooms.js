'use strict'

const mongoose = require('mongoose');

const roomsModel = mongoose.Schema({
    roomNum: Number,
    description: String,
    available: Boolean,
    price: Number,
    hotel: { type: mongoose.Schema.ObjectId, ref: 'Hotel' },
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    services: [
        {
            service: { type: mongoose.Schema.ObjectId, ref: 'Service' }
        }
    ]
});

module.exports = mongoose.model('Room', roomsModel);