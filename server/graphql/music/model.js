import {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType,
    GraphQLID,
    GraphQLFloat
} from 'graphql'

export const Music = new GraphQLObjectType({
    name: 'Music',
    fields: {
        "url": {
            type: GraphQLString
        },
        "type": {
            type: GraphQLString
        },
        "size": {
            type: GraphQLInt
        },
        "id": {
            type: GraphQLID
        },
        "payed": {
            type: GraphQLInt
        },
        "fee": {
            type: GraphQLInt
        },
        "br": {
            type: GraphQLInt
        }, 
        "fid": {
            type: GraphQLID
        }, 
        "vd": {
            type: GraphQLFloat
        },
        "name": {
            type: GraphQLString
        }, 
        "extension": {
            type: GraphQLString
        }, 
        "sr": {
            type: GraphQLInt
        }, 
        "dfsId": {
            type: GraphQLID
        }, 
        "bitrate": {
            type: GraphQLInt
        }, 
        "playTime": {
            type: GraphQLInt
        }, 
        "volumeDelta": {
            type: GraphQLFloat
        }
    }
})
