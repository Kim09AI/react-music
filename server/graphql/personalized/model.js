import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLID
} from 'graphql'

export const Personalized = new GraphQLList(new GraphQLObjectType({
    name: 'Personalized',
    fields: {
        "id": {
            type: GraphQLID
        }, 
        "type": {
            type: GraphQLInt
        }, 
        "name": {
            type: GraphQLString
        }, 
        "copywriter": {
            type: GraphQLString
        }, 
        "picUrl": {
            type: GraphQLString
        }, 
        "canDislike": {
            type: GraphQLBoolean
        }, 
        "playCount": {
            type: GraphQLFloat
        },
        "trackCount": {
            type: GraphQLInt
        }, 
        "highQuality": {
            type: GraphQLBoolean
        }, 
        "alg": {
            type: GraphQLString
        }
    }
}))