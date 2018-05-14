import axios from 'axios'

axios.defaults.baseURL = '/graphql'

axios.interceptors.response.use(res => {
    return res && res.data
}, err => {
    return Promise.reject(err)
})

export default axios