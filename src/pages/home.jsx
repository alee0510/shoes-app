import React from 'react'

// import component
import Carousel from '../components/carousel'

class Home extends React.Component {
    render () {
        return (
            <div style={styles.root}>
                <Carousel/>
            </div>
        )
    }
}

const styles = {
    root : {}
}

export default Home