'use strict'

const Room = require('../models/rooms');
const History = require('./invoice.controller')
const { validateData } = require('../utils/validate');

exports.createRoom = async (req, res) => {
    try {
        const hotelId = req.params.id;
        const params = req.body;
        const data = {
            roomNum: params.roomNum,
            description: params.description,
            available: true,
            price: params.price,
            hotel: hotelId,
        }
        const msg = validateData(data);
        if (msg) return res.status(400).send(msg);
        const already = await Room.findOne({ roomNum: params.roomNum });
        if (already) return res.status(400).send({ message: 'Room already exist' });
        const rooms = new Room(data);
        await rooms.save();
        return res.send({ message: 'Room created' });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}

exports.getRooms = async (req, res) => {
    try {
        const hotelId = req.params.id;
        const room = await Room.find({ hotel: hotelId });
        if (!room) return res.status(404).send({ message: 'Rooms not found' });
        return res.send({ message: 'Rooms found: ', room });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}
exports.getRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        const room = await Room.findOne({ _id: roomId });
        if (!room) return res.status(404).send({ message: 'Room not found' });
        return res.send({ message: 'Room found: ', room });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}

exports.updateRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        const params = req.body;
        const room = await Room.findOne({ _id: roomId });
        if (!room) return res.status(404).send({ message: 'Room not found' });
        const already = await Room.findOne({ roomNum: params.roomNum });
        if (already) return res.status(400).send({ message: 'Room already exist' });
        const updateRoom = await Room.findOneAndUpdate({ _id: roomId }, params, { new: true });
        if (!updateRoom) return res.status(500).send({ message: 'Cannot update room' });
        return res.send({ message: 'Room updated' });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

exports.deleteRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        const room = await Room.findOne({ _id: roomId });
        if (!room) return res.status(404).send({ message: 'Room not found' });
        const deleteRoom = await Room.findOneAndDelete({ _id: roomId });
        if (!deleteRoom) return res.status(500).send({ message: 'Cannot delete room' });
        return res.send({ message: 'Room deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

exports.reservation = async (req, res) => {
    try {
        const roomId = req.params.id;
        const room = await Room.findOne({ _id: roomId });
        if (room.available == false) return res.status(400).send({ message: 'Occupied room' });
        const data = {
            available: false,
            user: req.user.sub,
        }
        if (!room) return res.status(404).send({ message: 'Room not found' });
        const reservation = await Room.findOneAndUpdate({ _id: roomId }, data, { new: true });
        if (!reservation) return res.status(500).send({ message: 'Cannot reserve this room' });
        //update $push:user
        //await Room.findOneAndUpdate({_id: roomId}, {$push: {history: [{user: data.user, total: room.price}]}})
        History.createHistory(req, res, roomId, data.user, room.price);
        return res.send({ message: 'Room reserved', reservation });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

exports.leaveRoom = async (req, res) => {
    try {
        const roomId = req.params.id;
        const room = await Room.findOne({ _id: roomId });
        const data = {
            available: true,
            user: null,
        }
        if (!room) return res.status(404).send({ message: 'Room not found' });
        const reservation = await Room.findOneAndUpdate({ _id: roomId }, data, { new: true });
        if (!reservation) return res.status(500).send({ message: 'Cannot leave this room' });
        return res.send({ message: 'Goodbye' });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

exports.addService = async (req, res) => {
    try {
        const roomId = req.params.id;
        const data = {
            service: req.body.service
        }
        let alreadyService = false;
        const msg = validateData(data);
        if (msg) return res.status(400).send(msg);
        const room = await Room.findOne({ _id: roomId });

        for (let ser of room.services) {
            if (ser.service == data.service) {
                alreadyService = true;
                
            }
        }
        
        if (alreadyService == true) return res.status(400).send({ message: 'Service already added' });
        if (!room) return res.status(404).send({ message: 'Room not found' });
        //await Room.findOneAndUpdate({_id: roomId}, {$push: {history: [{user: data.user, total: room.price}]}})
        const updated = await Room.findOneAndUpdate({ _id: roomId }, { $push: { services: [{ service: data.service }] } }, { new: true });
        if (!updated) return res.status(500).send({ message: 'Cannot add this service' });
        return res.send({ message: 'Service added' });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}