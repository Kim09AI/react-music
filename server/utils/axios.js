import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080'

axios.interceptors.response.use(res => {
    return res && res.data
}, err => {
    return Promise.reject(err)
})

export default axios