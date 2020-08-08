import React from 'react'
import { connect } from 'react-redux'
import { IconButton, Avatar, Menu } from '@material-ui/core'

// import icons
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import HistoryIcon from '@material-ui/icons/History'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import DashboardIcon from '@material-ui/icons/Dashboard'

// import custom component
import Item from '../components/menuitem'

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
                        !username ? <Avatar>U</Avatar> :
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
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'left'}}
                    transformOrigin={{ vertical: 'top', horizontal: 'right'}}
                    style={{ top : '0%', left : '3%' }}
                >
                {   username ? role === 'admin'
                    ? <Admin onLogout={this.handleLogOut}/>
                    : <User onClose={this.handleClose} onLogout={this.handleLogOut}/>
                    : <NotLogin onClose={this.handleClose}/>
                }
                </Menu>
            </div>
        )
    }
}

const Admin = (props) => (
    <div>
        <Item link="/dashboard" text="Dashboard">
            <DashboardIcon/>
        </Item>
        <Item link="/" text="Logout" onClose={props.onLogout}>
            <ExitToAppIcon/>
        </Item>
    </div>
)

const User = (props) => (
    <div>
        <Item link="/cart" text="Cart" onClose={props.onClose}>
            <ShoppingBasketIcon/>
        </Item>
        <Item link="/history" text="History" onClose={props.onClose}>
            <HistoryIcon/>
        </Item>
        <Item link="/" text="Logout" onClose={props.onLogout}>
            <ExitToAppIcon/>
        </Item>
    </div>
)

const NotLogin = (props) => (
    <div>
        <Item link="/login" text="Login" onClose={props.onClose}>
            <MeetingRoomIcon/>
        </Item>
        <Item link="/register" text="Register" onClose={props.onClose}>
            <PersonAddIcon/>
        </Item>
    </div>
)

const mapStore = ({user}) => {
    return {
        username : user.username,
        role : user.role
    }
}

export default connect(mapStore, { logOut })(ProfileButton)