const { createUser, getUser } = require("../services/user");
const {
  genHashPassword,
  validatePassword,
  generateJWTToken,
} = require("../utils");
const { v4: uuidv4 } = require("uuid");

const register = (req, res) => {
  let { salt, hash } = genHashPassword(req.validateData.password);
  let newUser = {
    id: uuidv4(),
    username: req.validateData.username,
    salt: salt,
    hash: hash,
  };
  createUser(newUser, (result) => {
    if (result instanceof Error) {
      res.status(500).send({ succes: false, error: result.detail });
    } else {
      res.send({ success: true, user: newUser });
    }
  });
};

const login = (req, res) => {
  getUser(req.validateData.username, (user) => {
    if (user instanceof Error) {
      res.status(500).send({ succes: false, error: user.detail });
    } else if (!user) {
      res
        .status(404)
        .send({ succes: false, error: "username does not exists" });
    } else {
      const isValid = validatePassword(
        req.validateData.password,
        user.hash,
        user.salt
      );
      if (isValid) {
        const { token, expires } = generateJWTToken(user);
        res
          .status(200)
          .send({ success: true, token: token, expiresIn: expires });
      } else {
        res
          .status(404)
          .send({ success: false, message: "password is incorrect" });
      }
    }
  });
};

const protected = (req, res) => {
  res
    .status(200)
    .send({ success: true, msg: "You are successfully authenticated" });
};

module.exports = {
  register: register,
  login: login,
  protected: protected,
};
