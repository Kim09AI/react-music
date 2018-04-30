import * as types from './actionTypes'
import axios from 'axios';

export const getPlayList = (id) => ({
    types: {
        successType: types.GET_PLAT_LIST
    },
    callAPI: () => axios.get('/graphql', {
        params: {
            query: `query {
                playList(id: ${id}) {
                    subscribedCount
                    commentCount
                    shareCount
                    name
                    playCount
                    id
                    coverImgUrl
                    trackCount
                    creator {
                        nickname
                        avatarUrl
                    }
                    tracks {
                        id
                        name
                        artists {
                            name
                            img1v1Url
                        }
                        album {
                            name
                            picUrl
                            size
                        }
                        duration
                    }
                }
            }`
        }
    })
})