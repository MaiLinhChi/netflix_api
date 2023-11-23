const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  res
    .status(200)
    .send(
      "Wellcome to netflix api. Go to <a href='/documentation'>Documentation</a>"
    );
});

module.exports = router;
