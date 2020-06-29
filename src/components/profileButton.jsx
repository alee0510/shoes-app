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
import DashboardIcon from '@material-ui/icons/Dashboard'

import { logOut } from '../actions'

class ProfileButton extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            anchorEl : null,
            logOut : false
        }
    }

    handleClick = (event) => {
        // console.log(event.currentTarget)
        this.setState({anchorEl : event.currentTarget})
    }

    handleClose = () => {
        this.setState({anchorEl : null})
    }

    handleLogOut = () => {
        localStorage.clear()
        this.setState({anchorEl : null, logOut : true})
        this.props.logOut()
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
                        !this.props.username ? 
                        <Avatar>U</Avatar> :
                        <Avatar style={{background : '#130f40'}}>{this.props.username.charAt(0).toUpperCase()}</Avatar>
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
                {   this.props.username ? this.props.role === 'admin'?
                    <div>
                        <Link to='/dashboard' style={styles.link}>
                            <MenuItem style={styles.menuItem}>
                                <ListItemIcon>
                                        <DashboardIcon/>
                                    </ListItemIcon>
                                <ListItemText style={styles.text}>Dashboard</ListItemText>
                            </MenuItem>
                        </Link>
                        <Link to='/' style={styles.link}>
                            <MenuItem style={styles.menuItem} onClick={this.handleLogOut}>
                                <ListItemIcon>
                                        <ExitToAppIcon/>
                                    </ListItemIcon>
                                <ListItemText style={styles.text}>Logout</ListItemText>
                            </MenuItem>
                        </Link>
                    </div>
                    :
                    <div>
                    <MenuItem style={styles.menuItem} onClick={this.handleClose}>
                        <ListItemIcon>
                                <FaceIcon/>
                            </ListItemIcon>
                        <ListItemText style={styles.text}>Profile</ListItemText>
                    </MenuItem>
                    <Link to='/cart' style={styles.link}>
                        <MenuItem style={styles.menuItem} onClick={this.handleClose}>
                            <ListItemIcon>
                                    <ShoppingBasketIcon/>
                                </ListItemIcon>
                            <ListItemText style={styles.text}>Cart</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link to='/history' style={styles.link}>
                        <MenuItem style={styles.menuItem} onClick={this.handleClose}>
                            <ListItemIcon>
                                    <HistoryIcon/>
                                </ListItemIcon>
                            <ListItemText style={styles.text}>History</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link to='/' style={styles.link}>
                        <MenuItem style={styles.menuItem} onClick={this.handleLogOut}>
                            <ListItemIcon>
                                    <ExitToAppIcon/>
                                </ListItemIcon>
                            <ListItemText style={styles.text}>Logout</ListItemText>
                        </MenuItem>
                    </Link>
                    </div>
                    :
                    <div>
                    <Link to='/login' style={styles.link}>
                        <MenuItem style={styles.menuItem} onClick={this.handleClose}>
                            <ListItemIcon>
                                <MeetingRoomIcon/>
                            </ListItemIcon>
                            <ListItemText style={styles.text}>Login</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link to='/register' style={styles.link}>
                        <MenuItem style={styles.menuItem} onClick={this.handleClose}>
                            <ListItemIcon>
                                <PersonAddIcon/>
                            </ListItemIcon>
                            <ListItemText style={styles.text}>Register</ListItemText>
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
        username : user.username,
        role : user.role
    }
}

export default connect(mapStore, { logOut })(ProfileButton)