// handler/utils/multerConfig.js
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");  // 👈 uuid use karva mate

// function createMulterUpload(folderName) {
//   const uploadPath = path.join(__dirname, "../../uploads", folderName);

//   // ensure folder exists
//   if (!fs.existsSync(uploadPath)) {
//     fs.mkdirSync(uploadPath, { recursive: true });
//   }

//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//       const uniqueName = uuidv4() + path.extname(file.originalname);
//       cb(null, uniqueName);

//       // 👇 Store DB path in request so route can use it
//       req.savedFilePath = `/uploads/${folderName}/${uniqueName}`;
//     },
//   });

//   return multer({ storage });
// }


function createMulterUpload(folderName) {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const monthFolder = new Date().toISOString().slice(0, 7); // e.g. "2025-09"
      const uploadPath = path.join(__dirname, "../../uploads", folderName, monthFolder, "upload");

      fs.mkdirSync(uploadPath, { recursive: true });
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      //const uniqueName = uuidv4() + path.extname(file.originalname);
      const epochTime = Date.now(); // current timestamp in milliseconds
      const uniqueName = `${uuidv4()}_${epochTime}${path.extname(file.originalname)}`;
      cb(null, uniqueName);

      // Save path for DB use
      if (!req.savedFiles) req.savedFiles = {};
      req.savedFiles[file.fieldname] = `/uploads/${folderName}/${new Date().toISOString().slice(0, 7)}/upload/${uniqueName}`;
    },
  });

  return multer({ storage });
}

module.exports = createMulterUpload;
