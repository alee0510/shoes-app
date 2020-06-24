import React from 'react'
import { 
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Popover,
    Typography 
} from '@material-ui/core'

import PersonAddIcon from '@material-ui/icons/PersonAdd'
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom'

class Profile extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            open : false
        }
    }

    render () {
        return (
            <div style={styles.root}>
                <Avatar style={styles.avatar} onClick={() => this.setState({open : !this.state.open})}>U</Avatar>
                <Popover
                    open={this.state.open}
                    onClose={() => this.setState({open : false})}
                    anchorOrigin={{
                        vertical : 'top',
                        horizontal : 'right'
                    }}
                    style={styles.menu}
                    elevation = {0}
                >
                    <MenuItem >
                        <ListItemIcon>
                            <MeetingRoomIcon/>
                        </ListItemIcon>
                        <ListItemText>Login</ListItemText>
                    </MenuItem>
                    <MenuItem style={styles.menuItem}>
                        <ListItemIcon>
                            <PersonAddIcon/>
                        </ListItemIcon>
                        <ListItemText>Register</ListItemText>
                    </MenuItem>
                </Popover>
            </div>
        )
    }
}

const styles = {
    root : {
        height : '100%',
        width : '50px',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },
    menu : {
        top : '7%',
        left : '-7%'
    },
    menuItem : {
        width : 200,
    }
}
export default Profile