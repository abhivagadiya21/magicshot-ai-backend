const ResponseModal = require('../../../handler/http/ResponseModal');
const authDao = require('./dao');
const babyGenerator = async function (userid, parent1, parent2, gender, genraterImg, transactionId) {
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
        
        const result = await authDao.babygenerator_insert(userid, parent1, parent2, gender, genraterImg, transactionId);
        if (!result || result.rowCount === 0) {
            return new ResponseModal()
                .setStatus('error')
                .setStatusCode(400)
                .setMessage('Insert failed');
        }
        const descriptionTrans = 'Baby Generator';
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