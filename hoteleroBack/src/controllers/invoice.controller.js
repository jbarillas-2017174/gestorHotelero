'use strict'

const History = require("../models/invoice");

exports.createHistory = async (req, res, rooms, users, tot) => {
    try {
        const data = {
            user: users,
            room: rooms,
            subtotal: tot,
            times: 1
        }
        const his = await History.findOne({ user: data.user, room: data.room })
        
        if (his) {
            const times = his.times + 1
            const total = his.subtotal + tot
            await History.findOneAndUpdate({ _id: his.id }, { subtotal: total, times: times }, { new: true })
        } else {
            const history = new History(data);
            await history.save();
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

exports.getHistoryAccount = async (req, res) => {
    try {
        const userId = req.user.sub;
        const history = await History.find({ user: userId })
            .populate({ path: 'user', select: '-password -role -details -_id' })
            .populate({ path: 'room', select: '-available -user -hotel -_id' });
        if (!history) return res.status(404).send({ message: 'There is no any data in your profile' });
        return res.send({ message: 'History: ', history })
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

exports.getHistory = async (req, res) => {
    try {
        const userId = req.params.id;
        const history = await History.find({ user: userId });
        if (!history) return res.status(404).send({ message: 'No data' });
        return res.send({ message: 'History: ', history })
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}

exports.invoice = async (req, res) => {
    try {
        const userId = req.user.sub;
        let total = 0;
        const exist = await History.findOne({ user: userId });
        if (!exist) return res.status(404).send({ message: 'There is no any room rented yet' });
        const history = await History.find({ user: userId }).select('-times')
            .populate({ path: 'user', select: '-password -role -details -_id' })
            .populate({ path: 'room', select: '-available -user -hotel -_id' });

        for (let tot of history) {
            total += tot.subtotal;
        }
        return res.send({ message: 'History: ', history, total })
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}