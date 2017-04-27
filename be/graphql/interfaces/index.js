'use strict';

const graphql = require('graphql');
const path = require('path');
const basename = path.basename(module.filename);

const {importSubModule} = require('../../../utils');

const Interfaces = importSubModule(__dirname, '.interface.js')(graphql);

Interfaces.export = () => (
    require('../../../utils').module({
        format: '.interface.js',
        deps: [require('graphql')],
        dir: require('path').resolve(__dirname, '.')
    }).__meta__
)

module.exports = Interfaces;
