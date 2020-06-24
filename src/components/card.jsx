import React from 'react'
import Axios from 'axios'

class ProductCard extends React.Component {
    constructor (props) {
        super (props) 
        this.state = {
            products : []
        }
    }

    componentDidMount () {
        Axios.get('http://localhost:2000/products')
        .then(res => {
            this.setState({products : res.data})
        })
        .catch(err => console.log(err))
    }

    render () {
        console.log(this.state.products)
        return (
            <div>

            </div>
        )
    }
}

export default ProductCard