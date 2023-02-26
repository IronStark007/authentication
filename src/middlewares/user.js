const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

const pathToPubKey = path.join(__dirname, "..", "id_rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToPubKey, "utf8");

function validateRequestData(schema) {
  return (req, res, next) => {
    let { error, value } = schema.validate(req.body);
    if (error) {
      res.status(422).send({ error: error.message });
    } else {
      req.validateData = value;
      next();
    }
  };
}

function logRequest(req, res, next) {
  console.log(`method: ${req.method} path: ${req.path}`);
  console.log(`status: ${res.statusCode}`);
  next();
}

function verifyJWTToken(req, res, next) {
  const tokenParts = req.headers.authorization.split(" ");
  if (
    tokenParts[0] === "Bearer" &&
    tokenParts[1].match(/\S+\.\S+\.\S+/) !== null
  ) {
    try {
      const verification = jsonwebtoken.verify(tokenParts[1], PUB_KEY, {
        algorithms: ["RS256"],
      });
      req.jwt = verification;
      next();
    } catch (err) {
      res.status(401).send({ success: false, msg: "You are not authorized" });
    }
  } else {
    res.status(401).send({ success: false, msg: "You are not authorized" });
  }
}

module.exports = {
  validateRequestData: validateRequestData,
  logRequest: logRequest,
  verifyJWTToken: verifyJWTToken,
};
