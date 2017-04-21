'use strict';
function setProps(target, properties, options) {
    const opts = Object.assign({}, options);
    for (let [key, val] of Object.entries(properties)) {
        Object.defineProperty(target, key, Object.assign(opts, {
            get: function() { return val },
            enumerable: true
        }));
    }
    return target;
};

function readdirSync(path, basename) {
    const fs = require('fs');
    return fs
        .readdirSync(path)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        });
}

function inspectPrototype(obj) {
    const getClass = {}.toString;
    return getClass.call(obj);
}

function freezeRequire() {
    return Object.freeze(require(arguments[0]));
}

function camelCase(str) {
    const words = string => string.match(/\w+/g) || [];
    return words(str).reduce((result, word, index) => {
        word = word[0].toUpperCase() + word.slice(1).toLowerCase()
        return result + word
    }, '');
}

setProps(exports, {
    setProps: setProps,
    readdirSync: readdirSync,
    inspectPrototype: inspectPrototype,
    freezeRequire: freezeRequire,
    camelCase: camelCase
});


function defineMethod(target, name, fn) {
    Object.defineProperty(target, name, {
        get: () => fn,
        enumerable: true
    })
    return target;
}

const Types = {};

['Function', 'Object', 'String', 'Null', 'Undefined', 'Boolean']
    .filter(type => Types[type] = `[object ${type}]`)
    .forEach(type => defineMethod(exports, `is${type}`, object => {
        return object && inspectPrototype(object) === Types[type]
    }));

defineMethod(exports, 'isFalsy', args => {
    const Falsy= [false, 0, '', "", undefined, NaN, null];
    return Falsy.includes(args);
})

const JWT = freezeRequire('jsonwebtoken');

defineMethod(exports, 'decodeJWT', token => {
});

defineMethod(exports, 'encodeJWT', params => {
    JWT.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: token
    }, process.env.KOA_SECRET_KEY);
});
// TODO: isEmpty
/***
   defineMethod(exports, 'isEmpty', args => {

   })
***/
