var express = require('express');
var router = express.Router();

router.get('/test', (req, res) => {

    res.status(200);

    res.send("cauko!");
});

module.exports = router;