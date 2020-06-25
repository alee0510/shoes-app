import React from 'react'
import Axios from 'axios'
import { Paper, InputBase, Button } from '@material-ui/core'
import { Redirect } from 'react-router-dom'

import PersonIcon from '@material-ui/icons/Person'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

class LogIn extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            visible : false,
            error : false,
            user : []
        }
    }

    handleClick = () => {
        const { visible } = this.state
        this.setState({visible : !visible})
    }

    handleLogin = () => {
        let username = this.username.value
        let password = this.password.value

        Axios.get(`http://localhost:2000/users?username=${username}&password=${password}`)
        .then(res => {
            if(res.data.length === 0) return this.setState({error : true})
            // console.log(res.data[0])
            this.setState({error : false, user : res.data[0]})
        })
        .catch(err => console.log(err))
    }

    render () {
        const { visible, error, user } = this.state
        if (user.length !== 0) {
            return <Redirect to='/'/>
        }

        return (
            <div style={styles.root}>
                <Paper style={styles.container} square elevation={1}>
                    <h1 style={styles.title}>Login</h1>
                    <div style={styles.inputContainer}>
                        <div style={styles.icon}>
                            <PersonIcon/>
                        </div>
                        <InputBase 
                            type="text" 
                            placeholder="username" 
                            style={styles.input} 
                            inputRef={(username) => this.username = username}
                        />
                    </div>
                    <div style={styles.inputContainer}>
                        <div style={styles.icon} onClick={this.handleClick}>
                            {visible ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                        </div>
                        <InputBase 
                            type={visible ? 'text' : 'password'} 
                            placeholder="password" 
                            style={styles.input}
                            inputRef={(password) => this.password = password}
                        />
                    </div>
                    <h5 style={styles.helper}>{error ? '* username or email is invalid.' : ''}</h5>
                    <div style={styles.info}>
                        <h5 style={{marginRight : 5}}>Forgot password?</h5>
                        <h5>or SignUp</h5>
                    </div>
                    <Button 
                        variant="contained" 
                        style={styles.button}
                        onClick={this.handleLogin}
                    >
                        Login
                    </Button>
                </Paper>
            </div>
        )
    }
}

const styles = {
    root : {
        height : 'calc(100vh - 70px)',
        width : '100%',
        paddingTop : '3%',
        backgroundColor : '#f2f2f2',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center'
    },
    container : {
        height : '70vh',
        width : '40vw',
        display : 'flex',
        flexDirection : 'column',
        padding : '3% 5%'

    },
    inputContainer : {
        height : 50,
        width : '100%',
        display : 'flex',
        alignItems : 'center',
        margin : '2% 0px'
    },
    icon : {
        width : 60,
        height : '100%',
        display : 'flex',
        justifyContent : 'center',
        alignItems : 'center',
        backgroundColor : 'rgba(19, 15, 64, 0.6)',
        color : 'white',
        cursor : 'pointer',
        transition: 'all 250ms cubic-bezier(0, 0.995, 0.99, 1)'
    },
    input : {
        padding : '0px 15px',
        backgroundColor : 'rgba(19, 15, 64, 0.2)',
        width : '100%',
        height : '100%',
        color : '#130f40'
    },
    title : {
        fontSize : 50,
        fontWeight : 'bold',
        textTransfrom : 'uppercase',
        marginBottom : '5%'
    },
    info : {
        display : 'flex',
        alignItems : 'center',
        margin : '3% 0px'
    },
    button : {
        backgroundColor : '#130f40',
        color : 'white',
        fontWeight : 'bold',
        width : '50%',
        alignSelf : 'flex-start',
        marginTop : '10%'
    },
    helper : {
        color : '#EA2027'
    }
}

export default LogIn