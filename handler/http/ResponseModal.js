class ResponseModal {
    constructor(){
        this.statusCode = 200
        this.status = "success"
        this.data = ""
        this.message = undefined
    }

    setStatusCode = function (statusCode) {
        this.statusCode = statusCode
        return this
    }

    getStatusCode = function () {
        return this.statusCode
    }

    setStatus = function (status) {
        status == "success" ? this.status = "success" : this.status = "error"
        return this
    }

    setData = function (data) {
        this.data = data
        return this
    }

    setMessage = function (message) {
        this.message = message
        return this
    }

    getBody = function () {
        let reponseData = {
            status: this.status,
            message: this.message,
            data: this.data
        }
        return reponseData
    }
    
}

module.exports = ResponseModal