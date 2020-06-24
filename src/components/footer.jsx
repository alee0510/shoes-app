import React from 'react'
import TwitterIcon from '@material-ui/icons/Twitter'
import GitHubIcon from '@material-ui/icons/GitHub'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'

class Footer extends React.Component {
    render () {
        return (
            <div style={styles.root}>
                <h1 style={styles.copyright}>Copyright 2020 © alee0510</h1>
                <ul style={styles.ul}>
                    <li style={styles.li}><InstagramIcon fontSize="small"/></li>
                    <li style={styles.li}><FacebookIcon fontSize="small"/></li>
                    <li style={styles.li}><TwitterIcon fontSize="small"/></li>
                    <li style={styles.li}><GitHubIcon fontSize="small"/></li>
                </ul>
            </div>
        )
    }
}

const styles = {
    root : {
        height : 70,
        width : '100%',
        backgroundColor : '#130f40',
        padding : '2% 7%',
        display : 'flex',
        justifyContent : 'space-between',
        alignItems : 'center'
    },
    copyright : {
        fontSize : 16,
        color : 'white',
        fontWeight : 400
    },
    ul : {
        textDecoration : 'none'
    },
    li : {
        display : 'inline-block',
        color : 'white',
        marginLeft : 15,
        cursor : 'pointer'
    }
}
export default Footer