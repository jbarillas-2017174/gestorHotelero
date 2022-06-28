'use strict'

const Hotel = require('../models/hotel');
const { validateData, encrypt, searchUser, checkPass } = require('../utils/validate');

exports.addHotel = async (req, res)=>{
    try {
      const params = req.body;
      const data = {
        name: params.name,
        address: params.address,
        description: params.description,
      } 
      const msg = validateData(data);
      if(msg) return res.status(400).send(msg);
      const alreadyName = await Hotel.findOne({name: params.name});
      if(alreadyName) return res.status(400).send({message: 'Name in use'});
      const hotel = new Hotel(data);
      await hotel.save();
      return res.send({message: 'Hotel saved'});
    } catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
}

exports.getHotels = async (req, res)=>{
    try {
        const hotels = await Hotel.find({});
        if(!hotels) return res.status(404).send({message: 'Hotels not found'});
        return res.send({message: 'Hotels found: ', hotels});
    } catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
}

exports.getHotel = async (req, res)=>{
    try {
        const hotelId = req.params.id;
        const hotel = await Hotel.findOne({_id: hotelId});
        if(!hotel) return res.status(404).send({message: 'Hotel not found'});
        return res.send({message: 'Hotel found: ', hotel});
    } catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
}

exports.updateHotel = async (req, res)=>{
    try {
        const hotelId = req.params.id;
        const params = req.body;
        const already = await Hotel.findOne({name: params.name});
        if(already) return res.status(400).send({message: 'Name in use'});
        const updateHotel = await Hotel.findOneAndUpdate({_id: hotelId}, params, {new: true});
        if(!updateHotel) return res.status(500).send({message: 'Cannot update this hotel'});
        return res.send({message: 'Hotel updated'});
    } catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
}

exports.deleteHotel = async (req, res) =>{
    try {
        const hotelId = req.params.id;
        const already = await Hotel.findOne({_id: hotelId});
        if(!already) return res.status(404).send({message: 'Hotel not found'});
        const deleteHotel = await Hotel.findOneAndDelete({_id: hotelId});
        if(!deleteHotel) return res.status(500).send({message: 'Cannot delete this hotel'});
        return res.send({message: 'Hotel deleted'});
    } catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
}
