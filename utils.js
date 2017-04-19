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
