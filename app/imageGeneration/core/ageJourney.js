const ResponseModal = require('../../../handler/http/ResponseModal');
const authDao = require('./dao');
const ageJourney = async function (userid, uploadimage, selectAge, genraterImg, transactionId) {
    try {
        const result = await authDao.ageJourney_insert(userid, uploadimage, selectAge, genraterImg, transactionId);
        if (!result || result.rowCount === 0) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(400)
                .setMessage('Insert failed');
        }
        const fileUrl = `/ageJourney_upload/${genraterImg}`;
        return new ResponseModal()
            .setStatus('success')
            .setStatusCode(200)
            .setMessage('age journy change saved')
            .setData({
                file: genraterImg,
                fileUrl
            });
    } catch (error) {
        console.error('agejourney error:', error);
        return new ResponseModal()
            .setStatus('error')
            .setStatusCode(500)
            .setMessage('Server error');
    }
}
module.exports = {
    ageJourney
}