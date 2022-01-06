const { Router } = require('express');
const express = require('express');
const render = express.Router();

router.get("/", (req, res) => {
  res.send("We are on posts");
});

module.exports = router;