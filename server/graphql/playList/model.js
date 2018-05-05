import {
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLList
} from 'graphql'
import { User } from '../user/model'
import { Artists } from '../artist/model'
import { Album } from '../album/model'
import { Music } from '../music/model'

const Track = new GraphQLObjectType({
    name: 'Track',
    fields: {
        "name": {
            type: GraphQLString
        }, 
        "id": {
            type: GraphQLID
        }, 
        "position": {
            type: GraphQLInt
        }, 
        "status": {
            type: GraphQLInt
        }, 
        "fee": {
            type: GraphQLInt
        }, 
        "artists": {
            type: Artists
        }, 
        "album": {
            type: Album
        }, 
        "starred": {
            type: GraphQLBoolean
        }, 
        "popularity": {
            type: GraphQLInt
        }, 
        "score": {
            type: GraphQLInt
        }, 
        "starredNum": {
            type: GraphQLInt
        }, 
        "duration": {
            type: GraphQLInt
        }, 
        "playedNum": {
            type: GraphQLInt
        }, 
        "dayPlays": {
            type: GraphQLInt
        }, 
        "hearTime": {
            type: GraphQLInt
        }, 
        "ftype": {
            type: GraphQLInt
        }, 
        "copyright": {
            type: GraphQLInt
        }, 
        "rtype": {
            type: GraphQLInt
        }, 
        "mvid": {
            type: GraphQLID
        }, 
        "bMusic": {
            type: Music
        }, 
        "hMusic": {
            type: Music
        }, 
        "mMusic": {
            type: Music
        }, 
        "lMusic": {
            type: Music
        }
    }
})

export const PlayList = new GraphQLObjectType({
    name: 'PlayList',
    fields: {
        "subscribed": {
            type: GraphQLBoolean
        }, 
        "creator": {
            type: User
        },
        "bookCount": {
            type: GraphQLInt
        },
        "alg": {
            type: GraphQLString
        }, 
        "artists": {
            type: Artists
        },
        "tracks": {
            type: new GraphQLList(Track)
        },
        "status": {
            type: GraphQLInt
        }, 
        "playCount": {
            type: GraphQLInt
        }, 
        "trackCount": {
            type: GraphQLInt
        }, 
        "trackUpdateTime": {
            type: GraphQLFloat
        }, 
        "totalDuration": {
            type: GraphQLInt
        }, 
        "highQuality": {
            type: GraphQLBoolean
        }, 
        "anonimous": {
            type: GraphQLBoolean
        }, 
        "coverImgId": {
            type: GraphQLID
        }, 
        "createTime": {
            type: GraphQLFloat
        }, 
        "updateTime": {
            type: GraphQLFloat
        }, 
        "specialType": {
            type: GraphQLInt
        }, 
        "userId": {
            type: GraphQLID
        }, 
        "commentThreadId": {
            type: GraphQLString
        }, 
        "coverImgUrl": {
            type: GraphQLString
        }, 
        "privacy": {
            type: GraphQLInt
        }, 
        "newImported": {
            type: GraphQLBoolean
        }, 
        "description": {
            type: GraphQLString
        }, 
        "ordered": {
            type: GraphQLBoolean
        }, 
        "adType": {
            type: GraphQLInt
        }, 
        "trackNumberUpdateTime": {
            type: GraphQLFloat
        }, 
        "subscribedCount": {
            type: GraphQLInt
        }, 
        "cloudTrackCount": {
            type: GraphQLInt
        }, 
        "name": {
            type: GraphQLString
        }, 
        "id": {
            type: GraphQLID
        }, 
        "shareCount": {
            type: GraphQLInt
        }, 
        "coverImgId_str": {
            type: GraphQLString
        }, 
        "commentCount": {
            type: GraphQLInt
        }
    }
})

export const PlayLists = new GraphQLList(PlayList)