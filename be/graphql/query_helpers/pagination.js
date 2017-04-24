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
            currentPage: { type: GraphQLInt },
            totalPage: { type: GraphQLInt },
            totalCount: { type: GraphQLInt }
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
                meta: { type: PageInfo }
            })
        })
    );

    const Paginate = (itemType, model) => ({
        type: Page(itemType),
        args: {
            page: { type: GraphQLInt },
            per: { type: GraphQLInt },
        },
        async resolve (root, {page, per}, context) {
            const user = await context.currentUser;
            console.log('currentUser', user);
            page = Math.max(page-1, 0);
            if ( per <=0 ) per = 5;
            return model.findAndCountAll({
                offset: +page, limit: +per
            }).then(_records => (_records))
        }
    });

    return Paginate;
}
