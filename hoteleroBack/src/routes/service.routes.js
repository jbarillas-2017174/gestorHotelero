'use strict'

const ServiceController = require('../controllers/service.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

//adminHotel
api.post('/createService', [mdAuth.ensureAuth, mdAuth.isAdmin], ServiceController.createService);
api.get('/getService/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], ServiceController.getService);
api.put('/updateService/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], ServiceController.updateService);
api.delete('/deleteService/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], ServiceController.deleteService);

//user
api.get('/getServices', mdAuth.ensureAuth, ServiceController.getServices);

module.exports = api;