const express = require('express');
const cookieParser = require('cookie-parser');
const test = require('../routes/test');
const customers = require('../routes/customers');
const error = require('../middlewares/error');
const helmet = require('helmet');
const cors = require('cors');

const corsConfig = require("../../config/cors-config");
module.exports = function (app) {
    app.use(helmet());
    app.use(cors(corsConfig))
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api/test', test);
    app.use('/api/customers', customer);
    // another routes
    app.use(error);
}