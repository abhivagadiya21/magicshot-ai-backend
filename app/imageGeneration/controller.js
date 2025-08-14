const isRequired = require('../../handler/utils/validator').isRequired;
const changehairCore = require('./core/changehair');
const agePrediCore = require('./core/agePredictor');
const babyGeneratorCore = require('./core/babyGenerator');
const ageJourneyCore = require('./core/ageJourney');
const { v4: uuidv4 } = require("uuid");
const path = require("path");
const { console } = require('inspector');



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


const agePredictorFn = async function (req) {
  const userid = isRequired(req.body.userid);

  let uploadimage = null;
  let genraterImg = null;

  const baseURL = `${req.protocol}://${req.get('host')}/uploads`;

  // agePredictorUpload field check
  if (req.files && req.files.agePredictorUpload && req.files.agePredictorUpload.length > 0) {
    const uploadedFile = req.files.agePredictorUpload[0];
    console.log("Uploaded image file name:", uploadedFile.filename);
    console.log("Uploaded image full path:", uploadedFile.path);

    uploadimage = `${baseURL}/${uploadedFile.filename}`;

    // genrater_Img field check
    if (req.files.genrater_Img && req.files.genrater_Img.length > 0) {
      const genFile = req.files.genrater_Img[0];
      genraterImg = `${baseURL}/${genFile.filename}`;
    } else {
      const newFileName = `${uuidv4()}${path.extname(uploadedFile.originalname)}`;
      genraterImg = `${baseURL}/${newFileName}`;
    }
  } else {
    // no image uploaded, check body for genrater_Img name
    if (req.body.genrater_Img) {
      genraterImg = `${baseURL}/${req.body.genrater_Img}`;
    }
  }

  const userId = isRequired(req.body.userid);
  const Predict_age = isRequired(req.body.predictage);
  const transactionId = isRequired(req.body.transactionId);
  // lowercase 'transactionId'

  return await agePrediCore.agePredictor(
    userId,
    uploadimage,
    genraterImg,
    Predict_age,
    transactionId
  );
};







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

// const isRequired = require('../../handler/utils/validator').isRequired;
// const changehairCore = require('./core/changehair');
// const { v4: uuidv4 } = require("uuid");
// const path = require("path");
// const fs = require("fs");

// const changeHairstyleFn = async function (req) {
//   const userid = isRequired(req.body.userid);

//   let uploadimage = null;
//   let genraterImg = null;

//   if (req.file) {
//     // Generate UUID name for original uploaded image
//     const uuidName = `${uuidv4()}${path.extname(req.file.originalname)}`;
//     const uploadPath = path.join(req.file.destination, uuidName);

//     // Rename/move uploaded file to UUID name
//     fs.renameSync(req.file.path, uploadPath);

//     uploadimage = uuidName;

//     // If no genraterImg provided, create another UUID for AI image
//     genraterImg = req.body.genraterImg || `${uuidv4()}${path.extname(req.file.originalname)}`;
//   } else {
//     genraterImg = req.body.genraterImg || null;
//   }

//   const gender = isRequired(req.body.gender);
//   const hairStyle = isRequired(req.body.hairStyle);
//   const hairColor = isRequired(req.body.hairColor);
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

// module.exports = { changeHairstyleFn };

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

  // HairuploadPhoto field check
  if (req.files && req.files.HairuploadPhoto && req.files.HairuploadPhoto.length > 0) {
    const uploadedFile = req.files.HairuploadPhoto[0];
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


module.exports = {
  agePredictorFn,
  ageJourneyFn,
  babyGeneratorFn,
  changeHairstyleFn
};
