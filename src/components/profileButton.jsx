import React from 'react'
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
                    <Avatar>U</Avatar>
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
                    <Link to='/login' style={styles.link}>
                        <MenuItem style={styles.menuItem}>
                            <ListItemIcon>
                                <MeetingRoomIcon/>
                            </ListItemIcon>
                            <ListItemText style={styles.text}>Login</ListItemText>
                        </MenuItem>
                    </Link>
                    <MenuItem style={styles.menuItem}>
                        <ListItemIcon>
                            <PersonAddIcon/>
                        </ListItemIcon>
                        <ListItemText>Register</ListItemText>
                    </MenuItem>
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

export default ProfileButton