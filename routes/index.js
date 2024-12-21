var express = require('express');
var path = require('path');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/main.html')); // Správná cesta k main.html
});

module.exports = router;


