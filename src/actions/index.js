import * as types from './actionTypes'

export const setSlidebarState = (state) => ({
    type: types.SET_SLIDEBAR_STATE,
    slidebarState: state
})