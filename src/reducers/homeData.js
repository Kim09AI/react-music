import { createReducer } from '../utils/reactUtil'
import * as types from '../actions/actionTypes'

const initialState = {
    banners: [],
    personalized: []
}

const homeData = createReducer(initialState, {
    [types.GET_HOME_DATA](state, action) {
        return {
            ...state,
            ...action.response
        }
    }
})

export default homeData