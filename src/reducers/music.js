import { createReducer } from '../utils/reactUtil'
import * as types from '../actions/actionTypes'
import storage from 'good-storage'
import watcher from 'utils/watcher'
import { distinctList, shuffle } from '../utils'

const MUSIC_KEY = 'MUSIC_KEY'

const _music = storage.get(MUSIC_KEY, {
    originList: [],
    mode: 'order', // random order loop
})

// 剔除已经存在的歌曲
const musicDistinctList = (state, action) => distinctList(state.originList, item => item.id === action.music.id)

const getCurrentList = ({ originList, mode }) => {
    if (mode === 'random') {
        return shuffle(originList)
    }

    return originList
}

const initialState = {
    originList: _music.originList,
    currentList: getCurrentList(_music),
    mode: _music.mode,
    currentIndex: 0,
    showPlay: !!_music.originList.length
}

const music = createReducer(initialState, {
    [types.ADD_MUSIC](state, action) {
        let originList = [action.music].concat(musicDistinctList(state, action))
        
        _music.originList = originList
        storage.set(MUSIC_KEY, _music)

        watcher.emit('addMusic', action.music.id)

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
        let index = state.currentIndex - 1
        if (index === -1) {
            index = state.currentList.length - 1
        }

        return {
            ...state,
            currentIndex: index
        }
    },
    [types.NEXT_MUSIC](state, action) {
        let len = state.currentList.length
        let index = state.currentIndex + 1

        if (index === len) {
            if (action.isAuto) {
                return state
            } else {
                index = 0
            }
        }

        return {
            ...state,
            currentIndex: index
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
    },
    [types.TOGGLE_MODE](state, action) {
        let { mode, originList, currentList, currentIndex } = state
        if (mode === 'order') {
            mode = 'random'
        } else if (mode === 'random') {
            mode = 'loop'
        } else {
            mode = 'order'
        }

        // 设置当前歌曲在切换模式后的index
        let currentMusic = currentList[currentIndex]
        currentList = getCurrentList({ mode, originList })
        currentIndex = currentList.findIndex(item => item.id === currentMusic.id)

        _music.mode = mode
        storage.set(MUSIC_KEY, _music)

        return {
            ...state,
            currentList,
            currentIndex,
            mode
        }
    },
    [types.REMOVE_ALL_MUSIC](state, action) {
        _music.originList = []
        storage.set(MUSIC_KEY, _music)

        return {
            ...state,
            originList: [],
            currentList: [],
            currentIndex: 0,
            showPlay: false
        }
    }
})

export default music