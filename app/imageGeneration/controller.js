const isRequired = require('../../handler/utils/validator').isRequired;
const changehairCore = require('./core/changehair');
const agePrediCore = require('./core/agePredictor');
const babyGeneratorCore = require('./core/babyGenerator');
const ageJourneyCore = require('./core/ageJourney');
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { console } = require('inspector');

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

const ageJourneyFn = async function (req) {
  const userid = isRequired(req.body.userid);
  let uploadimage = null;
  let genraterImg = null;

  const baseURL = `${req.protocol}://${req.get('host')}/uploads`;

  // HairuploadPhoto field check
  if (req.files && req.files.ageJourneyUpload && req.files.ageJourneyUpload.length > 0) {
    const uploadedFile = req.files.ageJourneyUpload[0];
    console.log("Uploaded image file name:", uploadedFile.filename);
    console.log("Uploaded image full path:", uploadedFile.path);

    uploadimage = `${baseURL}/${uploadedFile.filename}`;

    // genraterImg field check
    if (req.files.genraterImg && req.files.genraterImg.length > 0) {
      const genFile = req.files.genraterImg[0];
      genraterImg = `${baseURL}/${genFile.filename}`;
    } else {
      const newFileName = `${uuidv4()}${path.extname(uploadedFile.originalname)}`;
      genraterImg = `${baseURL}/${newFileName}`;
    }
  } else {
    // no image uploaded, check body for genraterImg name
    if (req.body.genraterImg) {
      genraterImg = `${baseURL}/${req.body.genraterImg}`;
    }
  }
  const selectAge = isRequired(req.body.age);
  const transactionId = isRequired(req.body.transactionId);
  const createdAT = new Date();
  const updatedAT = new Date();
  return await ageJourneyCore.ageJourney(userid, uploadimage, selectAge, genraterImg, transactionId, createdAT, updatedAT);
};


const babyGeneratorFn = async function (req) {
  const userid = isRequired(req.body.userid);
  let parent1 = null;
  let parent2 = null;
  let genraterImg = null;

  const baseURL = `${req.protocol}://${req.get('host')}/uploads`;
  if ((req.files && req.files.parent1 && req.files.parent1.length > 0) || (req.files && req.files.parent2 && req.files.parent2.length > 0)) {

    if (req.files.parent1 && req.files.parent1.length > 0) {
      const uploadParent1 = req.files.parent1[0];
      console.log("uploaded image parent 1 file  name :", uploadParent1.filename);
      console.log("uploaded image parent 1 path name :", uploadParent1.path);
      parent1 = `${baseURL}/${uploadParent1.filename}`;
    }
    if (req.files.parent2 && req.files.parent2.length > 0) {
      const uploadParent2 = req.files.parent2[0];
      console.log("uploaded image parent 2 file  name :", uploadParent2.filename);
      console.log("uploaded image parent 2 path name :", uploadParent2.path);
      parent2 = `${baseURL}/${uploadParent2.filename}`;
    }
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
  // const generatorimg = isRequired(req.body.generatorimg);
  const transactionId = isRequired(req.body.transactionId);
  const createdAT = new Date();
  const updatedAT = new Date();
  return await babyGeneratorCore.babyGenerator(userid, parent1, parent2, gender, genraterImg, transactionId, createdAT, updatedAT);
};

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

// module.exports = { changeHairstyleFn };

module.exports = {
  agePredictorFn,
  ageJourneyFn,
  babyGeneratorFn,
  changeHairstyleFn
};
