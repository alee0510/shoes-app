import React from 'react'

// import component
import Carousel from '../components/carousel'
import Cards from '../components/card'
import { Card } from '@material-ui/core'

class Home extends React.Component {
    render () {
        return (
            <div style={styles.root}>
                <Carousel/>
                <Cards/>
            </div>
        )
    }
}

const styles = {
    root : {}
}

export default Home