'use strict'

const RoomController = require('../controllers/room.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

//admin
api.post('/saveRoom/:id', [mdAuth.ensureAuth, mdAuth.isHotelAdmin], RoomController.createRoom);
api.get('/getRoom/:id', [mdAuth.ensureAuth, mdAuth.isHotelAdmin], RoomController.getRoom);
api.put('/updateRoom/:id', [mdAuth.ensureAuth, mdAuth.isHotelAdmin], RoomController.updateRoom);
api.delete('/deleteRoom/:id', [mdAuth.ensureAuth, mdAuth.isHotelAdmin], RoomController.deleteRoom);
api.post('/addService/:id', [mdAuth.ensureAuth, mdAuth.isHotelAdmin], RoomController.addService);

//user
api.get('/getRooms/:id', mdAuth.ensureAuth, RoomController.getRooms);
api.put('/reserveRoom/:id', [mdAuth.ensureAuth, mdAuth.isClient], RoomController.reservation);
api.put('/leaveRoom/:id', [mdAuth.ensureAuth, mdAuth.isClient], RoomController.leaveRoom);

module.exports = api;