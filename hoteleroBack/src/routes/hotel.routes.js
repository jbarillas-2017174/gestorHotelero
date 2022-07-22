'use strict'

const HotelController = require('../controllers/hotel.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

//Admin
api.post('/addHotel', [mdAuth.ensureAuth, mdAuth.isHotelAdmin], HotelController.addHotel);
api.get('/getHotel/:id', [mdAuth.ensureAuth, mdAuth.isHotelAdmin], HotelController.getHotel);
api.put('/updateHotel/:id', [mdAuth.ensureAuth, mdAuth.isHotelAdmin], HotelController.updateHotel);
api.delete('/deleteHotel/:id', [mdAuth.ensureAuth, mdAuth.isHotelAdmin], HotelController.deleteHotel);

//User
api.get('/getHotels',mdAuth.ensureAuth,HotelController.getHotels);

module.exports = api;