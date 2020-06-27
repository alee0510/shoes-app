import { CAROUSEL } from '../actions/helper'

export const carouselReducer = (state = { data : [] }, action) => {
    switch (action.type) {
        case CAROUSEL : 
            return { ...state, data : action.payload }
        default :
            return state
    }
}