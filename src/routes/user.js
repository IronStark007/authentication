const express = require("express");
const router = express.Router();
const { register, login, protected } = require("../controller/user");
const { authSchema } = require("../models/user");
const { validateRequestData, verifyJWTToken } = require("../middlewares/user");

router.post("/register", validateRequestData(authSchema), register);
router.post("/login", validateRequestData(authSchema), login);
router.get("/protected", verifyJWTToken, protected);

module.exports = router;
