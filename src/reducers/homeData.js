import { createReducer } from '../utils/reactUtil'
import * as types from '../actions/actionTypes'

const homeData = createReducer({}, {
    [types.GET_HOME_DATA](state, action) {
        return {
            ...state,
            ...action.response
        }
    }
})

export default homeData