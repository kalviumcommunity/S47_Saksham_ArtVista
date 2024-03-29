const Joi = require('joi');

const userSchema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6)
});

function validateUser(data) {
    return userSchema.validate(data);
}

module.exports.validateUser = validateUser;
