import * as types from './actionTypes'

export const addMusic = music => ({
    type: types.ADD_MUSIC,
    music
})

export const removeMusic = music => ({
    type: types.REMOVE_MUSIC,
    music
})

export const removeAllMusic = () => ({
    type: types.REMOVE_ALL_MUSIC
})

export const prevMusic = () => ({
    type: types.PREV_MUSIC
})

export const nextMusic = (isAuto = false) => ({
    type: types.NEXT_MUSIC,
    isAuto
})

export const switchMusic = (id) => ({
    type: types.SWITCH_MUSIC,
    id
})

export const toggleMode = () => ({
    type: types.TOGGLE_MODE
})