'use strict';

const graphql = require('graphql');
const { __meta__ } =
    require('../../../utils').module({
        format: '.interface.js',
        deps: [graphql, require('../scalars')],
        dir: require('path').resolve(__dirname, '.')
    });

const Interfaces = {};
Object.assign(Interfaces, __meta__);
module.exports = Interfaces;
