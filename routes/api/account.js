/**
 * Created by HP on 17/11/2017.
 */
var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendStatus(200);
});

module.exports = router;