import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean,
    GraphQLFloat
} from 'graphql'
import { Artist } from '../artist/model'

export const Mv = new GraphQLObjectType({
    name: 'Mv',
    fields: {
        id: {
            type: GraphQLID
        },
        cover: {
            type: GraphQLString
        },
        name: {
            type: GraphQLString
        },
        playCount: {
            type: GraphQLInt
        },
        briefDesc: {
            type: GraphQLString
        },
        desc: {
            type: GraphQLString
        },
        artistName: {
            type: GraphQLString
        },
        artistId: {
            type: GraphQLID
        },
        duration: {
            type: GraphQLFloat
        },
        mark: {
            type: GraphQLInt
        },
        subed: {
            type: GraphQLBoolean
        },
        artists: {
            type: new GraphQLList(Artist)
        }
    }
})

export const Mvs = new GraphQLList(Mv)