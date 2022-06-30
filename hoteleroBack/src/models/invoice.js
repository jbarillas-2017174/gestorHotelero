'use strict'

const mongoose = require('mongoose');

const historyModel = mongoose.Schema({
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    room: {type: mongoose.Schema.ObjectId, ref: 'Room'},
    subtotal: Number,
    times: Number,
});

module.exports = mongoose.model('History', historyModel);