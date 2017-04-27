'use strict';
function camelCase(str) {
    const words = string => string.match(/\w+/g) || [];
    return words(`${str}`).reduce((result, word, index) => {
        word = word[0].toUpperCase() + word.slice(1).toLowerCase()
        return result + word
    }, '');
}

const fileFormat = format => (file => (file.indexOf('.') !== 0) && (file.slice(-format.length) === format));

const path = require('path');

function readdirSync(path, basename) {
    const fs = require('fs');
    return fs
        .readdirSync(path)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        });
}

function importSubModule({dir, format, deps}) {
    const filename = path.basename(module.filename);
    return readdirSync(dir, filename)
        .filter(fileFormat(format))
        .reduce((res, file) => {
            const _module = require(path.join(dir, file));
            const name = camelCase(path.basename(file).split('.js')[0]);
            res[name] = _module(...deps);
            return res;
        }, {})
}

function Module({dir, format, deps}) {
    const __dict__ = Object.seal({
        'deps': deps || [],
        'format': format || '.js',
        'dir': dir,
    });

    ['format', 'dir'].forEach((property) => {
        Object.defineProperty(this, property, {
            enumerable: false,
            get: () => (__dict__[property]),
            set: args => { Object.assign(__dict__, { [`${property}`]: args }) },
        });
    });

    Object.defineProperty(this, 'deps', {
        enumerable: false,
        get: () => (__dict__['deps']),
        set: args => {
            if (!Array.isArray(args)) throw Error("argument must be present array");
            __dict__['deps'] = args;
        }
    });

    Object.defineProperty(this, '__meta__', {
        enumerable: false,
        get: () => (importSubModule(__dict__))
    })
}

module.exports = args => (new Module(args))
