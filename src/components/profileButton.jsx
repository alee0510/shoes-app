import React from 'react'
import { connect } from 'react-redux'
import { 
    IconButton, 
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core'
import { Link } from 'react-router-dom'

import PersonAddIcon from '@material-ui/icons/PersonAdd'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import FaceIcon from '@material-ui/icons/Face'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import HistoryIcon from '@material-ui/icons/History'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import { logOut } from '../actions'

class ProfileButton extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            anchorEl : null
        }
    }

    handleClick = (event) => {
        // console.log(event.currentTarget)
        this.setState({anchorEl : event.currentTarget})
    }

    handleClose = () => {
        this.setState({anchorEl : null})
    }

    render () {
        return (
            <div>
                <IconButton 
                    aria-controls="simple-menu" 
                    aria-haspopup="true" 
                    onClick={(e) => this.handleClick(e)}
                >
                    {
                        this.props.username ? 
                        <Avatar style={{background : '#130f40'}}>{this.props.username.charAt(0).toUpperCase()}</Avatar> : 
                        <Avatar>U</Avatar>
                    }
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                    getContentAnchorEl={null}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    style={styles.menu}
                >
                {   !this.props.username ?
                    <>
                    <Link to='/login' style={styles.link}>
                        <MenuItem style={styles.menuItem}>
                            <ListItemIcon>
                                <MeetingRoomIcon/>
                            </ListItemIcon>
                            <ListItemText style={styles.text}>Login</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link to='/register' style={styles.link}>
                        <MenuItem style={styles.menuItem}>
                            <ListItemIcon>
                                <PersonAddIcon/>
                            </ListItemIcon>
                            <ListItemText style={styles.text}>Register</ListItemText>
                        </MenuItem>
                    </Link>
                    </>
                    :
                    <>
                    <MenuItem style={styles.menuItem}>
                        <ListItemIcon>
                                <FaceIcon/>
                            </ListItemIcon>
                        <ListItemText style={styles.text}>Profile</ListItemText>
                    </MenuItem>
                    <MenuItem style={styles.menuItem}>
                        <ListItemIcon>
                                <ShoppingBasketIcon/>
                            </ListItemIcon>
                        <ListItemText style={styles.text}>Cart</ListItemText>
                    </MenuItem>
                    <MenuItem style={styles.menuItem}>
                        <ListItemIcon>
                                <HistoryIcon/>
                            </ListItemIcon>
                        <ListItemText style={styles.text}>History</ListItemText>
                    </MenuItem>
                    <MenuItem style={styles.menuItem} onClick={() => this.props.logOut()}>
                        <ListItemIcon>
                                <ExitToAppIcon/>
                            </ListItemIcon>
                        <ListItemText style={styles.text}>Logout</ListItemText>
                    </MenuItem>
                    </>
                }
                </Menu>
            </div>
        )
    }
}

const styles = {
    menu : {
        top : '0%',
        left : '3%'
    },
    menuItem : {
        width : 200
    },
    link : {
        textDecoration : 'none',
    },
    text : {
        color : 'black'
    }
}

const mapStore = ({user}) => {
    return {
        username : user.username
    }
}

export default connect(mapStore, { logOut })(ProfileButton)