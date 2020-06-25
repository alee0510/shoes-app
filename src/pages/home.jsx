import React from 'react'

// import component
import Carousel from '../components/carousel'
import Products from '../components/products'
import FloatingButton from '../components/floatingButton'

class Home extends React.Component {
    render () {
        return (
            <div>
                <Carousel/>
                <Products/>
                <FloatingButton/>
            </div>
        )
    }
}


export default Home