import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { Badge, IconButton, Menu, MenuItem } from '@material-ui/core'

// import icons
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

// import styles
import '../styles/cartButton.css'

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
                    id="icon-button"
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
                            <MenuItem id="menu-item-info">
                                <h1 id="menu-item-title">Cart is empty</h1>
                            </MenuItem>
                        </div>
                        :
                        <div>
                            {
                                this.props.cart.map((item, index) => (
                                    <MenuItem key={index} id="menu-item">
                                        <div style={{backgroundImage : `url(${item.image})`}} className="image-content"></div>
                                        <div className="info-container">
                                            <h5>{item.product}</h5>
                                            <h5>Rp. {item.price}, 00</h5>
                                            <h5>qty : {item.qty}</h5>
                                        </div>
                                    </MenuItem>
                                ))
                            }
                            <Link to='/cart' className="link" onClick={this.handleClose}>
                                <MenuItem id="menu-item-info">
                                    <h1 id="menu-item-title">Go To Cart</h1>
                                </MenuItem>
                            </Link>
                        </div>
                    }
                </Menu>
            </div>
        )
    }
}

const mapStore = ({user}) => {
    return {
        cart : user.cart
    }
}

export default connect(mapStore)(CartButton)