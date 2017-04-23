const {setProps, authToken} = require('../utils');
const config = require('./config');

const GraphQLSchema = require('./graphql');

const Koa = require('koa');
const KoaRouter = require('koa-router');
const KoaBody = require('koa-bodyparser');
const graphqlKoa = require('graphql-server-koa').graphqlKoa;

const app = new Koa();
require('koa-trace')(app);
if (process.env.NODE_ENV !== 'production') app.debug();
const router = new KoaRouter();
const PORT = config.get('PORT');

const crypto = require('crypto');
app.use(async (ctx, next) => {
    ctx.id = crypto.randomBytes(12);
    ctx.trace('start');
    await next();
    ctx.trace('finish');
})

app.use(KoaBody());

const GraphQLHandlerWithAuth = async (ctx, next) => {
    return graphqlKoa({
        schema: GraphQLSchema,
        context: {
            currentUser: authToken(ctx.request.header)
        },
    })(ctx, next);
}

router.post('/graphql', GraphQLHandlerWithAuth);
router.get('/graphql', GraphQLHandlerWithAuth);

app.use(router.routes());
app.use(router.allowedMethods());

if (require.main === module) {
    app.listen(PORT);
} else {
    setProps(exports, {
        config: config,
        app: app
    });
    setProps(exports, require('./models'));
}
