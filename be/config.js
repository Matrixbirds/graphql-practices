const base = {
    dialect: 'postgres',
    database: process.env.SEQ_DB || 'graphql_blog_development_js',
    username: process.env.SEQ_DB_USER || 'graphql_blog_development_js',
    password: process.env.SEQ_DB_PASSWORD || 'graphql_blog_development_js',
    host: process.env.SEQ_HOST || '127.0.0.1',
    port: process.env.SEQ_PORT || 5432,
    protocol: 'postgres',
    pool: {
        max: process.env.SEQ_POOL_MAX || 5,
        idle: process.env.SEQ_POOL_IDLE || 30000
    }
};

const test = Object.assign({
    database: 'graphql_blog_test_js',
    username: 'graphql_blog_test_js',
    password: 'graphql_blog_test_js',
}, base);

module.exports = {
    development: base,
    test: test
};
