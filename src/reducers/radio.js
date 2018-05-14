import { createReducer } from '../utils/reactUtil'
import * as types from '../actions/actionTypes'

const initialState = {
    radioRecommends: [],
    radioRecommendType: [],
    radioDetail: {},
    radioPrograms: []
}

const radio = createReducer(initialState, {
    [types.GET_RADIO](state, action) {
        return {
            ...state,
            ...action.response
        }
    }
})

export default radio