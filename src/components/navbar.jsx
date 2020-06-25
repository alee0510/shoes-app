import React from 'react'
import {
    AppBar,
    Toolbar,
    Avatar
} from '@material-ui/core'

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import { LOGO } from '../assets'
import Profile from '../components/profile'

class Navbar extends React.Component {
    render () {
        return (
            <AppBar position="fixed" style={styles.root} elevation={0}>
                <Toolbar style={styles.toolbar}>
                    <div style={styles.leftContent}>
                        <img src={LOGO} alt='logo' height='100%'/>
                        <h1 style={styles.home}>Home</h1>
                    </div>
                    <div style={styles.rightContent}>
                        <div style={styles.cart}>
                            <ShoppingCartIcon/>
                            <h6 style={styles.cartTotal}>Rp. 0</h6>
                        </div>
                        <Profile/>
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
        paddingLeft : '3%',
        fontSize : 20,
        cursor : 'pointer'
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
    }
}

export default Navbar