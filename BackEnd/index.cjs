'use strict';

const express = require('express');
const cors = require('cors');
const config = require('./config');
const userRoutes = require('./routes/User.route');
const photoRoute=require('./routes/Photo.route')
const db = require('./db'); 
const app = express();

app.use(express.json());
app.use(cors());

app.use('/api', userRoutes.routes);
app.use('/photos', photoRoute.routes)

app.listen(config.port, () => console.log('App is listening on url http://localhost:' + config.port));
