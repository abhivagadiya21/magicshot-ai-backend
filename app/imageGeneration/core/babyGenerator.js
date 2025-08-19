const ResponseModal = require('../../../handler/http/ResponseModal');
const authDao = require('./dao');
const babyGenerator = async function (userid, parent1, parent2, gender, genraterImg, transactionId) {
    try {
        const result =await authDao.babygenerator_insert(userid, parent1, parent2, gender, genraterImg, transactionId);
        if (!result || result.rowCount === 0) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(400)
                .setMessage('Insert failed');
        }
        const fileUrl = `/baby_upload/${genraterImg}`;
        return new ResponseModal()
            .setStatus('success')
            .setStatusCode(200)
            .setMessage('babyGenerator change saved')
            .setData({
                file: genraterImg,
                fileUrl
            });
    } catch (error) {
        console.error('babygenerator error:', error);
        return new ResponseModal()
            .setStatus('error')
            .setStatusCode(500)
            .setMessage('Server error');
    }
}
module.exports = {
    babyGenerator
}