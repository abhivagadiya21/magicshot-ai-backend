var express = require('express');
var router = express.Router();
var auth = require('./auth')
var appRoute = require('./appRoute')

router.use('/auth', auth)
router.use('/auth', appRoute)
module.exports = router;
