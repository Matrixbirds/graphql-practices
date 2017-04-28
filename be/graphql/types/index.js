'use strict';

const graphql = require('graphql');
const models = require('../../models');
const scalars = require('../scalars');

const { __meta__ } =
    require('../../../utils').module({
        format: '.type.js',
        deps: [graphql, models, scalars],
        dir: require('path').resolve(__dirname, '.')
    });

const Types = {};
Object.assign(Types, __meta__);

function Query ({
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLInt
}, {
    User
}) {
    const { definePaginateType, defineEntityType } = require('../query_helpers');

    const MeType = __meta__.MeType.default;

    return new GraphQLObjectType({
        name: 'BlogSchema',
        description: 'Root of the Blog Schema',
        fields: () => ({
            //users: definePaginateType(Types.UserType.query, User),
            me: {
                type: MeType,
                async resolve(_0, _1, {currentUser}) {
                    const _user = await currentUser;
                    if (!_user) throw Error('you property need login');
                    return _user;
                }
            },
//            comments: definePaginateType(Types.CommentType.query, Models.Comment),
//            user: defineEntityType(Types.UserType.query, Models.User),
//            comment: defineEntityType(Types.CommentType.query, Models.Comment),
        })
    });
};

Types['Query'] = Query(graphql, models);
module.exports = Types;

