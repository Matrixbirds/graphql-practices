'use strict';

const {User} = require('../be/models');

function authToken({authorization = ''}) {
    const token = authorization.split('Basic ')[1];
    if (token) {
        return User.findByJwt(token);
    } else throw new Error("Token Cannot be Empty");
};

module.exports = authToken;
