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
}

export default new Server()