import React from 'react'
import { Card } from '@material-ui/core'

// import component
import Carousel from '../components/carousel'
import Cards from '../components/card'
import FloatingButton from '../components/floatingButton'

class Home extends React.Component {
    render () {
        return (
            <div style={styles.root}>
                <Carousel/>
                <Cards/>
                <FloatingButton/>
            </div>
        )
    }
}

const styles = {
    root : {}
}

export default Home