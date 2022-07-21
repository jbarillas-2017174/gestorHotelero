'use strict'

const Event = require('../models/events');
const { validateData } = require('../utils/validate');

exports.createEvent = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            name: params.name,
            description: params.description,
            hotel: params.hotel,
        }
        const msg = validateData(data);
        if (msg) return res.status(400).send(msg);
        const already = await Event.findOne({ name: params.name });
        if (already) return res.status(400).send({ message: 'Event already exist' });
        const events = new Event(data);
        await events.save();
        return res.send({ message: 'Event saved' });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}

exports.getEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findOne({ _id: eventId });
        if (!event) return res.status(404).send({ message: 'Event not found' });
        return res.send({ message: 'Event found: ', event });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}

exports.getEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        if (!events) return res.status(404).send({ message: 'Events not found' });
        return res.send({ message: 'Events found: ', events });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}

exports.updateEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const params = req.body;
        const already = await Event.findOne({ name: params.name });
        if (already) return res.status(400).send({ message: 'Event already exist' });
        const event = await Event.findOne({ _id: eventId });
        if (!event) return res.status(404).send({ message: 'Event not found' });
        const updated = await Event.findOneAndUpdate({ _id: eventId }, params, { new: true });
        if (!updated) return res.status(500).send({ message: 'Cannot update this event' });
        return res.send({ message: 'Event updated' });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}

exports.deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        const event = await Event.findOne({ _id: eventId });
        if (!event) return res.status(404).send({ message: 'Event not found' });
        const deleted = await Event.findOneAndDelete({ _id: eventId });
        if (!deleted) return res.status(500).send({ message: 'Cannot delete this event' });
        return res.send({ message: 'Event deleted' })
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}