import axios from '../utils/axios'

class Server {
    getBanner() {
        return axios.get('/banner')
    }

    getPersonalized() {
        return axios.get('/personalized')
    }

    search({ keywords, limit = 30, offset = 0, type = 1 }) {
        return axios.get('/search', {
            params: {
                keywords,
                limit,
                offset,
                type
            }
        })
    }

    searchSuggest({ keywords, limit = 30, offset = 0, type = 1 }) {
        return axios.get('/search/suggest', {
            params: {
                keywords,
                limit,
                offset,
                type
            }
        })
    }

    getRadioRecommend() {
        return axios.get('/dj/recommend')
    }

    getRadioRecommendType(type = 1) {
        return axios.get('/dj/recommend/type', {
            params: {
                type
            }
        })
    }

    getPlayListDetail(id) {
        return axios.get('/playlist/detail', {
            params: {
                id
            }
        })
    }

    getAlbumDetail(id) {
        return axios.get('/album', {
            params: {
                id
            }
        })
    }

    getArtistDetail(id) {
        return axios.get('/artists', {
            params: {
                id
            }
        })
    }

    getRadioDetail(rid) {
        return axios.get('/dj/detail', {
            params: {
                rid
            }
        })
    }

    getRadioProgram(rid, limit = 60) {
        return axios.get('/dj/program', {
            params: {
                rid,
                limit
            }
        })
    }

    getMusicUrl(id) {
        return axios.get('/music/url', {
            params: {
                id
            }
        })
    }
}

export default new Server()