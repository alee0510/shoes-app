import React from 'react'
import { Link } from 'react-router-dom'
import { MenuItem, ListItemIcon, ListItemText } from '@material-ui/core'

// import styles
import '../styles/menuitem.css'

const Item = (props) => (
    <Link to={props.link} className="link">
        <MenuItem id="menu-item" onClick={props.onClose}>
            <ListItemIcon>
                {props.children}
            </ListItemIcon>
            <ListItemText id="text">{props.text}</ListItemText>
        </MenuItem>
    </Link>
)

export default Item