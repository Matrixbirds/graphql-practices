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

// TODO: move env to file

const APP_ENV = {
    NODE_ENV: 'development',
    APP_HOST: '',
    PORT: 3000,
    APP_SECRET_KEY: '9hXP2c73cOhzT5S4S1FKTCHJS7cJ65o9',
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
