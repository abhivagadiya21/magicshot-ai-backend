const fs = require("fs");
const path = require("path");
function getGenrateUrl(foldername, uploadsDir, baseURL, uploadedFile) {
    const monthFolder = new Date().toISOString().slice(0, 7);
    const monthPath = path.join(uploadsDir, foldername, monthFolder);
    const generatorPath = path.join(monthPath, "generator");
    fs.mkdirSync(generatorPath, { recursive: true });
    const newFileName = uploadedFile.filename.replace(
        path.extname(uploadedFile.filename),
        `_gen${path.extname(uploadedFile.originalname)}`
    );
    const newFilePath = path.join(generatorPath, newFileName);
    fs.copyFileSync(uploadedFile.path, newFilePath);
    const generatorRelative = path.relative(uploadsDir, newFilePath);
    const genraterUrl = `${baseURL}/uploads/${generatorRelative.replace(/\\/g, "/")}`;
    return { genraterUrl };
}
module.exports = getGenrateUrl;