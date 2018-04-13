import { createReducer } from '../utils/reactUtil'
import * as types from '../actions/actionTypes'

const initialState = {
    searchResult: {},
    searchSuggest: {}
}

const searchInfo = createReducer(initialState, {
    [types.SEARCH](state, action) {
        return {
            ...state,
            searchResult: action.response.searchResult
        }
    },
    [types.GET_SEARCH_SUGGEST](state, action) {
        return {
            ...state,
            searchSuggest: action.response.searchSuggest
        }
    }
})

export default searchInfo