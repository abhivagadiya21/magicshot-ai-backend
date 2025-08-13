// const ResponseModal = require('../../../handler/http/ResponseModal')
// const authDao = require('./dao');
// const path = require("path");
// const multer = require("multer");
// const { v4: uuidv4 } = require("uuid");



// const changeHair = async function (userid,uploadimage,gender,hairStyle,hairColor,genraterImg,transactionId,createdAT,updatedAT) {
//     try {
//         let hair_insert = await authDao.changeHair_insert(userid, uploadimage, gender, hairStyle, hairColor, genraterImg, transactionId, createdAT, updatedAT);
//         if (hair_insert.rowCount === 0) {
//             return new ResponseModal()
//                 .setStatus("error")
//                 .setStatusCode(400)
//                 .setMessage("Insert failed");
//         }
//         const uploadimg = req.file.filename; // UUID file name from multer

//         return new ResponseModal()
//             .setStatus("success")
//             .setStatusCode(200)
//             .setMessage("Hair change uploaded successfully")
//             .setData({
//                 fileName: uploadimg,
//                 filePath: `${req.protocol}://${req.get("host")}/changehair_upload/${req.file.filename}`

//             });
//     } catch (error) {
//         console.error(err);
//         return new ResponseModal()
//             .setStatus("error")
//             .setStatusCode(500)
//             .setMessage("Server error");
//     }
// }

// module.exports={
//     changeHair
// }




// ------------------------chat gpt ---------------


const ResponseModal = require('../../../handler/http/ResponseModal');
const authDao = require('./dao');

/**
 * Insert a change-hair record.
 * @param {string} userid
 * @param {string} uploadimage  // filename saved by multer (req.file.filename)
 * @param {string} gender
 * @param {string} hairStyle
 * @param {string} hairColor
 * @param {string} genraterImg
 * @param {string} transactionId
 * @param {Date}   createdAT
 * @param {Date}   updatedAT
 */
const changeHair = async function (
  userid,
  uploadimage,
  gender,
  hairStyle,
  hairColor,
  genraterImg,
  transactionId
 
) {
  try {
    const result = await authDao.changeHair_insert(
      userid,
      uploadimage,
      gender,
      hairStyle,
      hairColor,
      genraterImg,
      transactionId
      
    );

    if (!result || result.rowCount === 0) {
      return new ResponseModal()
        .setStatus('error')
        .setStatusCode(400)
        .setMessage('Insert failed');
    }

    // Public URL path (served by app.js)
    const fileUrl = `/changehair_upload/${uploadimage}`;

    return new ResponseModal()
      .setStatus('success')
      .setStatusCode(200)
      .setMessage('Hair change saved')
      .setData({
        file: uploadimage,
        fileUrl
      });
  } catch (error) {
    console.error('changeHair error:', error);
    return new ResponseModal()
      .setStatus('error')
      .setStatusCode(500)
      .setMessage('Server error');
  }
};

module.exports = {
  changeHair
};
