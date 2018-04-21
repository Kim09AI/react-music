import * as types from './actionTypes'
import axios from '../utils/axios'

export const getRadio = () => ({
    types: {
        successType: types.GET_RADIO
    },
    callAPI: () => axios.get('/graphql', {
        params: {
            query: `query {
                radioRecommends {
                  ...radio
                }
                radioRecommendType(type: 1) {
                    ...radio
                }
            }
              
            fragment radio on Radio {
                id
                name
                rcmdtext
                picUrl
            }`
        }
    })
})