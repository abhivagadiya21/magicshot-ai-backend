const isRequired = require('../../handler/utils/validator').isRequired;
const changehairCore = require('./core/changehair');
const agePrediCore = require('./core/agePredictor');
const babyGeneratorCore = require('./core/babyGenerator');
const ageJourneyCore = require('./core/ageJourney');
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { console } = require('inspector');
const { isRequiredFile } = require('../../handler/utils/validator');

const agePredictorFn = async function (req) {
  const userId = req.user.id;
  const uploadimage = isRequiredFile(req.files.agePredictorUpload);
  const Predict_age = isRequired(req.body.Predict_age);
  return await agePrediCore.agePredictor(req, userId, Predict_age);
};

const ageJourneyFn = async function (req) {
  const userid = req.user.id;
  const uploadimage = isRequiredFile(req.files.ageJourneyUpload);
  const selectAge = isRequired(req.body.age);
  return await ageJourneyCore.ageJourney(req, userid, selectAge);
};

const babyGeneratorFn = async function (req) {
  const userid = req.user.id;
  const parent1 = isRequiredFile(req.files.parent1);
  const parent2 = isRequiredFile(req.files.parent2);
  const gender = isRequired(req.body.gender);
  return await babyGeneratorCore.babyGenerator(req, userid, gender);
};

const changeHairstyleFn = async function (req) {
  const userid = req.user.id;
  const uploadimage = isRequiredFile(req.files.HairuploadPhoto);
  const gender = isRequired(req.body.gender);
  const hairStyle = isRequired(req.body.hairStyle);
  const hairColor = isRequired(req.body.hairColor);
  return await changehairCore.changeHair(req, userid, gender, hairStyle, hairColor);
};

module.exports = {
  agePredictorFn,
  ageJourneyFn,
  babyGeneratorFn,
  changeHairstyleFn
};
