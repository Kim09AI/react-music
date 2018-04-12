import { Banners } from './model'
import api from '../../api'

const banners = {
    type: Banners,
    async resolve() {
        try {
            let res = await api.getBanner()
            return res.banners
        } catch (e) {
            console.log(e)
        }
    } 
}

export default banners