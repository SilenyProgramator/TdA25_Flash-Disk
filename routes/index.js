var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  res.sendStatus(200); // posle status kod 200 pri GET requestu na "/"
});

module.exports = router;
