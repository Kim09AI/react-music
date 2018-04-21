import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLID,
    GraphQLBoolean,
    GraphQLUnionType
} from 'graphql'
import { Radios } from '../radio/model'

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
        alia: {
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
        },
        picUrl: {
            type: GraphQLString
        },
        type: {
            type: GraphQLString
        },
        alias: {
            type: new GraphQLList(GraphQLString)
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

const PlayList = new GraphQLObjectType({
    name: 'PlayList',
    fields: {
        id: {
            type: GraphQLID
        },
        name: {
            type: GraphQLString
        },
        coverImgUrl: {
            type: GraphQLString
        },
        creator: {
            type: new GraphQLObjectType({
                name: 'Creator',
                fields: {
                    nickname: {
                        type: GraphQLString
                    },
                    userId: {
                        type: GraphQLID
                    },
                    userType: {
                        type: GraphQLInt
                    },
                    authStatus: {
                        type: GraphQLInt
                    }
                }
            })
        },
        subscribed: {
            type: GraphQLBoolean
        },
        trackCount: {
            type: GraphQLInt
        },
        userId: {
            type: GraphQLID
        },
        playCount: {
            type: GraphQLInt
        },
        bookCount: {
            type: GraphQLInt
        },
        highQuality: {
            type: GraphQLBoolean
        },
        alg: {
            type: GraphQLString
        }
    }
})

export const Songs = new GraphQLList(Song)

export const Albums = new GraphQLList(Album)

export const Artists = new GraphQLList(Artist)

export const Mvs = new GraphQLList(Mv)

export const PlayLists = new GraphQLList(PlayList)

const SongResult = new GraphQLObjectType({
    name: 'SongResult',
    fields: {
        songCount: {
            type: GraphQLInt
        },
        songs: {
            type: Songs
        }
    }
})

const AlbumResult = new GraphQLObjectType({
    name: 'AlbumResult',
    fields: {
        albumCount: {
            type: GraphQLInt
        },
        albums: {
            type: Albums
        }
    }
})

const ArtistResult = new GraphQLObjectType({
    name: 'ArtistResult',
    fields: {
        artistCount: {
            type: GraphQLInt
        },
        artists: {
            type: Artists
        }
    }
})

const MvResult = new GraphQLObjectType({
    name: 'MvResult',
    fields: {
        mvCount: {
            type: GraphQLInt
        },
        mvs: {
            type: Mvs
        }
    }
})

const RadioResult = new GraphQLObjectType({
    name: 'RadioResult',
    fields: {
        djRadiosCount: {
            type: GraphQLInt
        },
        djRadios: {
            type: Radios
        }
    }
})

const PlayListResult = new GraphQLObjectType({
    name: 'PlayListResult',
    fields: {
        playlistCount: {
            type: GraphQLInt
        },
        playlists: {
            type: PlayLists
        }
    }
})

export const SearchType = new GraphQLUnionType({
    name: 'SearchType',
    types: [SongResult, MvResult, AlbumResult, ArtistResult, PlayListResult, RadioResult],
    resolveType(value, ...args) {
        if (value.hasOwnProperty('songCount')) {
            return SongResult
        }
        if (value.hasOwnProperty('mvCount')) {
            return MvResult
        }
        if (value.hasOwnProperty('albumCount')) {
            return AlbumResult
        }
        if (value.hasOwnProperty('artistCount')) {
            return ArtistResult
        }
        if (value.hasOwnProperty('playlistCount')) {
            return PlayListResult
        }
        if (value.hasOwnProperty('djRadiosCount')) {
            return RadioResult
        }
    }
})
