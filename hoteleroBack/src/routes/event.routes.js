'use strict'

const EventController = require('../controllers/event.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

//Admin
api.post('/createEvent', [mdAuth.ensureAuth, mdAuth.isAdmin], EventController.createEvent);
api.get('/getEvent/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], EventController.getEvent);
api.put('/updateEvent/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], EventController.updateEvent);
api.delete('/deleteEvent/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], EventController.deleteEvent);

//User
api.get('/getEvents', mdAuth.ensureAuth, EventController.getEvents);



module.exports = api;