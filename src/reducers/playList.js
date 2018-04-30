import { createReducer } from '../utils/reactUtil'
import * as types from '../actions/actionTypes'

const playList = createReducer({}, {
    [types.GET_PLAT_LIST](state, action) {
        return {
            ...state,
            ...action.response.playList
        }
    }
})

export default playList