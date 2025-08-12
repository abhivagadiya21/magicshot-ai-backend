const ResponseModal = require('../../../handler/http/ResponseModal')
const authDao = require('./dao');
const path = require("path");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");



const changeHair = async function (uploadPhoto) {
    try {
        let hair_insert = await authDao.changeHair_insert(userid, uploadimg, gender, hairStyle, hairColor, genraterImg, transactionId, createdAT, updatedAT);
        if (hair_insert.rowCount === 0) {
            return new ResponseModal()
                .setStatus("error")
                .setStatusCode(400)
                .setMessage("Insert failed");
        }
        const uploadimg = req.file.filename; // UUID file name from multer

        return new ResponseModal()
            .setStatus("success")
            .setStatusCode(200)
            .setMessage("Hair change uploaded successfully")
            .setData({
                fileName: uploadimg,
                filePath: `${req.protocol}://${req.get("host")}/changehair_upload/${req.file.filename}`

            });
    } catch (error) {
        console.error(err);
        return new ResponseModal()
            .setStatus("error")
            .setStatusCode(500)
            .setMessage("Server error");
    }
}