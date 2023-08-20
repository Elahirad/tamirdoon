const express = require('express');
const bcrypt = require('bcrypt');
const password = require('secure-random-password');
const _ = require('lodash');
const {OAuth2Client} = require('google-auth-library');
const {OAuthVerifyValidate} = require('../models/oauth');
const {User} = require('../models/user');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const router = express.Router();

router.post('/verify', async (req, res) => {
	const {error} = OAuthVerifyValidate(req.body);
	if (error) return res.status(400).send(error.details[0].message);
	try {
		const ticket = await client.verifyIdToken({
			idToken: req.body.credential,
			audience: process.env.GOOGLE_CLIENT_ID,
		});
		const {
			given_name: firstName,
			family_name: lastName,
			email,
		} = ticket.getPayload();

		const user = await userInitialize(firstName, lastName, email);

		const token = user.generateAuthToken();
		res.cookie('x-auth-token', token, {
			maxAge: 24 * 60 * 60 * 1000,
			httpOnly: true,
			sameSite: 'strict',
			secure: true,
		});

		res.send(_.pick(user, ['id', 'firstName', 'lastName', 'email']));
	} catch (err) {
		res.sendStatus(500);
	}
});

module.exports = router;

const userInitialize = async (firstName, lastName, email) => {
	const user = await User.findOne({
		where: {
			email,
		},
	});
	if (!user) {
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
		const user = await User.build({
			firstName,
			lastName,
			email,
			password: hashed_password,
		});
		return await user.save();
	} else return user;
};
