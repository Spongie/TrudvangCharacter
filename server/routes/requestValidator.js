const mongoose = require('mongoose');
const UserModel = require('../models/user');

var RequestValidator = module.exports = {};

RequestValidator.validateRequest = (request, response) => {
    let result = false;
    return UserModel.findById(request.headers['authkey'], 'userName password', (err, doc) => {
        if (doc === undefined || doc === null) {
            return result = false;
        }
        else if (doc.userName === request.headers['username'] && doc.password === request.headers['password']) {
            return result = true;
        }
    });
}

module.exports = RequestValidator;