import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@material-ui/core'

class Page404 extends React.Component {
    render () {
        return (
            <div style={styles.root}>
                <h1 style={styles.title}>404</h1>
                <h1 style={styles.info}>☹ Sorry page not found . . .</h1>
                <Link to='/' style={styles.link}>
                    <Button style={styles.button}>Back to Home</Button>
                </Link>
            </div>
        )
    }
}

const styles = {
    root : {
        height : 'calc(100vh - 70px)',
        width : '100%',
        backgroundColor : '#f2f2f2',
        padding : '90px 10% 3% 10%',
        display : 'flex',
        flexDirection : 'column',
        justifyContent : 'center',
        alignItems : 'center'
    },
    title : {
        fontSize : 70,
        fontWeight : 'bold',
        marginBottom : '2%'
    },
    info : {
        fontSize : 24,
        fontWeight : 'bold',
        marginBottom : '1.5%'
    },
    button : {
        backgroundColor : '#130f40',
        color : 'white',
        padding : '10px 25px'
    },
    link : {
        textDecoration : 'none'
    }
}

export default Page404