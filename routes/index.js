var express = require('express');
var router = express.Router();
var path = require('path'); // Import modulu path

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'main.html')); // posle status kod 200 pri GET requestu na "/"
});

module.exports = router;


