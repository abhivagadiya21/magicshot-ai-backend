const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

// Create multer storage with dynamic folder
function createMulterUpload(folderName) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, folderName); // unique folder for each route
        },
        filename: (req, file, cb) => {
            const uniqueName = uuidv4() + path.extname(file.originalname);
            cb(null, uniqueName);
        }
    });
    return multer({ storage: storage });
}

module.exports = createMulterUpload;
