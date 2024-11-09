var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/api', function(req, res, next) {
  res.json({ organization: "Student Cyber Games" });
});

module.exports = router;
