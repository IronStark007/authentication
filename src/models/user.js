const joi = require("joi");

let userSchema = joi.object().keys({
  id: joi.string().uuid({ version: "uuidv4" }).required(),
  username: joi.string().min(10).max(266).required(),
  hash: joi.string().max(1024).required(),
  salt: joi.string().max(1024).required(),
});

let authSchema = joi.object().keys({
  username: joi.string().min(3).max(266).required(),
  password: joi.string().min(6).max(16).required(),
});

module.exports = {
  userSchema: userSchema,
  authSchema: authSchema,
};
