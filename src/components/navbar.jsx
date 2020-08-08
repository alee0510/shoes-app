import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar } from '@material-ui/core'

// import styles
import '../styles/navbar.css'

// import assets and component
import { LOGO } from '../assets'
import ProfileButton from '../components/profileButton'
import CartButton from '../components/cartButton'

class Navbar extends React.Component {
    render () {
        return (
            <AppBar position="fixed" id="navbar-container" elevation={0}>
                <Toolbar id="navbar-toolbar">
                    <div className="left-content">
                        <img src={LOGO} alt='logo' id="logo" height='100%'/>
                        <Link to='/' className="link">
                            <h1 id="home">Home</h1>
                        </Link>
                    </div>
                    <div className="right-content">
                        <div className="cart">
                            <CartButton/>
                            <h6 className="cart-total">
                                { 
                                    this.props.cart.length === 0 ?
                                    'Rp 0, 00' :
                                    'Rp ' + this.props.cart.map(item => item.total).reduce((a, b) => a + b) + ',00'
                                }
                            </h6>
                        </div>
                        <ProfileButton/>
                    </div>
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStore = ({user}) => {
    return {
        cart : user.cart
    }
}

export default connect(mapStore)(Navbar)