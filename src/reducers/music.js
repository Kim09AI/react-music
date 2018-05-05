import { createReducer } from '../utils/reactUtil'
import * as types from '../actions/actionTypes'
import storage from 'good-storage'
import { distinctList } from '../utils'

const MUSIC_KEY = 'musicKey'

const _music = storage.get(MUSIC_KEY, {
    originList: [],
    mode: ''
})

const musicDistinctList = (state, action) => distinctList(state.originList, action.music, item => item.id === action.music.id)

const getCurrentList = ({ originList, mode }) => {
    if (mode === '') {
        return originList
    }
}

const initialState = {
    originList: _music.originList,
    currentList: getCurrentList(_music),
    mode: _music.mode,
    currentIndex: 0,
    showPlay: false
}

const music = createReducer(initialState, {
    [types.ADD_MUSIC](state, action) {
        let originList = [action.music].concat(musicDistinctList(state, action))
        
        _music.originList = originList
        storage.set(MUSIC_KEY, _music)

        return {
            ...state,
            originList,
            currentList: [action.music].concat(musicDistinctList(state, action)),
            currentIndex: 0,
            showPlay: true
        }
    },
    [types.REMOVE_MUSIC](state, action) {
        let originList = musicDistinctList(state, action)

        _music.originList = originList
        storage.set(MUSIC_KEY, _music)

        let index = state.currentList.findIndex(item => item.id === action.music.id)
        let currentIndex = state.currentIndex

        if (index < currentIndex) {
            currentIndex--
        }

        return {
            ...state,
            originList,
            currentList: musicDistinctList(state, action),
            currentIndex
        }
    },
    [types.PREV_MUSIC](state, action) {
        let currentIndex = state.currentIndex - 1
        if (currentIndex === -1) {
            currentIndex = state.currentList.length - 1
        }

        return {
            ...state,
            currentIndex
        }
    },
    [types.NEXT_MUSIC](state, action) {
        let len = state.currentList.length
        let currentIndex = state.currentIndex + 1

        if (currentIndex === len) {
            if (action.isAuto) {
                return state
            } else {
                currentIndex = 0
            }
        }

        return {
            ...state,
            currentIndex
        }
    },
    [types.SWITCH_MUSIC](state, action) {
        let index = state.currentList.findIndex(item => item.id === action.id)
        if (index === -1) {
            return state
        }

        return {
            ...state,
            currentIndex: index
        }
    }
})

export default music