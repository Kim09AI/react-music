import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} from 'graphql'

export const Banners = new GraphQLList(new GraphQLObjectType({
    name: 'Banners',
    fields: {
        "pic": {
            type: GraphQLString
        }, 
        "targetId": {
            type: GraphQLInt
        }, 
        "titleColor": {
            type: GraphQLString
        }, 
        "typeTitle": {
            type: GraphQLString
        }, 
        "encodeId": {
            type: GraphQLString
        }, 
        "targetType": {
            type: GraphQLInt
        }
    }
}))