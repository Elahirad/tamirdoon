const express = require('express');
const bcrypt = require('bcrypt');
const password = require('secure-random-password');
const _ = require('lodash');
const {OAuth2Client} = require('google-auth-library');
const {OAuthVerifyValidate} = require('../models/oauth');
const {Customer} = require('../models/customer');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const router = express.Router();

router.post('/verify', async (req, res) => {
	const {error} = OAuthVerifyValidate(req.body);
	if (error) return res.status(400).send(error.details[0].message);

    const ticket = await client.verifyIdToken({
        idToken: req.body.credential,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const {
        given_name: firstName,
        family_name: lastName,
        email,
    } = ticket.getPayload();

    const customer = await customerInitialize(firstName, lastName, email);

    customer.generateAuthToken();

    res.send(_.pick(customer, ['id', 'firstName', 'lastName', 'email']));
});

module.exports = router;

const customerInitialize = async (firstName, lastName, email) => {
	const customer = await Customer.findOne({
		where: {
			email,
		},
	});
	if (!customer) {
		const generated_password = password.randomPassword({
			characters: [
				password.lower,
				password.upper,
				password.digits,
				password.symbols,
			],
		});

		const salt = await bcrypt.genSalt(10);
		const hashed_password = await bcrypt.hash(generated_password, salt);

		const customer = await Customer.build({
			firstName,
			lastName,
			email,
			password: hashed_password,
		});
		return await customer.save();
	} else return customer;
};
