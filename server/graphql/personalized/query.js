import { Personalized } from './model'
import api from '../../api'

const personalized = {
    type: Personalized,
    async resolve() {
        try {
            let res = await api.getPersonalized()
            return res.result
        } catch (e) {
            console.log(e)
        }
    }
}

export default personalized