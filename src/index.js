import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import './styles/index.css'
import Main from './main'

// setup redux
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk'

// import all reducers
import allReducers from './reducers'

// create store
const STORE = createStore(allReducers, {}, composeWithDevTools(applyMiddleware(ReduxThunk)))


ReactDOM.render(
    <Provider store={STORE}>
        <BrowserRouter>
            <Main/>
        </BrowserRouter>
    </Provider>
    ,document.getElementById('root')
)