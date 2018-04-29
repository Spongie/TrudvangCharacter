const mongoose = require('mongoose');
const UserModel = require('../models/user');

var RequestValidator = module.exports = {};

RequestValidator.validateRequest = (request, response) => {
    let result = false;
    UserModel.findById(request.headers["authkey"], "userName password", (err, doc) => {
        if (doc === undefined || doc === null) {
            result = false;
        }
        else if (doc.userName === request.headers["userName"] && doc.password === request.headers["password"]) {
            result = true;
        }
    });

    return result;
}

module.exports = RequestValidator;