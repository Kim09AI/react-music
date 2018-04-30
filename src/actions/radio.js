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

export const getRadioDetail = (rid) => ({
    types: {
        successType: types.GET_RADIO_DETAIL
    },
    callAPI: () => axios.get('/graphql', {
        params: {
            query: `query {
                radioDetail(rid: ${rid}) {
                    name
                    id
                    subCount
                    desc
                    category
                    commentDatas {
                        commentId
                        content
                        programName
                        userProfile {
                            nickname
                            avatarUrl
                        }
                    }
                    dj {
                        nickname
                        rewardCount
                        description
                        avatarUrl
                    }
                    picUrl
                    programCount
                }
                radioPrograms(rid: ${rid}) {
                    commentCount
                    name
                    createTime
                    id
                    duration
                    listenerCount
                    serialNum
                }
            }`
        }
    })
})