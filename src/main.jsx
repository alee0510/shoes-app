import React from 'react'

// import components
import Navbar from './components/navbar'
import Footer from './components/footer'

class Main extends React.Component {
    render () {
        return (
            <div>
                <Navbar/>
                <Footer/>
            </div>
        )
    }
}

export default Main