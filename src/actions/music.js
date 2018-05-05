import * as types from './actionTypes'

export const addMusic = music => ({
    type: types.ADD_MUSIC,
    music
})

export const removeMusic = music => ({
    type: types.REMOVE_MUSIC,
    music
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