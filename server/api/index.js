import axios from '../utils/axios'

class Server {
    getBanner() {
        return axios.get('/banner')
    }

    getPersonalized() {
        return axios.get('/personalized')
    }
}

export default new Server()