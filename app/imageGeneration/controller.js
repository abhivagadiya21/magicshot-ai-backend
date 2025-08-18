const isRequired = require('../../handler/utils/validator').isRequired;
const changehairCore = require('./core/changehair');
const agePrediCore = require('./core/agePredictor');
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const agePredictorFn = async function (req) {
  const userId = isRequired(req.body.userId);

  let uploadimage = null;

  const baseURL = `${req.protocol}://${req.get('host')}/uploads`;

  if (req.files && req.files.agePredictorUpload && req.files.agePredictorUpload.length > 0) {
    const uploadedFile = req.files.agePredictorUpload[0];
    console.log("Uploaded image file name:", uploadedFile.filename);
    console.log("Uploaded image full path:", uploadedFile.path);

    uploadimage = `${baseURL}/${uploadedFile.filename}`;
  }

  const Predict_age = isRequired(req.body.Predict_age);
  const transactionId = isRequired(req.body.transactionId);

  return await agePrediCore.agePredictor(
    userId,
    uploadimage,
    Predict_age,
    transactionId
  );
};


const ageJourneyFn = async function (req) { };
const babyGeneratorFn = async function (req) { };


const changeHairstyleFn = async function (req) {
  const userid = isRequired(req.body.userid);

  let uploadimage = null;
  let genraterImg = null;

  const baseURL = `${req.protocol}://${req.get('host')}/uploads`;

  if (req.files && req.files.HairuploadPhoto && req.files.HairuploadPhoto.length > 0) {
    const uploadedFile = req.files.HairuploadPhoto[0];
    console.log("Uploaded image file name:", uploadedFile.filename);
    console.log("Uploaded image full path:", uploadedFile.path);

    uploadimage = `${baseURL}/${uploadedFile.filename}`;

    if (req.files.genraterImg && req.files.genraterImg.length > 0) {
      const genFile = req.files.genraterImg[0];
      genraterImg = `${baseURL}/${genFile.filename}`;
    } else {
      const newFileName = `${uuidv4()}${path.extname(uploadedFile.originalname)}`;
      genraterImg = `${baseURL}/${newFileName}`;
    }
  } else {

    if (req.body.genraterImg) {
      genraterImg = `${baseURL}/${req.body.genraterImg}`;
    }
  }

  const gender = isRequired(req.body.gender);
  const hairStyle = isRequired(req.body.hairStyle);
  const hairColor = isRequired(req.body.hairColor);
  const transactionId = isRequired(req.body.transactionId);
  const createdAT = new Date();
  const updatedAT = new Date();

  return await changehairCore.changeHair(
    userid,
    uploadimage,
    gender,
    hairStyle,
    hairColor,
    genraterImg,
    transactionId,
    createdAT,
    updatedAT
  );
};

module.exports = { changeHairstyleFn };

module.exports = {
  agePredictorFn,
  ageJourneyFn,
  babyGeneratorFn,
  changeHairstyleFn
};
