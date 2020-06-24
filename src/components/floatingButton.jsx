import React from 'react'
import { IconButton } from '@material-ui/core'
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward'
import { animateScroll as scroll } from "react-scroll";

export default function FloatingButton () {
    return (
        <IconButton style={styles.root} onClick={() => scroll.scrollToTop()}>
            <ArrowUpwardIcon style={{color : 'black'}}/>
        </IconButton>
    )
}

const styles = {
    root : {
        backgroundColor : 'white',
        position : 'fixed',
        bottom : '5%',
        right : '3%',
        zIndex : 5,
    }
}