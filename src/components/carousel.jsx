import React from 'react'
import { connect } from 'react-redux'
import { IconButton, Button } from '@material-ui/core'
import { Link } from "react-scroll"
import Slider from 'react-slick'

// import icons
import NavigateNextIcon from '@material-ui/icons/NavigateNext'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'

// import styles
import '../styles/carousel.css'

// import actions
import { getCarouselData } from '../actions'

class Carousel extends React.Component {
    componentDidMount () {
        this.props.getCarouselData()
    }

    carouselItems = () => {
        return this.props.data.map((item, index) => (
            <div key={index}>
                <div style={{ backgroundImage : `url(${item.image})`}} className="content">
                    <div className="overlay"></div>
                    <h1 className="title">{item.title}</h1>
                    <Link to="products" smooth={true} duration={1000} spy={true} offset={-50}>
                        <Button variant="outlined" id="button">Shop Now</Button>
                    </Link>
                </div>
            </div>
        ))
    }

    render () {
        return (
            <div className="carousel-container">
                <Slider {...settings} className="slider">
                    {this.carouselItems()}
                </Slider>
            </div>
        )
    }
}

const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 4000,
    cssEase: "ease",
    appendDots : dots => (
        <div id="dots">
            <ul>{dots}</ul>
        </div>
    ),
    nextArrow : <NextArrow/>,
    prevArrow : <PrevArrow/>,
    dotsClass : "custom_dot"
}

function NextArrow (props) {
    const { onClick } = props
    return (
        <IconButton id="next" onClick = {onClick}>
            <NavigateNextIcon/>
        </IconButton>
    )
}

function PrevArrow (props) {
    const { onClick } = props
    return (
        <IconButton id="prev" onClick = {onClick}>
            <NavigateBeforeIcon/>
        </IconButton>
    )
}

const mapStore = ({ carousel }) => {
    return {
        data : carousel.data
    }
}

export default connect(mapStore, { getCarouselData })(Carousel)