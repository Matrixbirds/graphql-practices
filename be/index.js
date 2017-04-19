const setProps = require('../utils').setProps;
const DBConfig = require('./config')[process.env.NODE_ENV || 'development'];

const deps = {
    'DBConfig': DBConfig,
};

setProps(exports, deps);
setProps(exports, require('./models'));

if (require.main === module) {
    const Koa = require('koa');
    const KoaRouter = require('koa-router');
    const KoaBody = require('koa-bodyparser');
    const graphqlKoa = require('graphql-server-koa').graphqlKoa;

    const app = new Koa();
    const router = new KoaRouter();
    const PORT = process.env.APP_PORT || 3000;

    const myGraphQLSchema = '{ hello }';
    router.post('/graphql', graphqlKoa({ schema: myGraphQLSchema }));
    router.get('/graphql', graphqlKoa({ schema: myGraphQLSchema }));

    app.use(router.routes());
    app.use(router.allowedMethods());
    app.listen(PORT);
}
