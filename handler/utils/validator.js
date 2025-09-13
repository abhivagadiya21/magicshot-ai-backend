let ValidationError = require('../http/error/ValidationError')

let isRequired = function(value) {
    if(value == '' || value == undefined || value == null) {
        throw new ValidationError("input parametere is missing")
    } else {
        return value
    }
}
let isRequiredFile = function (file) {
  if (!file || file === undefined || file === null) {
    throw new ValidationError(`please upload a file`);
  } else {
    return file;
  }
};

module.exports = {
    isRequired,
    isRequiredFile
}