'use strict'

const RoomController = require('../controllers/room.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

//admin
api.post('/saveRoom/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], RoomController.createRoom);
api.get('/getRoom/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], RoomController.getRoom);
api.put('/updateRoom/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], RoomController.updateRoom);
api.delete('/deleteRoom/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], RoomController.deleteRoom);

//user
api.get('/getRooms', mdAuth.ensureAuth, RoomController.getRooms);
api.put('/reserveRoom/:id', mdAuth.ensureAuth, RoomController.reservation);
api.put('/leaveRoom/:id', mdAuth.ensureAuth, RoomController.leaveRoom);

module.exports = api;