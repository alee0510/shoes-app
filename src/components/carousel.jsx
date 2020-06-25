import React from 'react'
import Axios from 'axios'
import Slider from 'react-slick'
import { IconButton, Button } from '@material-ui/core'
import { Link } from "react-scroll"

import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'

class Carousel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data : []
        }
    }

    componentDidMount () {
        Axios.get('http://localhost:2000/slider')
        .then(res => {
            this.setState({data : res.data})
        })
        .catch(err => console.log(err))
    }

    carouselItems = () => {
        return this.state.data.map((item, index) => (
            <div key={index}>
                <div style={{ backgroundImage : `url(${item.image})`, ...styles.content}}>
                    <h1 style={styles.titile}>{item.title}</h1>
                    <Link to="products" smooth={true} duration={500} spy={true} offset={-50}>
                        <Button variant="outlined" style={styles.button}>Shop Now</Button>
                    </Link>
                </div>
            </div>
        ))
    }

    render () {
        console.log(this.state.data)
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: true,
            speed: 3000,
            autoplaySpeed: 4000,
            cssEase: "ease",
            appendDots : dots => (
                <div style={styles.dots}>
                    <ul>{dots}</ul>
                </div>
            ),
            nextArrow : <NextArrow/>,
            prevArrow : <PrevArrow/>
        }
        return (
            <div style={styles.root}>
                <Slider {...settings} style={styles.slider}>
                    {this.carouselItems()}
                </Slider>
            </div>
        )
    }
}

const styles = {
    root : {
        height : '100vh',
        width : '100%',
        backgroundColor : 'yellow',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },
    slider : {
        height : '100%',
        width : '100%',
        backgroundColor : 'white',
        posistion : 'relative',
    },
    dots : {
        position : 'absolute',
        height : 30,
        bottom : 0,
        zIndex : 2
    },
    next : {
        position : 'absolute',
        top : '45%',
        right : '7%',
        zIndex : 5,
        backgroundColor : 'rgba(255, 255, 255, 0.3)'
    },
    prev : {
        position : 'absolute',
        top : '45%',
        left : '7%',
        zIndex : 5,
        backgroundColor : 'rgba(255, 255, 255, 0.3)'
    },
    content : {
        backgroundColor : 'green',
        backgroundRepeat : 'no-repeat',
        backgroundSize : 'cover',
        width : '100%',
        height : '100vh',
        display : 'flex',
        flexDirection : 'column',
        alignItems : 'center',
        justifyContent : 'flex-end',
        padding : '5% 0px'
    },
    titile : {
        color : 'white',
        fontSize : 64,
        marginBottom : 20,
        textTransform : 'capitalize'
    },
    button : {
        width : 200,
        height : 50,
        borderRadius : 0,
        fontSize : 20,
        border : '4px solid white',
        color : 'white'
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

export default Carousel