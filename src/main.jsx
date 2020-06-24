import React from 'react'

// import components
import Navbar from './components/navbar'
import Carousel from './components/carousel'

class Main extends React.Component {
    render () {
        return (
            <div>
                <Navbar/>
                <Carousel/>
            </div>
        )
    }
}

export default Main