import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLID,
    GraphQLBoolean
} from 'graphql'
import { User } from '../user/model'
import { Song } from '../song/model'

const Comment = new GraphQLObjectType({
    name: 'Comment',
    fields: {
        commentId: {
            type: GraphQLID
        },
        programId: {
            type: GraphQLID
        },
        content: {
            type: GraphQLString
        },
        programName: {
            type: GraphQLString
        },
        userProfile: {
            type: User
        }
    }
})

export const Radio = new GraphQLObjectType({
    name: 'Radio',
    fields: {
        id: {
            type: GraphQLID
        },
        dj: {
            type: User
        },
        name: {
            type: GraphQLString
        },
        picUrl: {
            type: GraphQLString
        },
        desc: {
            type: GraphQLString
        },
        commentDatas: {
            type: new GraphQLList(Comment)
        },
        subCount: {
            type: GraphQLInt
        },
        programCount: {
            type: GraphQLInt
        },
        createTime: {
            type: GraphQLFloat
        },
        categoryId: {
            type: GraphQLID
        },
        category: {
            type: GraphQLString
        },
        radioFeeType: {
            type: GraphQLInt
        },
        feeScope: {
            type: GraphQLInt
        },
        buyed: {
            type: GraphQLBoolean
        },
        purchaseCount: {
            type: GraphQLInt
        },
        price: {
            type: GraphQLFloat
        },
        originalPrice: {
            type: GraphQLFloat
        },
        lastProgramCreateTime: {
            type: GraphQLFloat
        },
        lastProgramName: {
            type: GraphQLString
        },
        lastProgramId: {
            type: GraphQLID
        },
        picId: {
            type: GraphQLID
        },
        shareCount: {
            type: GraphQLInt
        },
        likedCount: {
            type: GraphQLInt
        },
        alg: {
            type: GraphQLString
        },
        commentCount: {
            type: GraphQLInt
        },
        rcmdtext: {
            type: GraphQLString
        }
    }
})

export const Radios = new GraphQLList(Radio)

const RadioProgram = new GraphQLObjectType({
    name: 'RadioPrograms',
    fields: {
        "mainSong": {
            type: Song
        }, 
        "dj": {
            type: User
        }, 
        "blurCoverUrl": {
            type: GraphQLString
        }, 
        "radio": {
            type: Radio
        }, 
        "duration": {
            type: GraphQLInt
        }, 
        "buyed": {
            type: GraphQLBoolean
        }, 
        "canReward": {
            type: GraphQLBoolean
        }, 
        "isPublish": {
            type: GraphQLBoolean
        }, 
        "serialNum": {
            type: GraphQLInt
        }, 
        "createTime": {
            type: GraphQLFloat
        }, 
        "listenerCount": {
            type: GraphQLInt
        }, 
        "subscribedCount": {
            type: GraphQLInt
        }, 
        "reward": {
            type: GraphQLBoolean
        }, 
        "feeScope": {
            type: GraphQLInt
        }, 
        "pubStatus": {
            type: GraphQLInt
        }, 
        "bdAuditStatus": {
            type: GraphQLInt
        }, 
        "coverUrl": {
            type: GraphQLString
        }, 
        "mainTrackId": {
            type: GraphQLID
        }, 
        "programFeeType": {
            type: GraphQLInt
        }, 
        "description": {
            type: GraphQLString
        }, 
        "trackCount": {
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
        "subscribed": {
            type: GraphQLBoolean
        }, 
        "likedCount": {
            type: GraphQLInt
        }, 
        "commentCount": {
            type: GraphQLInt
        }
    }
})

export const RadioPrograms = new GraphQLList(RadioProgram)