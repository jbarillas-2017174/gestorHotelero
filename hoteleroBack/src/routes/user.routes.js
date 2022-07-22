'use strict'

const userController = require('../controllers/user.controller');
const express = require('express');
const api = express.Router();
const mdAuth = require('../services/authenticated');

//public
api.get('/test', userController.test);
api.post('/register', userController.register);
api.post('/login', userController.login);

//personal account
api.put('/updateAccount', mdAuth.ensureAuth, userController.updateAccount);
api.delete('/deleteAccount', mdAuth.ensureAuth, userController.deleteAccount);

//admin
api.get('/getUsers', [mdAuth.ensureAuth, mdAuth.isAdmin], userController.getUsers);
api.get('/getUser/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], userController.getUser);
api.post('/createUser', [mdAuth.ensureAuth, mdAuth.isAdmin], userController.createUser);
api.put('/updateUser/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], userController.updateUser);
api.delete('/deleteUser/:id', [mdAuth.ensureAuth, mdAuth.isAdmin], userController.deleteUser);

//hotel admin
api.post('/hotelAdmin', [mdAuth.ensureAuth, mdAuth.isHotelAdmin], userController.createAdminHotel);



module.exports = api;