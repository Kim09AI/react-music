import {
    GraphQLObjectType,
    GraphQLID
} from 'graphql'
import { Album } from './model'
import { Songs } from '../song/model'
import api from '../../api'

const AlbumDetail = new GraphQLObjectType({
    name: 'AlbumDetail',
    fields: {
        album: {
            type: Album
        },
        songs: {
            type: Songs
        }
    }
})

const albumDetail = {
    type: AlbumDetail,
    args: {
        id: {
            type: GraphQLID
        }
    },
    async resolve(root, args) {
        try {
            let res = await api.getAlbumDetail(args.id)
            return {
                songs: res.songs,
                album: res.album
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export default albumDetail