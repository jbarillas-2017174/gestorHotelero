'use strict'

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const userRoutes = require('../src/routes/user.routes');
const hotelRoutes = require('../src/routes/hotel.routes');
const roomRoutes = require('../src/routes/room.routes');
const invoiceRoutes = require('../src/routes/invoice.routes');
const eventRoutes = require('../src/routes/event.routes');
const serviceRoutes = require('../src/routes/service.routes');


const app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use('/user', userRoutes);
app.use('/hotel', hotelRoutes);
app.use('/room', roomRoutes);
app.use('/invoice', invoiceRoutes);
app.use('/events', eventRoutes);
app.use('/service', serviceRoutes);



module.exports = app;