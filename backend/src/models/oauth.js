const Joi = require('joi');

function OAuthVerifyValidate(request) {
	const schema = Joi.object({
		credential: Joi.string().required(),
	});

	return schema.validate(request);
}

module.exports = {OAuthVerifyValidate};
