const express = require("express");

const Auth = require("../controllers/auth");

const Validator = require("../middlewares/validation");
const authSchema = require("../validation/auth");

const router = express.Router();

router.post("/register", Validator(authSchema.register), Auth.register);

router.post("/login", Validator(authSchema.login), Auth.login);

module.exports = router;
