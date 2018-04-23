import {
    GraphQLID
} from 'graphql'
import { PlayList } from './model'
import api from '../../api'

const playList = {
    type: PlayList,
    args: {
        id: {
            type: GraphQLID
        }
    },
    async resolve(root, args) {
        try {
            let res = await api.getPlayListDetail(args.id)
            return res.result
        } catch (e) {
            console.log(e)
        }
    }
}

export default playList