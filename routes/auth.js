var express = require('express');
var router = express.Router();
var functionHandler = require('../handler/http/requestHandler')
var controller = require('../app/auth/controller')
var createMulterUpload = require('../handler/utils/multerConfig')


const uploadChangeHair = createMulterUpload("changehair_upload/");
// const uploadBabyGenerator = createMulterUpload("baby_upload/");
// const uploadAgeJourney = createMulterUpload("agejourney_upload/");

router.post('/login', async function(req, res, next) {
    await functionHandler.requestHandler(req, res, controller.loginFn)
})

router.post('/register', async function(req, res, next) {
    await functionHandler.requestHandler(req, res, controller.registerFn)
})

router.post('/age-predictor', async function(req, res, next) {
    await functionHandler.requestHandler(req, res, controller.agePredictorFn)
})

router.post('/age-journey', async function(req, res, next) {
    await functionHandler.requestHandler(req, res, controller.ageJourneyFn)
})

router.post('/baby-generator', async function(req, res, next) {
    await functionHandler.requestHandler(req, res, controller.babyGeneratorFn)
})

router.post('/change-hairstyle', uploadChangeHair.single("HairuploadPhoto"), async function(req, res, next) {
    await functionHandler.requestHandler(req, res, controller.changeHairstyleFn)
})

module.exports = router;