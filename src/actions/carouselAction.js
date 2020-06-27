import Axios from 'axios'
import { URL, CAROUSEL } from './helper'

// get carousel data
export const getCarouselData = () => {
    return async (dispatch) => {
        try {
            const { data } = await Axios.get(URL + '/slider')
            dispatch({type : CAROUSEL, payload : data})
        } catch (err) {
            console.log(err)
        }
    }
}