const express = require('express');
const cookieParser = require('cookie-parser');
const test = require('../routes/test');
const customers = require('../routes/customers');
const admins = require('../routes/admins/admins');
const permissions = require('../routes/admins/permissions');
const roles = require('../routes/admins/roles');
const categories = require('../routes/categories');
const oauth = require('../routes/oauth');
const error = require('../middlewares/error');
const helmet = require('helmet');
const cors = require('cors');
const corsConfig = require("../../config/cors-config");

module.exports = function (app) {
	app.use(helmet());
	app.use(cors(corsConfig));
	app.use(express.json());
	app.use(cookieParser());
	app.use('/api/test', test);
	app.use('/api/customers', customers);
	app.use('/api/oauth', oauth);
    app.use('/api/permissions', permissions);
    app.use('/api/roles', roles);
    app.use('/api/admins', admins);
	app.use('/api/categories', categories);
	// other routes
	app.use(error);
};