import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import './styles/index.css'
import Main from './main'

ReactDOM.render(
    <BrowserRouter>
        <Main/>
    </BrowserRouter>
    ,document.getElementById('root')
)