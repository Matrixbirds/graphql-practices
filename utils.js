exports.setProps = function(target, iteratorableObject, options) {
    const opts = Object.assign({}, options);
    for (let [key, val] of Object.entries(iteratorableObject)) {
        Object.defineProperty(target, key, Object.assign(opts, {
            get: function() { return val },
            enumerable: true
        }));
    }
    return target;
};

exports.readdirSync = function(path, basename) {
    const fs = require('fs');
    return fs
        .readdirSync(path)
        .filter(file => {
            return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
        });
}
