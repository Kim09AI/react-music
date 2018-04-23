import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLUnionType
} from 'graphql'
import { Radios } from '../radio/model'
import { PlayLists } from '../playList/model'
import { Albums } from '../album/model'
import { Artists } from '../artist/model'
import { Mvs } from '../mv/model'
import { Songs } from '../song/model'

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
    resolveType(value) {
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
