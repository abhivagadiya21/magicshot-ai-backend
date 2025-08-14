// const isRequired = require('../../handler/utils/validator').isRequired
// const auth = require('./core/changehair')


// const agePredictorFn = async function (req) {
// }

// const ageJourneyFn = async function (req) {
// }

// const babyGeneratorFn = async function (req) {
// }

// const changeHairstyleFn = async function (req) {
//     let userid = isRequired(req.body.userid);
//     // let uploadimage = isRequired(req.file.filename); // from multer
//     let uploadimage = isRequired(req.file.uploadimage);
//     let gender = isRequired(req.body.gender);
//     let hairStyle = isRequired(req.body.hairStyle);
//     let hairColor = isRequired(req.body.hairColor);
//     let genraterImg = isRequired(req.body.genraterImg);
//     let transactionId = isRequired(req.body.transactionId);
//     let createdAT = new Date();
//     let updatedAT = new Date();

//     return await auth.changeHair(userid,uploadimage,gender,hairStyle,hairColor,genraterImg,transactionId,createdAT,updatedAT);
// }

// module.exports = {
//     agePredictorFn,
//     ageJourneyFn,
//     babyGeneratorFn,
//     changeHairstyleFn
// }


// ----------------------chat gpt --------------------
// const isRequired = require('../../handler/utils/validator').isRequired;
// const changehairCore = require('./core/changehair');
// const { v4: uuidv4 } = require("uuid");
// const path = require("path");

const agePredictorFn = async function (req) { };
const ageJourneyFn = async function (req) { };
const babyGeneratorFn = async function (req) { };

// const changeHairstyleFn = async function (req) {
//   const userid = isRequired(req.body.userid);
//   // field name must match the multer.single() in routes: "HairuploadPhoto"
//   const uploadimage = req.file ? req.file.filename:null;
//   const gender = isRequired(req.body.gender);
//   const hairStyle = isRequired(req.body.hairStyle);
//   const hairColor = isRequired(req.body.hairColor);
//   // const genraterImg = req.body.genraterImg;
//   const genraterImg =
//     req.body.genraterImg ||
//     (req.file
//       ? `${uuidv4()}${path.extname(req.file.originalname)}`
//       : null); // or some default value

//   const transactionId = isRequired(req.body.transactionId);
//   const createdAT = new Date();
//   const updatedAT = new Date();

//   return await changehairCore.changeHair(
//     userid,
//     uploadimage,
//     gender,
//     hairStyle,
//     hairColor,
//     genraterImg,
//     transactionId,
//     createdAT,
//     updatedAT
//   );
// };











const isRequired = require('../../handler/utils/validator').isRequired;
const changehairCore = require('./core/changehair');
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const fs = require("fs");

const changeHairstyleFn = async function (req) {
  const userid = isRequired(req.body.userid);

  let uploadimage = null;
  let genraterImg = null;

  if (req.files && req.files.HairuploadPhoto && req.files.HairuploadPhoto[0]) {
    const fileData = req.files.HairuploadPhoto[0];
    const uuidName = `${uuidv4()}${path.extname(fileData.originalname)}`;
    const uploadPath = path.join(fileData.destination, uuidName);
    fs.renameSync(fileData.path, uploadPath);
    uploadimage = uuidName; 
  }


  if (req.files && req.files.genraterImg && req.files.genraterImg[0]) {
    const fileData = req.files.genraterImg[0];
    const uuidName = `${uuidv4()}${path.extname(fileData.originalname)}`;
    const uploadPath = path.join(fileData.destination, uuidName);
    fs.renameSync(fileData.path, uploadPath);
    genraterImg = uuidName;
  } else {
    genraterImg = req.body.genraterImg || null;
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
