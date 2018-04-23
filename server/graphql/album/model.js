import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLID,
    GraphQLBoolean
} from 'graphql'
import { Artist } from '../artist/model'

export const Album = new GraphQLObjectType({
    name: 'Album',
    fields: {
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        artist: {
            type: Artist
        },
        publishTime: {
            type: GraphQLFloat
        },
        size: {
            type: GraphQLInt
        },
        copyrightId: {
            type: GraphQLID
        },
        status: {
            type: GraphQLInt
        },
        picId: {
            type: GraphQLID
        },
        picUrl: {
            type: GraphQLString
        },
        blurPicUrl: {
            type: GraphQLString
        },
        description: {
            type: GraphQLString
        },
        subType: {
            type: GraphQLString
        },
        type: {
            type: GraphQLString
        },
        alias: {
            type: new GraphQLList(GraphQLString)
        },
        info: {
            type: new GraphQLObjectType({
                name: 'Info',
                fields: {
                    liked: {
                        type: GraphQLBoolean
                    },
                    resourceType: {
                        type: GraphQLInt
                    },
                    commentCount: {
                        type: GraphQLInt
                    },
                    likedCount: {
                        type: GraphQLInt
                    },
                    shareCount: {
                        type: GraphQLInt
                    }
                }
            })
        }
    }
})

export const Albums = new GraphQLList(Album)
