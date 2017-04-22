'use strict';

const graphql = require('graphql');
module.exports = {
    definePaginateType: require('./pagination')(graphql),
    defineEntityType: require('./entity')(graphql),
};
