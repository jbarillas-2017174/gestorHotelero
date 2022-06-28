'use strict'

const History = require("../models/history");

exports.createHistory = async (req, res, rooms, users, tot) => {
    try {
        const data = {
            user: users,
            room: rooms,
            total: tot,
            times: 1
        }
        const his = await History.findOne({ user: data.user, room: data.room })

        if (his) {
            const times = his.times + 1
            const total = his.total + tot
            await History.findOneAndUpdate({ _id: his.id }, { total: total, times: times }, { new: true })
        } else {
            const history = new History(data);
            await history.save();
        }

    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
}