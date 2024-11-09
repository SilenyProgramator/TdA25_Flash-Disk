var express = require('express');
var router = express.Router();

// Define a simple API endpoint
router.get('/api', (req, res) => {
  res.json({ organization: "Student Cyber Games" });
});

module.exports = router;
