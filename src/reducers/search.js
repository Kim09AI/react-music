import { createReducer } from '../utils/reactUtil'
import * as types from '../actions/actionTypes'
import storage from 'good-storage'

const SEARCH_HISTORY_KEY = 'searchHistoryKey'

const initialState = {
    searchSuggest: {},
    history: storage.get(SEARCH_HISTORY_KEY, [])
}

const searchInfo = createReducer(initialState, {
    [types.GET_SEARCH_SUGGEST](state, action) {
        return {
            ...state,
            searchSuggest: action.response.searchSuggest
        }
    },
    [types.ADD_SEARCH_HISTORY](state, action) {
        let history = state.history
        let index = history.findIndex(value => value === action.keywords)

        history = [...history]
        if (index !== -1) {
            history.splice(index, 1)
        }

        history.unshift(action.keywords)

        storage.set(SEARCH_HISTORY_KEY, history)

        return {
            ...state,
            history
        }
    },
    [types.RM_SEARCH_HISTORY](state, action) {
        let history = state.history
        let index = history.findIndex(value => value === action.keywords)

        if (index === -1) {
            return state
        }

        history = [...history]
        history.splice(index, 1)

        storage.set(SEARCH_HISTORY_KEY, history)

        return {
            ...state,
            history
        }
    }
})

export default searchInfo