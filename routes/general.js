const express = require("express");
const router = express.Router();

const General = require("../controllers/general");

router.get("/", General.home);

module.exports = router;
