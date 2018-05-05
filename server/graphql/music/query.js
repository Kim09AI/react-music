import {
    GraphQLID
} from 'graphql'
import api from '../../api'
import { Music } from './model'

const music = {
    type: Music,
    args: {
        id: {
            type: GraphQLID
        }
    },
    async resolve(root, args) {
        try {
            let res = await api.getMusicUrl(args.id)
            return res.data[0]
        } catch (e) {
            console.log(e)
        }
    }
}

export default music