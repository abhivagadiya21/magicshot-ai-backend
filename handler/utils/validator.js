let ValidationError = require('../http/error/ValidationError')

let isRequired = function(value) {
    if(value == '' || value == undefined || value == null) {
        throw new ValidationError("input parametere is missing")
    } else {
        return value
    }
}

module.exports = {
    isRequired
}