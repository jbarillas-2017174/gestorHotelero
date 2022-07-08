'use strict'

const InvoiceController = require('../controllers/invoice.controller')
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

//Account
api.get('/accountHistory', mdAuth.ensureAuth, InvoiceController.getHistoryAccount);
api.get('/invoice', mdAuth.ensureAuth, InvoiceController.invoice);

//Admin
api.get('/getHistory/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], InvoiceController.getHistory);

module.exports = api;