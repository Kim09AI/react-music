import { GraphQLInt } from 'graphql'
import { Radios } from './model'
import api from '../../api'

const radioRecommends = {
    type: Radios,
    async resolve() {
        try {
            let res = await api.getRadioRecommend()
            return res.djRadios
        } catch (e) {
            console.log(e)
        }
    }
}

const radioRecommendType = {
    type: Radios,
    args: {
        type: {
            type: GraphQLInt
        }
    },
    async resolve(root, args) {
        try {
            let res = await api.getRadioRecommendType(args.type)
            return res.djRadios
        } catch (e) {
            console.log(e)
        }
    }
}

export default {
    radioRecommends,
    radioRecommendType
}