'use strict'

const mongoose = require('mongoose');

const invoiceModel = mongoose.Schema({
    user: {type: mongoose.Schema.ObjectId, ref: 'User'},
    room: {type: mongoose.Schema.ObjectId, ref: 'Room'},
});

module.exports = mongoose.model('Invoice', invoiceModel);