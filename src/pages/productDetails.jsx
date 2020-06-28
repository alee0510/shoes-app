import React from 'react'
import Axios from 'axios'
import Slider from 'react-slick'
import { Button, IconButton, Paper } from '@material-ui/core'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'

import { URL } from '../actions/helper'
import '../styles/details.css'

import Alert from '../components/alert'

class ProductDeatils extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            product : {},
            stock : null,
            clicked : null,
            total : 0,
            alert : [false, ""]
        }
    }

    componentDidMount () {
        Axios.get(URL + `/products${this.props.location.search}`)
        .then(res => {
            // console.log(res.data)
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

    handleAddToCart = () => {
        const { total, stock } = this.state

        // check quantity total
        if (total === 0 || stock === null) return this.setState({alert : [true, "Please choose size that you want and give a total quantity."]})

        // check quantity and stock
        if (total > stock) return this.setState({alert : [true, "Product stock doesn\'t enough."]})

        //  give confirmation
        this.setState({alert : [true, "Click Ok to confirm."]})
    }

    handleOk = () => {
        // console.log("handle ok")
        this.setState({alert : [false, '']})
    }

    render () {
        const { product, stock, clicked, total, alert } = this.state
        // console.log(stock)

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
                <a href="#">
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
                    <Paper style={styles.leftContent} elevation={3}>
                        <Slider {...settings} style={styles.slider}>
                            {this.renderDetails(product.images || [])}
                        </Slider>
                    </Paper>
                    <div style={styles.rightContent}>
                        <h1 style={styles.info}>{product.category}</h1>
                        <h1 style={styles.info}>Brand : {product.brand}</h1>
                        <h1 style={styles.info}>Color : {product.colour}</h1>
                        <h1 style={styles.info}>Description : </h1>
                        <h1 style={styles.description}>{product.description}</h1>
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
                                        onClick={ _ => this.setState({stock : item.total, clicked : index})}
                                    >{item.code}</Button>
                                ))
                            }
                        </div>
                        <h5 style={styles.stcokInfo}>{stock !== null ? `* stock < ${stock}` : ''}</h5>
                        <div style={styles.total}>
                            <Button 
                                variant="contained" 
                                style={styles.totalButton} 
                                onClick={ _ => this.setState({total : total-1})}
                                disabled={total <= 0 ? true : false}
                            >
                                -
                            </Button>
                            <h1 style={styles.totalInfo}>{total}</h1>
                            <Button 
                                variant="contained" 
                                style={styles.totalButton} 
                                onClick={ _ => this.setState({total : total+1})}
                            >
                                +
                            </Button>
                        </div>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            startIcon={<ShoppingCartIcon/>}
                            style={styles.addToCart}
                            onClick={this.handleAddToCart}
                        >
                            Add to Cart
                        </Button>
                    </div>
                </Paper>
                <Alert 
                    open={alert[0]} 
                    title={`⚠ ${alert[1]}`}
                    handleClose={ _ => this.setState({alert : [false, '']})}
                    handleOk={this.handleOk}
                />
            </div>
        )
    }
}

const styles = {
    root : {
        height : 'auto',
        width : '100%',
        backgroundColor : '#f2f2f2',
        padding : '90px 10%',
    },
    title : {
        fontWeight : 'bold',
        fontSize : 32,
        margin : '2% 0px'
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
        padding : '4%',
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
        fontSize : 17,
        fontWeight : 700,
        marginBottom : '3%'
    },
    description : {
        fontSize : 14,
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
    },
    total : {
        display : 'flex',
        alignItems : 'center',
        marginTop : '3%'
    },
    totalButton : {
        height : 50,
        width : 40,
        backgroundColor : 'white',
        fontSize : 32
    },
    totalInfo : {
        margin : '0px 5%'
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