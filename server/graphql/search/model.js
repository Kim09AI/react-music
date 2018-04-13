import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLID,
    GraphQLBoolean
} from 'graphql'

const Artist = new GraphQLObjectType({
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
        albumSize: {
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
        transNames: {
            type: new GraphQLList(GraphQLString)
        }
    }
})

const Album = new GraphQLObjectType({
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
        }
    }
})

const Song = new GraphQLObjectType({
    name: 'Songs',
    fields: {
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        artists: {
            type: new GraphQLList(Artist)
        },
        album: {
            type: Album
        },
        duration: {
            type: GraphQLFloat
        },
        copyrightId: {
            type: GraphQLID
        },
        status: {
            type: GraphQLInt
        },
        rtype: {
            type: GraphQLInt
        },
        ftype: {
            type: GraphQLInt
        },
        mvid: {
            type: GraphQLID
        },
        fee: {
            type: GraphQLInt
        }
    }
})

const Mv = new GraphQLObjectType({
    name: 'Mv',
    fields: {
        "id": {
            type: GraphQLID
        }, 
        "cover": {
            type: GraphQLString
        }, 
        "name": {
            type: GraphQLString
        }, 
        "playCount": {
            type: GraphQLInt
        }, 
        "briefDesc": {
            type: GraphQLString
        }, 
        "desc": {
            type: GraphQLString
        }, 
        "artistName": {
            type: GraphQLString
        }, 
        "artistId": {
            type: GraphQLID
        }, 
        "duration": {
            type: GraphQLFloat
        }, 
        "mark": {
            type: GraphQLInt
        }, 
        "subed": {
            type: GraphQLBoolean
        }, 
        "artists": {
            type: new GraphQLList(Artist)
        }
    }
})

export const Songs = new GraphQLList(Song)

export const Albums = new GraphQLList(Album)

export const Artists = new GraphQLList(Artist)

export const Mvs = new GraphQLList(Mv)