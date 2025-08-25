const ResponseModal = require('../../../handler/http/ResponseModal');
const authDao = require('./dao');
const ageJourney = async function (userid, uploadimage, selectAge, genraterImg, transactionId) {
    try {
        const validGenraterImg = await authDao.validForGenrater(userid);
        if (!validGenraterImg || validGenraterImg.rowCount === 0) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(404)
                .setMessage('User not found');
        }

        const userCredit = validGenraterImg.rows[0].credit;
        if (userCredit < 10) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(403)
                .setMessage('Not enough credits');
        }

        const result = await authDao.ageJourney_insert(userid, uploadimage, selectAge, genraterImg, transactionId);
        if (!result || result.rowCount === 0) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(400)
                .setMessage('Insert failed');
        }
        const descriptionTrans = 'Age Journey';
        const transactionEntry = await authDao.transaction_insert(userid, descriptionTrans, -10);
        if (!transactionEntry || transactionEntry.rowCount === 0) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(400)
                .setMessage('transaction failed');
        }
        const totalCredits = await authDao.totalCredits(userid);
        if (!totalCredits || totalCredits.rowCount === 0) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(400)
                .setMessage('credits fetch failed');
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