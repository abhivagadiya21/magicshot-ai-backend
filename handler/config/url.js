const fs = require("fs");
const path = require("path");
function handleUrl(foldername, uploadsDir, baseURL, uploadedFile) {
    let uploadUrl = null;
    let genraterUrl = null;
    const monthFolder = new Date().toISOString().slice(0, 7);
    const monthPath = path.join(uploadsDir, foldername, monthFolder);

    const uploadPath = path.join(monthPath, "upload");
    const generatorPath = path.join(monthPath, "generator");
    fs.mkdirSync(generatorPath, { recursive: true });
    const originalFilePath = path.join(uploadPath, uploadedFile.filename);
    const uploadRelative = path.relative(uploadsDir, originalFilePath);
    uploadUrl = `${baseURL}/uploads/${uploadRelative.replace(/\\/g, "/")}`;

    const newFileName = uploadedFile.filename.replace(
        path.extname(uploadedFile.filename),
        `_gen${path.extname(uploadedFile.originalname)}`
    );
    const newFilePath = path.join(generatorPath, newFileName);
    fs.copyFileSync(uploadedFile.path, newFilePath);

    const generatorRelative = path.relative(uploadsDir, newFilePath);
    genraterUrl = `${baseURL}/uploads/${generatorRelative.replace(/\\/g, "/")}`;

    return { uploadUrl, genraterUrl };

}
module.exports = handleUrl;