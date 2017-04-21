const databaseConfig = {
    dialect: 'postgres',
    database: 'graphql_blog_development_js',
    username: 'graphql_blog_development_js',
    password: 'graphql_blog_development_js',
    host: '127.0.0.1',
    port: 5432,
    protocol: 'postgres',
    pool: {
        max: 5,
        idle: 30000
    }
};
//
//const test = Object.assign({
//    database: 'graphql_blog_test_js',
//    username: 'graphql_blog_test_js',
//    password: 'graphql_blog_test_js',
//}, base);
//
//module.exports = {
//    development: base,
//    test: test
//};
//
// TODO: move env to file

const APP_ENV = {
    NODE_ENV: 'development',
    APP_HOST: '',
    PORT: 3000,
    APP_SECRET_KEY: '',
};

Object.assign(APP_ENV, {
    databaseConfig: databaseConfig
});


const nconf = require('nconf');

nconf
//    .file({
//        file: 'config.yml',
//        format: require('nconf-yaml'),
//    })
    .env()
    .defaults(APP_ENV);

module.exports = nconf;
