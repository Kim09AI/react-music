import {
    GraphQLInt,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLFloat,
    GraphQLBoolean
} from 'graphql'

export const User = new GraphQLObjectType({
    name: 'User',
    fields: {
        "nickname": {
            type: GraphQLString
        },
        "userId": {
            type: GraphQLID
        },
        "userType": {
            type: GraphQLInt
        },
        "authStatus": {
            type: GraphQLInt
        },
        "defaultAvatar": {
            type: GraphQLBoolean
        }, 
        "accountStatus": {
            type: GraphQLInt
        }, 
        "description": {
            type: GraphQLString
        }, 
        "detailDescription": {
            type: GraphQLString
        }, 
        "avatarImgId": {
            type: GraphQLID
        }, 
        "backgroundImgId": {
            type: GraphQLID
        }, 
        "rewardCount": {
            type: GraphQLInt
        },
        "authority": {
            type: GraphQLInt
        }, 
        "mutual": {
            type: GraphQLBoolean
        }, 
        "vipType": {
            type: GraphQLInt
        }, 
        "province": {
            type: GraphQLInt
        },
        "followed": {
            type: GraphQLBoolean
        },
        "avatarUrl": {
            type: GraphQLString
        },
        "gender": {
            type: GraphQLInt
        },
        "city": {
            type: GraphQLInt
        },
        "birthday": {
            type: GraphQLFloat
        },
        "signature": {
            type: GraphQLString
        },
        "backgroundUrl": {
            type: GraphQLString
        },
        "djStatus": {
            type: GraphQLInt
        }
    }
})