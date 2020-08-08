import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { 
    IconButton, 
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from '@material-ui/core'

// import icons
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import HistoryIcon from '@material-ui/icons/History'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import DashboardIcon from '@material-ui/icons/Dashboard'

// import styles & custom component
import '../styles/profileButton.css'

// import action
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
        const { username, role } = this.props
        return (
            <div>
                <IconButton 
                    aria-controls="simple-menu" 
                    aria-haspopup="true" 
                    onClick={(e) => this.handleClick(e)}
                >
                    {
                        !username ? 
                        <Avatar>U</Avatar> :
                        <Avatar 
                            style={{background : '#130f40'}}
                        >
                            {username.charAt(0).toUpperCase()}
                        </Avatar>
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
                    style={{ top : '0%', left : '3%' }}
                >
                {   username ? role === 'admin'?
                    <div>
                        <Link to='/dashboard' className="link">
                            <MenuItem id="menu-item">
                                <ListItemIcon>
                                        <DashboardIcon/>
                                    </ListItemIcon>
                                <ListItemText id="text">Dashboard</ListItemText>
                            </MenuItem>
                        </Link>
                        <Link to='/' className="link">
                            <MenuItem id="menu-item" onClick={this.handleLogOut}>
                                <ListItemIcon>
                                        <ExitToAppIcon/>
                                    </ListItemIcon>
                                <ListItemText id="text">Logout</ListItemText>
                            </MenuItem>
                        </Link>
                    </div>
                    :
                    <div>
                    <Link to='/cart' className="link">
                        <MenuItem id="menu-item" onClick={this.handleClose}>
                            <ListItemIcon>
                                    <ShoppingBasketIcon/>
                                </ListItemIcon>
                            <ListItemText id="text">Cart</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link to='/history' className="link">
                        <MenuItem id="menu-item" onClick={this.handleClose}>
                            <ListItemIcon>
                                    <HistoryIcon/>
                                </ListItemIcon>
                            <ListItemText id="text">History</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link to='/' className="link">
                        <MenuItem id="menu-item" onClick={this.handleLogOut}>
                            <ListItemIcon>
                                    <ExitToAppIcon/>
                                </ListItemIcon>
                            <ListItemText id="text">Logout</ListItemText>
                        </MenuItem>
                    </Link>
                    </div>
                    :
                    <div>
                    <Link to='/login' className="link">
                        <MenuItem id="menu-item" onClick={this.handleClose}>
                            <ListItemIcon>
                                <MeetingRoomIcon/>
                            </ListItemIcon>
                            <ListItemText id="text">Login</ListItemText>
                        </MenuItem>
                    </Link>
                    <Link to='/register' className="link">
                        <MenuItem id="menu-item" onClick={this.handleClose}>
                            <ListItemIcon>
                                <PersonAddIcon/>
                            </ListItemIcon>
                            <ListItemText id="text">Register</ListItemText>
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
        username : user.username,
        role : user.role
    }
}

export default connect(mapStore, { logOut })(ProfileButton)