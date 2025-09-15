var express = require('express');
var router = express.Router();
var functionHandler = require('../handler/http/requestHandler')
var controller = require('../app/auth/controller')
var authMiddleware = require('../middlewares/auth');

router.post('/login', async function (req, res, next) {
  await functionHandler.requestHandler(req, res, controller.loginFn)
})

router.post('/register', async function (req, res, next) {
  await functionHandler.requestHandler(req, res, controller.registerFn)
})

router.get("/uploads/:folder/:filename", (req, res) => {
  const { folder, filename } = req.params;
  const filePath = path.join(__dirname, `../uploads/${folder}/${filename}`);
  res.sendFile(filePath);
});

router.get('/profile', authMiddleware, async function (req, res, next) {
  await functionHandler.requestHandler(req, res, controller.getUserProfileFn);
});

module.exports = router;