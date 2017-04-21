'use strict';

module.exports = function({
    GraphQLObjectType,
    GraphQLString,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList
}) {

    const {camelCase} = require('../../utils');

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

    const convertNodeToCursor = ({id}) => bota(id.toString());
    const bota = string => new Buffer(string, 'binary').toString('base64');
    const convertCursorToNode = cursor => +atob(cursor);
    const atob = string => new Buffer(string, 'base64').toString('binary');

    return {
        PageInfo: PageInfo,
        Page: Page,
        convertNodeToCursor: convertNodeToCursor,
        bota: bota,
        convertCursorToNode: convertCursorToNode,
        atob: atob,
    };
}
