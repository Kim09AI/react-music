import { createReducer } from '../utils/reactUtil'
import * as types from '../actions/actionTypes'

const slidebarState = createReducer(false, {
    [types.SET_SLIDEBAR_STATE](state, action) {
        return action.slidebarState
    }
})

export default slidebarState