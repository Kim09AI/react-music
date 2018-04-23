import {
    GraphQLObjectType,
    GraphQLID
} from 'graphql'
import { Artist } from './model'
import { Songs } from '../song/model'
import api from '../../api'

const ArtistDetail = new GraphQLObjectType({
    name: 'ArtistDetail',
    fields: {
        artist: {
            type: Artist
        },
        hotSongs: {
            type: Songs
        }
    }
})

const artistDetail = {
    type: ArtistDetail,
    args: {
        id: {
            type: GraphQLID
        }
    },
    async resolve(root, args) {
        try {
            let res = await api.getArtistDetail(args.id)
            return {
                artist: res.artist,
                hotSongs: res.hotSongs
            }
        } catch (e) {
            console.log(e)
        }
    }
}

export default artistDetail