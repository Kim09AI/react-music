import * as types from './actionTypes'
import axios from '../utils/axios'

const searchTypeQuery = {
    1: `... on SongResult {
        count: songCount
        list: songs {
            id
            name
            artists {
                name
                img1v1Url
            }
            album {
                name
                picUrl
                size
            }
            duration
            fee
        }
    }`,
    1004: `... on MvResult {
        count: mvCount
        list: mvs {
            id
            cover
            name
            playCount
            artistName
            duration
        }
    }`,
    10: `... on AlbumResult {
        count: albumCount
        list: albums {
            id
            name
            publishTime
            size
            picUrl
            type
            artist {
                name
            }
            alias
        }
    }`,
    100: `... on ArtistResult {
        count: artistCount
        list: artists {
            id
            name
            picUrl
            albumSize
            img1v1Url
            followed
            trans
            alia
        }
    }`,
    1000: `... on PlayListResult {
        count: playlistCount
        list: playlists {
            name
            playCount
            trackCount
            id
            coverImgUrl
            creator {
                nickname
            }
        }
    }`,
    1009: `... on RadioResult {
        count: djRadiosCount
        list: djRadios {
            id
            name
            picUrl
            dj {
                nickname
            }
        }
    }`
}

export const search = ({ keywords, limit = 20, offset = 0, type = 1 }) => ({
    types: {
        successType: types.SEARCH
    },
    callAPI: () => axios.get('/graphql', {
        params: {
            query: `query {
                searchResult(keywords: "${keywords}", limit: ${limit}, offset: ${offset}, type: ${type}) {
                    ${searchTypeQuery[type]}
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