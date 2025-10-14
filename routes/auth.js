var express = require('express');
var router = express.Router();
var functionHandler = require('../handler/http/requestHandler')
var controller = require('../app/auth/controller')
var authMiddleware = require('../middlewares/auth');
var createMulterUpload = require('../handler/utils/multerConfig')

const upload = createMulterUpload("profile_pics");

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

router.get('/image-history',authMiddleware, async function (req, res, next) {
  await functionHandler.requestHandler(req, res, controller.getUserImageHistoryFn);
});

router.post('/profile/changeprofileimage', authMiddleware,upload.single('profileImage'),
   async function (req, res, next) {
  await functionHandler.requestHandler(req, res, controller.setProfileImageFn);
});

router.post('/profile/usernameBio', authMiddleware, async function (req, res, next) {
  await functionHandler.requestHandler(req, res, controller.setProfileInfoFn);
});

router.post('/profile/changepassword', authMiddleware, async function (req, res, next) {
  await functionHandler.requestHandler(req, res, controller.changePasswordFn);
});

router.get('/transactions', authMiddleware, async function (req, res, next) {
  await functionHandler.requestHandler(req, res, controller.getUserTransactionsFn);
});

module.exports = router;