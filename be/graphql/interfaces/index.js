'use strict';

const graphql = require('graphql');
const path = require('path');
const basename = path.basename(module.filename);

const {importSubModule} = require('../../../utils');

const Interfaces = importSubModule(__dirname, '.interface.js')(graphql);

module.exports = Interfaces;
