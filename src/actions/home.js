import * as types from './actionTypes'
import api from 'api'

export const getHomeData = () => ({
    types: {
        successType: types.GET_HOME_DATA
    },
    shouldCallAPI: state => Object.keys(state.homeData.banners).length === 0,
    callAPI: () => api.getHomeData()
})