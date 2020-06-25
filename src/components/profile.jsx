import React from 'react'
import { 
    IconButton, 
    Avatar,
    Menu,
    MenuItem
} from '@material-ui/core'

class Profile extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            anchorEl : null
        }
    }

    handleClick = (event) => {
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
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <MenuItem >Login</MenuItem>
                    <MenuItem >Register</MenuItem>
                </Menu>
            </div>
        )
    }
}

export default Profile