var express = require('express');
var router = express.Router();

// Define the /api endpoint
router.get('/', (req, res) => {
  res.json({ organization: "Student Cyber Games" });
});

module.exports = router;
