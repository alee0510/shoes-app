import React from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
} from '@material-ui/core'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'

import { shopLogo2 } from '../assets'
import Profile from './profileMenu'

class Navbar extends React.Component {
    render () {
        return (
            <AppBar position="fixed" style={styles.root} elevation={0}>
                <Toolbar style={styles.toolbar}>
                    <div style={styles.logo}>
                        <img src={shopLogo2} alt='logo' height='100%'/>
                        <ul style={styles.ul}>
                            <li style={styles.list}>Home</li>
                            <li style={styles.list}>Category</li>
                        </ul>
                    </div>
                    <div style={styles.rightMenu}>
                        <div style={styles.cartIcon}>
                            <ShoppingCartIcon/>
                            <Typography variant="h6" style ={{marginLeft : 15}}>Rp. 0</Typography>
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
        height : '100px',
        width : '100%',
        display : 'flex',
        justifyContent : 'center',
        padding : '2% 7%'
    },
    toolbar : {
        // backgroundColor : 'white',
        display : 'flex',
        justifyContent : 'space-between',
        padding : 0
    },
    logo : {
        height : '100%',
        flexBasis : '50%',
        maxWidth : '50%',
        // backgroundColor : 'yellow',
        display : 'flex',
        justifyContent : 'flex-start'
    },
    ul : {
        textDecoration : 'none',
        height : '100%',
        width : '100%',
        // backgroundColor : 'red',
        display : 'flex',
        alignItems : 'center',
        paddingLeft : '5%'
    },
    list : {
        display : 'inline-block',
        fontSize : 20,
        marginRight : '3%',
        cursor : 'pointer',
        fontWeight : 600
    },
    rightMenu : {
        height : '100%', 
        flexBasis : '50%',
        // backgroundColor : 'aqua',
        display : 'flex',
        justifyContent : 'flex-end',
        alignItems : 'center'
    },
    cartIcon : {
        display : 'flex',
        alignItems : 'center',
        marginRight : 15,
        cursor : 'pointer'
    }
}

export default Navbar