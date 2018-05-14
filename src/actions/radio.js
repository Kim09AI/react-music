import * as types from './actionTypes'
import api from 'api'

export const getRadio = () => ({
    types: {
        successType: types.GET_RADIO
    },
    shouldCallAPI: state => Object.keys(state.radio.radioRecommends).length === 0,
    callAPI: () => api.getRadio()
})
