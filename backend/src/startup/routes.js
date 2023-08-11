const express = require('express');
const cookieParser = require('cookie-parser');
const test = require('../routes/test');
const users = require('../routes/users');
const error = require('../middlewares/error');
const helmet = require('helmet');
const cors = require('cors');
module.exports = function (app){
    app.use(helmet());
    app.use(cors())
    app.use(express.json());
    app.use(cookieParser());
    app.use('/api/test', test);
    app.use('/api/users', users);
    // another routes
    app.use(error);
}