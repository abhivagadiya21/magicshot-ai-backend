const fs = require("fs");
const path = require("path");
function getUploadUrl(foldername, uploadsDir, baseURL, uploadedFile) {
    const monthFolder = new Date().toISOString().slice(0, 7);
    const monthPath = path.join(uploadsDir, foldername, monthFolder);
    const uploadPath = path.join(monthPath, "upload");
    // fs.mkdirSync(uploadPath, { recursive: true });
     const filename =
        typeof uploadedFile === "string"
            ? uploadedFile
            : uploadedFile.filename || uploadedFile.originalname;

    if (!filename) {
        throw new Error("filename missing in getUploadUrl()");
    }

    const uploadFilePath = path.join(uploadPath, filename);
    const uploadRelative = path.relative(uploadsDir, uploadFilePath);
    const uploadUrl = `${baseURL}/uploads/${uploadRelative.replace(/\\/g, "/")}`;
    return { uploadUrl };
}
module.exports = getUploadUrl;