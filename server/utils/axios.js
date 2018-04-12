import axios from 'axios'
import config from '../config'

const host = process.env.HOST || config.host
const port = process.env.PORT || config.port

// axios.defaults.headers.common['origin'] = `http://${host}:${port}`
axios.defaults.baseURL = 'http://localhost:8080'

axios.interceptors.response.use(res => {
    return res && res.data
}, err => {
    return Promise.reject(err)
})

export default axios