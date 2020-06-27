import { combineReducers } from 'redux'

// import all reducers
import { carouselReducer } from './carouselReducer'
import { userReducer } from './userReducers'

// combine all reducers
const allReducers = combineReducers({
    carousel : carouselReducer,
    user : userReducer
})

// export 
export default allReducers