import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat
} from 'graphql'

export const Personalized = new GraphQLList(new GraphQLObjectType({
    name: 'Personalized',
    fields: {
        "id": {
            type: GraphQLInt
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