import React from 'react'
import Axios from 'axios'
import Slider from 'react-slick'
import { Button, IconButton, Paper } from '@material-ui/core'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'

import { URL } from '../actions/helper'
import '../styles/details.css'

class ProductDeatils extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            product : {},
            stock : null,
            clicked : null
        }
    }

    componentDidMount () {
        Axios.get(URL + `/products${this.props.location.search}`)
        .then(res => {
            console.log(res.data)
            this.setState({product : res.data[0]})
        })
        .catch(err => console.log(err))
    }

    renderDetails = (images) => {
        // console.log(images)
        return images.map((item, index) => (
            <div key={index}>
                <div style={{backgroundImage : `url(${item})`, ...styles.content}}></div>
            </div>
        ))
    }

    render () {
        const { product, stock, clicked } = this.state
        console.log(stock)

        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            appendDots : dots => (
                <div><ul style={styles.ul}>{dots}</ul></div>
            ),
            customPaging : i => (
                <a>
                    <img src={product.images[i]} alt='details' height='100%'/>
                </a>
            ),
            dotsClass: "slick-dots",
            nextArrow : <NextArrow/>,
            prevArrow : <PrevArrow/>
        }

        return (
            <div style={styles.root}>
                <h1 style={styles.title}>{product.name}</h1>
                <Paper style={styles.container} elevation={1}>
                    <Paper style={styles.leftContent} elevation={0}>
                        <Slider {...settings} style={styles.slider}>
                            {this.renderDetails(product.images || [])}
                        </Slider>
                    </Paper>
                    <div style={styles.rightContent}>
                        <h1 style={styles.info}>{product.category}</h1>
                        <h1 style={styles.info}>Brand : {product.brand}</h1>
                        <h1 style={styles.info}>Color : {product.colour}</h1>
                        <h1 style={styles.info}>Description : {product.description}</h1>
                        <div>
                            <h1 style={styles.info}>Size : </h1>
                            {
                                (product.stock || []).map((item, index) => (
                                    <Button 
                                        key={index} 
                                        variant="outlined" 
                                        style={{
                                            backgroundColor : index === clicked ? '#130f40' : '',
                                            ...styles.stock, 
                                            color : index === clicked ? 'white' : '#130f40'
                                        }}
                                        onClick={() => this.setState({stock : item.total, clicked : index})}
                                    >{item.code}</Button>
                                ))
                            }
                        </div>
                        <h5 style={styles.stcokInfo}>{stock !== null ? `* stock < ${stock}` : ''}</h5>
                        <div>
                            <Button>+</Button>
                            <h1>0</h1>
                            <Button>-</Button>
                        </div>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            startIcon={<ShoppingCartIcon/>}
                            style={styles.addToCart}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </Paper>
            </div>
        )
    }
}

const styles = {
    root : {
        height : 'auto',
        width : '100%',
        backgroundColor : '#f2f2f2',
        padding : '7% 10% 3% 10%',
    },
    title : {
        fontWeight : 'bold',
        fontSize : 32,
        marginBottom : '1%'
    },
    container : {
        height : 'auto',
        width : '100%',
        display : 'flex',
        alignItems : 'center'
    },
    leftContent : {
        flexBasis : '50%',
        maxWidth : '50%',
        height : '100%'
    },
    rightContent : {
        flexBasis : '50%',
        height : '70vh',
        backgroundColor : 'yellow',
        padding : '3%',
        display : 'flex',
        flexDirection : 'column',
        position : 'relative'
    },
    slider : {
        height : '70vh',
        width : '100%',
        position : 'relative'
    },
    ul : {
        backgroundColor : 'white', 
        height : '100%',
        width : '100%',
        display : 'flex',
        alignItems : 'center',
        padding : '1.5%'
    },
    content : {
        backgroundRepeat : 'no-repeat',
        backgroundSize : '100% auto',
        backgroundPosition : 'center',
        width : '100%', 
        height : '55vh',
    },
    next : {
        position : 'absolute',
        bottom : '8%',
        right : '2%',
        zIndex : 5,
        backgroundColor : 'rgba(255, 255, 255, 0.1)',
        color : '#130f40'
    },
    prev : {
        position : 'absolute',
        bottom : '8%',
        left : '2%',
        zIndex : 5,
        backgroundColor : 'rgba(255, 255, 255, 0.1)',
        color : '#130f40'
    },
    info : {
        fontSize : 18,
        fontWeight : 700,
        marginBottom : '4%'
    },
    stock : {
        margin : '0% 2% 5% 0px',
        padding : '2%',
        border : '2px solid #130f40',
        borderRadius : 0,
        fontWeigth : 'bold'
    },
    addToCart : {
        width : '50%',
        borderRadius : 0,
        padding : '2% 0px',
        backgroundColor : '#130f40',
        alignSelf : 'flex-end',
        position : 'absolute',
        bottom : '5%'
    },
    stcokInfo : {
        fontSize : 14,
        color : '#EA2027'
    }
}

function NextArrow (props) {
    const { onClick } = props
    return (
        <IconButton style={styles.next} onClick = {onClick}>
            <NavigateNextIcon/>
        </IconButton>
    )
}

function PrevArrow (props) {
    const { onClick } = props
    return (
        <IconButton style={styles.prev} onClick = {onClick}>
            <NavigateBeforeIcon/>
        </IconButton>
    )
}

export default ProductDeatils