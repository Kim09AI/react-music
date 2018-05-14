import * as types from './actionTypes'
import api from 'api'

export const getSearchSuggest = ({ keywords, limit, offset, type }) => ({
    types: {
        successType: types.GET_SEARCH_SUGGEST
    },
    callAPI: () => api.getSearchSuggest({ keywords, limit, offset, type })
})

export const addSearchHistory = (keywords) => ({
    type: types.ADD_SEARCH_HISTORY,
    keywords
})

export const rmSearchHistory = (keywords) => ({
    type: types.RM_SEARCH_HISTORY,
    keywords
})