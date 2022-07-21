'use strict'

const Service = require('../models/services');
const { validateData } = require("../utils/validate");

exports.createService = async (req, res) => {
    try {
        const params = req.body;
        const data = {
            service: params.service,
        }
        const msg = validateData(data);
        if (msg) return res.status(400).send(msg);
        const already = await Service.findOne({ service: params.service });
        if (already) return res.status(400).send({ message: 'Service already exist' });
        data.description = params.description;
        const service = new Service(data);
        await service.save();
        return res.send({ message: 'Service created' });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}

exports.getServices = async (req, res) => {
    try {
        const services = await Service.find({});
        if (!services) return res.status(404).send({ message: 'Services not found' });
        return res.send({ message: 'Services found: ', services });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}

exports.getService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await Service.findOne({ _id: serviceId });
        if (!service) return res.status(404).send({ message: 'Service not found' });
        return res.send({ message: 'Service found: ', service });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}

exports.updateService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const params = req.body;
        const service = await Service.findOne({ _id: serviceId });
        if (!service) return res.status(404).send({ message: 'Service not found' });
        const already = await Service.findOne({ service: params.service });
        if (already) return res.status(400).send({ message: 'Services already exist' });
        const updated = await Service.findOneAndUpdate({ _id: serviceId }, params, { new: true });
        if (!updated) return res.status(500).send({ message: 'Cannot update this service' });
        return res.send({ message: 'Service updated' });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}

exports.deleteService = async (req, res) => {
    try {
        const serviceId = req.params.id;
        const service = await Service.findOne({ _id: serviceId });
        if (!service) return res.status(404).send({ message: 'Service not found' });
        const deleted = await Service.findOneAndDelete({ _id: serviceId });
        if (!deleted) return res.status(500).send({ message: 'Cannot delete this service' });
        return res.send({ message: 'Service deleted' });
    } catch (err) {
        console.log(err);
        return res.status(500).send(err)
    }
}