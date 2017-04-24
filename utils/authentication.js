'use strict';

const {User} = require('../be/models');

function authToken({authorization = ''}) {
    const token = authorization.split('Basic ')[1];
    if (token) {
        return User.findByJwt(token);
    } else //throw new Error("Token Cannot be Empty");
        return false;
};

const GraphQLSchema = require('../be/graphql');
const graphqlKoa = require('graphql-server-koa').graphqlKoa;

const GraphQLHandler = async (ctx, next) => {
    return graphqlKoa({
        schema: GraphQLSchema,
        context: {
            currentUser: authToken(ctx.request.header)
        },
    })(ctx, next);
}


module.exports = GraphQLHandler;
