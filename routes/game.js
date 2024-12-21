var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {

    res.status(200);

    res.send("cauko!");
});

module.exports = router;