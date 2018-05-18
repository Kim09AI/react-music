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

const types = {
    songCount: SongResult,
    mvCount: MvResult,
    albumCount: AlbumResult,
    artistCount: ArtistResult,
    playlistCount: PlayListResult,
    djRadiosCount: RadioResult
}

export const SearchType = new GraphQLUnionType({
    name: 'SearchType',
    types: [SongResult, MvResult, AlbumResult, ArtistResult, PlayListResult, RadioResult],
    resolveType(value) {
        let ret
        
        Object.keys(types).some(key => {
            if (value.hasOwnProperty(key)) {
                ret = types[key]
                return true
            }
        })

        return ret
    }
})
