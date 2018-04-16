import * as types from './actionTypes'
import axios from '../utils/axios'

export const search = ({ keywords, limit = 20, offset = 0, type = 1 }) => ({
    types: {
        successType: types.SEARCH
    },
    callAPI: () => axios.get('/graphql', {
        params: {
            query: `query {
                searchResult(keywords: "${keywords}", limit: ${limit}, offset: ${offset}, type: ${type}) {
                    id
                    name
                    artists {
                        name
                        img1v1Url
                    }
                    album {
                        name
                        picId
                        size
                    }
                    duration
                    mvid
                    rtype
                    ftype
                }
            }`
        }
    })
})

export const getSearchSuggest = ({ keywords, limit = 20, offset = 0, type = 1 }) => ({
    types: {
        successType: types.GET_SEARCH_SUGGEST
    },
    callAPI: () => axios.get('/graphql', {
        params: {
            query: `query {
                searchSuggest(keywords: "${keywords}", limit: ${limit}, offset: ${offset}, type: ${type}) {
                    songs {
                        id
                        name
                        artists {
                            ...artistFields
                        }
                        album {
                            ...albumFields
                        }
                        duration
                        mvid
                        rtype
                        ftype
                    }
                    albums {
                        ...albumFields
                    }
                    artists{
                        ...artistFields
                    }
                    mvs {
                        desc
                        playCount
                        id
                        cover
                        name
                        duration
                        artists {
                            ...artistFields
                        }
                    }
                }
            }

            fragment artistFields on Artist {
                id
                name
                albumSize
                picUrl
                transNames
            }

            fragment albumFields on Album {
                id
                name
                picId
                artist {
                    ...artistFields
                }
                publishTime
                size
            }`
        }
    })
})

export const addSearchHistory = (keywords) => ({
    type: types.ADD_SEARCH_HISTORY,
    keywords
})

export const rmSearchHistory = (keywords) => ({
    type: types.RM_SEARCH_HISTORY,
    keywords
})