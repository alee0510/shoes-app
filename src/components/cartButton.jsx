import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    Badge,
    IconButton,
    Menu,
    MenuItem,
    Button
} from '@material-ui/core'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

class CartButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            anchorEl : null
        }
    }

    handleClick = (e) => {
        this.setState({anchorEl : e.currentTarget})
    }

    handleClose = () => {
        this.setState({anchorEl : null})
    }

    render () {
        const { anchorEl } = this.state
        console.log(this.props.cart)
        return (
            <div>
                <IconButton 
                    style={styles.button} 
                    aria-controls="simple-menu" 
                    aria-haspopup="true"
                    onClick={(e) => this.handleClick(e)}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    >
                    <Badge badgeContent={this.props.cart.length} color="primary">
                        <ShoppingCartIcon/>
                    </Badge>
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                    style={{
                        top :  '7%',
                        left : this.props.cart.length !== 0 ? '-7%' : '-2.5%'
                    }}
                >
                    {
                        this.props.cart.length === 0 ?
                        <div>
                            <MenuItem style={styles.menuItemInfo}>
                                <h1 style={styles.menuItemH1}>Cart is empty</h1>
                            </MenuItem>
                        </div>
                        :
                        <div>
                            {
                                this.props.cart.map((item, index) => (
                                    <MenuItem key={index} style={styles.menuItem}>
                                        <div style={{backgroundImage : `url(${item.image})`, ...styles.contentImage}}></div>
                                        <div style={styles.infoContainer}>
                                            <h5>{item.product}</h5>
                                            <h5>Rp. {item.price}, 00</h5>
                                            <h5>qty : {item.qty}</h5>
                                        </div>
                                    </MenuItem>
                                ))
                            }
                            <Link to='/cart' style={styles.link} onClick={this.handleClose}>
                                <MenuItem style={styles.menuItemInfo}>
                                    <h1 style={styles.menuItemH1}>Go To Cart</h1>
                                </MenuItem>
                            </Link>
                        </div>
                    }
                </Menu>
            </div>
        )
    }
}

const styles = {
    button : {
        color : 'white'
    },
    menuItem : {
        display : 'flex',
        alignItem : 'center'
    },
    menuItemInfo : {
        display : 'flex',
        alignItem : 'center',
        justifyContent : 'center'
    },
    menuItemH1 : {
        fontSize : 16,
        color : '#130f40'
    },
    contentImage : {
        width : '70px',
        height : '70px',
        backgroundRepeat : 'no-repeat',
        backgroundSize : 'cover'
    },
    info : {
        fontSize : 16
    },
    infoContainer : {
        marginLeft : 15
    },
    link : {
        textDecoration : 'none',
    },
}

const mapStore = ({user}) => {
    return {
        cart : user.cart
    }
}

export default connect(mapStore)(CartButton)