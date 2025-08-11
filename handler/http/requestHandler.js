var ValidationError = require('./error/ValidationError')

var requestHandler = async function (req, res, controllerFunction) {
    // process.on('uncaughtException', (error) => {
    //     errorHandler(res, error)
    // })
    // process.on('unhandledRejection', (reason, promise) => {
    //     errorHandler(res, reason)
    // });
    try {
        let reponseofControllerFunction = await controllerFunction(req)
        res.status(reponseofControllerFunction.getStatusCode()).json(reponseofControllerFunction.getBody())
    } catch (error) {
        errorHandler(res, error)
    }
}

var errorHandler = async function (res, error) {
    console.log("in Error", error)
    if(error instanceof ValidationError){
        res.status(400).json({
            status: "error",
            message: error.message
        })
    } else {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

module.exports = {
    requestHandler
}