'use strict'

const { validateData, encrypt, searchUser, checkPass } = require('../utils/validate');
const Events = require('../models/events');
const Hotel = require('../models/hotel');
const jwt = require('../services/jwt');

exports.test = async (req, res) => {
    return res.send({ message: 'Events run' });
}

exports.saveEvent = async (req, res) => {
    try{
        const params = req.body
        const data ={
            name: params.name,
            description: params.description,
            //hotel: params.hotel
        }
    const msg = validateData(data);
    if (msg) return res.status(400).send(msg);
    const already = await Events.findOne({name: params.name, hotel: params.hotel});
    if(already) return res.status(400).send({message: 'Event already'});
    if (!msg) {
        let eventSaved = new Events(data);
        await eventSaved.save();
        return res.send({ message: 'Event Saved', eventSaved })
    }
    }catch(err){
        console.log(err);
        return res.status(500).send(err);
    }
}

exports.deleteEvents = async(req, res) =>{
    try {
        const eventsId = req.params.id;
        const events = await Events.findOne({_id: eventsId});
        //if (events.name != req.user.sub) return res.status(403).send({message: 'Mensaje de negacio pendiente'});
        const eventsDeleted = await Events.findOneAndDelete({_id: eventsId});
        if(!eventsDeleted) return res.send({message: 'Event not found or Undefined'});
        return res.send({message: 'Event Deleted', eventsDeleted})

        
    } catch (err) {
        console.log(err);
        return res.status(500).send({message: 'no se como escribir la frase en ingles'})
    }
}