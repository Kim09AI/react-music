import {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType
} from 'graphql'

const Lyric = new GraphQLObjectType({
    name: 'Lyric',
    fields: {
        lyric: {
            type: GraphQLString
        },
        version: {
            type: GraphQLInt
        }
    }
})

export const Lyrics = new GraphQLObjectType({
    name: 'Lyrics',
    fields: {
        klyric: {
            type: Lyric
        },
        lrc: {
            type: Lyric
        },
        tlyric: {
            type: Lyric
        }
    }
})