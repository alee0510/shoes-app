import React from 'react'
import { Route } from 'react-router-dom'

// import components
import Navbar from './components/navbar'


// import pages
import Home from './pages/home'

class Main extends React.Component {
    render () {
        return (
            <div>
                <Navbar/>
                <Route path="/" component={Home} exact/>
            </div>
        )
    }
}

export default Main