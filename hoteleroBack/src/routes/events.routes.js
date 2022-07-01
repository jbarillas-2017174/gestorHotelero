'use strict'

const eventsController = require('../controllers/events.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');


api.get('/test', eventsController.test);
api.post('/saveEvent', eventsController.saveEvent);
api.delete('/deleteEvent/:id', eventsController.deleteEvents);

module.exports = api;