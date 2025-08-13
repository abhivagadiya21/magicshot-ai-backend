// const multer = require("multer");
// const path = require("path");
// const { v4: uuidv4 } = require("uuid");

// // Create multer storage with dynamic folder
// function createMulterUpload(folderName) {
//     const storage = multer.diskStorage({
//         destination: (req, file, cb) => {
//             cb(null, folderName); // unique folder for each route
//         },
//         filename: (req, file, cb) => {
//             const uniqueName = uuidv4() + path.extname(file.originalname);
//             cb(null, uniqueName);
//         }
//     });
//     return multer({ storage: storage });
// }

// module.exports = createMulterUpload;






//-------------------chat gpt---------------------------
// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");
// const { v4: uuidv4 } = require("uuid");

// function createMulterUpload(folderName = "changehair_upload") {
//   // Save uploads inside project root
//   const absFolder = path.isAbsolute(folderName)
//     ? folderName
//     : path.join(__dirname, "..", "..", folderName);

//   // Ensure folder exists
//   fs.mkdirSync(absFolder, { recursive: true });

//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, absFolder),
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname || ".jpg");
//       cb(null, `${uuidv4()}${ext}`);
//     },
//   });

//   return multer({ storage });
// }

// module.exports = createMulterUpload;


const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

function createMulterUpload(folderName = "changehair_upload") {
  const absFolder = path.join(__dirname, "..", "..", folderName);
  fs.mkdirSync(absFolder, { recursive: true });

  const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, absFolder),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname || ".jpg");
      const filename = `${uuidv4()}${ext}`;
      cb(null, filename);
    },
  });

  return multer({ storage });
}

module.exports = createMulterUpload;

