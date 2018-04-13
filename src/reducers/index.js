import { combineReducers } from 'redux'
import homeData from './homeData'
import slidebarState from './slidebar'
import search from './search'

export default combineReducers({
    homeData,
    slidebarState,
    search
})