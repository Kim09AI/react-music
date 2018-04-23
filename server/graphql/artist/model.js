import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLID,
    GraphQLBoolean
} from 'graphql'

export const Artist = new GraphQLObjectType({
    name: 'Artist',
    fields: {
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        picUrl: {
            type: GraphQLString
        },
        briefDesc: {
            type: GraphQLString
        },
        albumSize: {
            type: GraphQLInt
        },
        musicSize: {
            type: GraphQLInt
        },
        mvSize: {
            type: GraphQLInt
        },
        picId: {
            type: GraphQLInt
        },
        img1v1Url: {
            type: GraphQLString
        },
        img1v1: {
            type: GraphQLInt
        },
        alia: {
            type: new GraphQLList(GraphQLString)
        },
        alias: {
            type: new GraphQLList(GraphQLString) 
        },
        tns: {
            type: new GraphQLList(GraphQLString)
        },
        trans: {
            type: GraphQLString
        },
        transNames: {
            type: new GraphQLList(GraphQLString)
        },
        followed: {
            type: GraphQLBoolean
        }
    }
})

export const Artists = new GraphQLList(Artist)