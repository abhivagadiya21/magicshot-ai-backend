var express = require('express');
var router = express.Router();
var functionHandler = require('../handler/http/requestHandler')
var controller = require('../app/auth/controller')
var controller2 = require('../app/imageGeneration/controller')
var createMulterUpload = require('../handler/utils/multerConfig')


const uploadChangeHair = createMulterUpload("changehair_upload/");
// const uploadBabyGenerator = createMulterUpload("baby_upload/");
// const uploadAgeJourney = createMulterUpload("agejourney_upload/");
const uploadAgePredictor = createMulterUpload("agepredictor_upload/");

router.post('/login', async function(req, res, next) {
    await functionHandler.requestHandler(req, res, controller.loginFn)
})

router.post('/register', async function(req, res, next) {
    await functionHandler.requestHandler(req, res, controller.registerFn)
})

router.post('/age-predictor',uploadAgePredictor.single("agepredicterupload"), async function(req, res, next) {
    await functionHandler.requestHandler(req, res, controller2.agePredictorFn)
})

router.post('/age-journey', async function(req, res, next) {
    await functionHandler.requestHandler(req, res, controller2.ageJourneyFn)
})

router.post('/baby-generator', async function(req, res, next) {
    await functionHandler.requestHandler(req, res, controller2.babyGeneratorFn)
})

router.post('/change-hairstyle', uploadChangeHair.single("HairuploadPhoto"), async function(req, res, next) {
    await functionHandler.requestHandler(req, res, controller2.changeHairstyleFn)
})

module.exports = router;