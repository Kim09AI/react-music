import {
    GraphQLObjectType,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLID,
    GraphQLBoolean
} from 'graphql'

const Dj = new GraphQLObjectType({
    name: 'Dj',
    fields: {
        province: {
            type: GraphQLInt
        },
        followed: {
            type: GraphQLBoolean
        },
        avatarUrl: {
            type: GraphQLString
        },
        gender: {
            type: GraphQLInt
        },
        city: {
            type: GraphQLInt
        },
        birthday: {
            type: GraphQLFloat
        },
        userId: {
            type: GraphQLID
        },
        nickname: {
            type: GraphQLString
        },
        signature: {
            type: GraphQLString
        },
        backgroundUrl: {
            type: GraphQLString
        },
        djStatus: {
            type: GraphQLInt
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
            type: Dj
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