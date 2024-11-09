var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/api', (req, res) => {
  res.json({ organization: "Space Cyber Games" });
});

module.exports = router;
