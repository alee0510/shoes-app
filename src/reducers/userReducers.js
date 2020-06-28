import { LOG_IN, LOG_OUT } from '../actions/helper'

const INITIAL_STATE = {
    id : null,
    username : null,
    email : null,
    role : null,
    cart : []
}

export const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case LOG_IN : 
            return { 
                ...state, 
                id : action.payload.id,
                username : action.payload.username, 
                email : action.payload.email,
                role : action.payload.role,
                cart : action.payload.cart
            }
        case LOG_OUT :
            return INITIAL_STATE
        default : 
            return state
    }
}