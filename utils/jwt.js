'use strict';
const config = require('../be/config');

module.exports = ({ freezeRequire })=> {
    const JWT = freezeRequire('jsonwebtoken');
    const secretKey = config.get('APP_SECRET_KEY');
    return {
        decode(token) {
            return JWT.verify(token, secretKey);
        },
        encode(payload) {
            Object.assign(payload, {
                exp: Math.floor(Date.now() / 1000) + (60 * 60 * 12)
            });
            return JWT.sign(payload, secretKey);
        }
    };
};
