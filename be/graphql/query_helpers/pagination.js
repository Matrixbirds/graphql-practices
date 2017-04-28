'use strict';

module.exports = function({
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList
}) {

    const {camelCase} = require('../../../utils');

    const PageInfo = new GraphQLObjectType({
        name: "PageInfo",
        description: 'Information about current page',
        fields: () => ({
            current_page: { type: GraphQLInt },
            current_count: { type: GraphQLInt },
            total_page: { type: GraphQLInt },
            total_count: { type: GraphQLInt }
        })
    });

    const Page = itemType => (
        new GraphQLObjectType({
            name: `Paginate${camelCase(itemType)}`,
            description: `Paginate${camelCase(itemType)}`,
            fields: () => ({
                data: {
                    type: new GraphQLList(itemType),
                    resolve: object => {
                        return object.rows;
                    }
                },
                meta: {
                    type: PageInfo,
                    resolve: ({meta})=> {
                        return meta;
                    }
                }
            })
        })
    );

    const Paginate = (itemType, model, auth) => ({
        type: Page(itemType),
        args: {
            page: { type: GraphQLInt },
            per: { type: GraphQLInt },
        },
        async resolve (root, {page, per}, context) {
            const conditions = {
                offset: Math.max(page-1, 0),
                limit: (per <= 0) ? 5 : per,
            };
            if (auth) {
                const user = await context.currentUser;
                if (!user) throw Error('User not found Property You need signUp');
                Object.assign(conditions, {where: {user_id: user.id}});
            }
            return model.findAndCountAll(conditions).then(_records => {
                let total_page = ((_records.rows.length > 0) ? Math.ceil(_records.count / _records.rows.length) : 0);
                _records.meta = { current_page: Math.max(page, 1), current_count: _records.rows.length, total_count: _records.count, total_page: total_page}
                return _records;
            })
        }
    });

    return Paginate;
}
