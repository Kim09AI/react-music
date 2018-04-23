import {
    GraphQLInt,
    GraphQLID
} from 'graphql'
import { Radio, Radios, RadioPrograms } from './model'
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

const radioDetail = {
    type: Radio,
    args: {
        rid: {
            type: GraphQLID
        }
    },
    async resolve(root, args) {
        try {
            let res = await api.getRadioDetail(args.rid)
            return res.djRadio
        } catch (e) {
            console.log(e)
        }
    }
}

const radioPrograms = {
    type: RadioPrograms,
    args: {
        rid: {
            type: GraphQLID
        }
    },
    async resolve(root, args) {
        try {
            let res = await api.getRadioProgram(args.rid)
            return res.programs
        } catch (e) {
            console.log(e)
        }
    }
}

export default {
    radioRecommends,
    radioRecommendType,
    radioDetail,
    radioPrograms
}