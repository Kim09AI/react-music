import * as types from './actionTypes'
import axios from '../utils/axios'

export const getHomeData = () => ({
    types: {
        successType: types.GET_HOME_DATA
    },
    callAPI: () => axios.get('/graphql', {
        params: {
            query: `query {
                banners {
                  titleColor
                  pic
                  typeTitle
                  targetId
                }
                personalized {
                    name
                    id
                    playCount
                    picUrl
                }
            }`
        }
    })
})