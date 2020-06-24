import React from 'react'
import { 
    Avatar,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText 
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
                <Menu
                    open={this.state.open}
                    onClose={() => this.setState({open : false})}
                    anchorOrigin={{
                        vertical : 'top',
                        horizontal : 'right'
                    }}
                    style={styles.popUp}
                >
                    <MenuItem style={styles.menuItem}>
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
                </Menu>
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
        alignItems : 'center',
        cursor : 'pointer',
        position : 'relative'
    },
    popUp : {
        top : '-38%',
        left : '-7%',
    },
    menuItem : {
        width : 200,
    }
}
export default Profile