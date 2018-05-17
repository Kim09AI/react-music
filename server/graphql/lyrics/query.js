import {
    GraphQLID
} from 'graphql'
import api from '../../api'
import { Lyrics } from './model'

const lyrics = {
    type: Lyrics,
    args: {
        id: {
            type: GraphQLID
        }
    },
    async resolve(root, args) {
        try {
            let res = await api.getLyric(args.id)

            return {
                klyric: res.klyric,
                lrc: res.lrc,
                tlyric: res.tlyric
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export default lyrics