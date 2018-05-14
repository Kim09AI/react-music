import axios from 'utils/axios'

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

class Service {
    search({ keywords, limit = 20, offset = 0, type = 1 }) {
        return axios.get('/', {
            params: {
                query: `query {
                    searchResult(keywords: "${keywords}", limit: ${limit}, offset: ${offset}, type: ${type}) {
                        ${searchTypeQuery[type]}
                    }
                }`
            }
        })
    }

    getSearchSuggest({ keywords, limit = 20, offset = 0, type = 1 }) {
        return axios.get('/', {
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
    }

    getHomeData() {
        return axios.get('/', {
            params: {
                query: `query {
                    banners {
                      titleColor
                      pic
                      typeTitle
                      targetId
                    }
                    personalized {
                        name
                        id
                        playCount
                        picUrl
                    }
                }`
            }
        })
    }

    getPlayList(id) {
        return axios.get('/', {
            params: {
                query: `query {
                    playList(id: ${id}) {
                        subscribedCount
                        commentCount
                        shareCount
                        name
                        playCount
                        id
                        coverImgUrl
                        trackCount
                        creator {
                            nickname
                            avatarUrl
                        }
                        tracks {
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
                        }
                    }
                }`
            }
        })
    }

    getRadio() {
        return axios.get('/', {
            params: {
                query: `query {
                    radioRecommends {
                      ...radio
                    }
                    radioRecommendType(type: 1) {
                        ...radio
                    }
                }
                  
                fragment radio on Radio {
                    id
                    name
                    rcmdtext
                    picUrl
                }`
            }
        })
    }

    getRadioDetail(rid) {
        return axios.get('/', {
            params: {
                query: `query {
                    radioDetail(rid: ${rid}) {
                        name
                        id
                        subCount
                        desc
                        category
                        commentDatas {
                            commentId
                            content
                            programName
                            userProfile {
                                nickname
                                avatarUrl
                            }
                        }
                        dj {
                            nickname
                            rewardCount
                            description
                            avatarUrl
                        }
                        picUrl
                        programCount
                    }
                    radioPrograms(rid: ${rid}) {
                        commentCount
                        name
                        createTime
                        id
                        duration
                        listenerCount
                        serialNum
                    }
                }`
            }
        })
    }

    getMusic(id) {
        return axios.get('/', {
            params: {
                query: `query {
                    music(id: ${id}) {
                        id
                        url
                    }
                }`
            }
        })
    }
}

export default new Service()