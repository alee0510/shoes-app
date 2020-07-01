import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    AppBar,
    Toolbar
} from '@material-ui/core'

import { LOGO } from '../assets'
import ProfileButton from '../components/profileButton'
import CartButton from '../components/cartButton'

class Navbar extends React.Component {
    render () {
        return (
            <AppBar position="fixed" style={styles.root} elevation={0}>
                <Toolbar style={styles.toolbar}>
                    <div style={styles.leftContent}>
                        <img src={LOGO} alt='logo' height='100%'/>
                        <Link to='/' style={styles.link}>
                            <h1 style={styles.home}>Home</h1>
                        </Link>
                    </div>
                    <div style={styles.rightContent}>
                        <div style={styles.cart}>
                            <CartButton/>
                            <h6 style={styles.cartTotal}>
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

const styles = {
    root : {
        backgroundColor : 'rgba(30, 39, 46, 0.3)',
        backdropFilter : 'blur(20px)',
        height : 90,
        width : '100%',
        padding : '2% 7%',
        display : 'flex',
        justifyContent : 'center'
    },
    toolbar : {
        display : 'flex',
        justifyContent : 'space-between',
        padding : 0
    },
    leftContent : {
        height : '100%',
        flexBasis : '50%',
        maxWidth : '50%',
        display : 'flex',
        justifyContent : 'flex-start',
        alignItems : 'center'
    },
    home : {
        fontSize : 20,
        cursor : 'pointer',
        color : 'white'
    },
    rightContent : {
        height : '100%',
        flexBasis : '50%',
        display : 'flex',
        justifyContent : 'flex-end',
        alignItems : 'center'
    },
    cart : {
        height : '100%',
        display : 'flex',
        alignItems : 'center',
        marginRight : 15
    },
    cartTotal : {
        fontSize : 16,
        marginLeft : 15
    },
    link : {
        textDecoration : 'none',
        paddingLeft : '3%',
    }
}

const mapStore = ({user}) => {
    return {
        cart : user.cart
    }
}

export default connect(mapStore)(Navbar)