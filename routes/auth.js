var express = require('express');
var router = express.Router();
var functionHandler = require('../handler/http/requestHandler')
var controller = require('../app/auth/controller')

router.get('/login', async function(req, res, next) {
    await functionHandler.requestHandler(req, res, controller.loginFn)
})

router.post('/register', async function(req, res, next) {
    await functionHandler.requestHandler(req, res, controller.registerFn)
})


module.exports = router;