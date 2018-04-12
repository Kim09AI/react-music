import { combineReducers } from 'redux'
import homeData from './homeData'
import slidebarState from './slidebar'

export default combineReducers({
    homeData,
    slidebarState
})