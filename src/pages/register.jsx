import React from 'react'
import Axios from 'axios'
import { Paper, InputBase, Button, Checkbox } from '@material-ui/core'
import { Link, Redirect } from 'react-router-dom'

import PersonIcon from '@material-ui/icons/Person'
import EmailIcon from '@material-ui/icons/Email'
import VisibilityIcon from '@material-ui/icons/Visibility'
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff'

class SignUp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible : false,
            success : false,
            agreement : false,
            error : [false, ''],
            password : null
        }
    }

    handleClick = () => {
        const { visible } = this.state
        this.setState({visible : !visible})
    }

    handleSignUp = () => {
        let username = this.username.value
        let email = this.email.value
        let password = this.state.password
        let confPassword = this.confPassword.value

        // console.log('sign up')
        // console.log(this.state.agreement)

        // check input
        if ([username, email, password, confPassword].includes('')) return this.setState({error : [true, '* please fill all form.']})
        
        // check password
        if (password !== confPassword) return this.setState({error : [true, '* password doesn\'t match.']})
        
        // check agreement
        if (!this.state.agreement) return this.setState({error : [true, '* please check Terms of Service and Privacy Statement.']})

        // post data to database
        Axios.post('http://localhost:2000/users', { username, password, email, role : 'user'})
        .then(res => {
            console.log(res.data)
            this.setState({ success : true , error : [false, ''], agreement : false})
        })
        .catch(err => console.log(err))
    }

    handleChange = (event) => {
        let password = event.target.value
        // console.log(password)
        
        let number = /[0-9]/
        let symbol = /[!@#$%^&*;]/

        // check password
        if (password.length < 6 || !number.test(password) || !symbol.test(password)) {
            return this.setState({error : [true, '* password must min 6 characters, include number and symbol']})
        }

        this.setState({ password : password , error : [false, '']})
    }

    render () {
        const { visible, error, success, agreement } = this.state

        if (success) {
            return <Redirect to='/login'/>
        }

        return (
            <div style={styles.root}>
                <Paper style={styles.container} square>
                    <h1 style={styles.title}>Register</h1>
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
                        <div style={styles.icon}>
                            <EmailIcon/>
                        </div>
                        <InputBase 
                            type="email" 
                            placeholder="email" 
                            style={styles.input} 
                            inputRef={(email) => this.email = email}
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
                            // inputRef={(password) => this.password = password}
                            onChange={(e) => this.handleChange(e)}
                        />
                    </div>
                    <div style={styles.inputContainer}>
                        <div style={styles.icon} onClick={this.handleClick}>
                            {visible ? <VisibilityIcon/> : <VisibilityOffIcon/>}
                        </div>
                        <InputBase 
                            type={visible ? 'text' : 'password'} 
                            placeholder="confirm password" 
                            style={styles.input} 
                            inputRef={(confPassword) => this.confPassword = confPassword}
                        />
                    </div>
                    <h5 style={styles.helper}>{error[0] ? error[1] : ''}</h5>
                    <div style={styles.agreement}>
                        <Checkbox checked={agreement} style={styles.checkBox} onChange={() => this.setState({agreement : !agreement})}/>
                        <h5>By clicking “Sign up for Shoes Shop, you agree to our Terms of Service and Privacy Statement. We’ll occasionally send you account related emails.</h5>
                    </div>
                    <Button 
                        variant="contained" 
                        style={styles.button}
                        onClick={this.handleSignUp}
                    >
                        Sign Up
                    </Button>
                    <div style={styles.info}>
                        <h5 style={{marginRight : 5}}>Already has an account ?</h5>
                        <Link to='/login'>
                            <h5>Sign In</h5>
                        </Link>
                    </div>
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
        alignItems : 'center',
        backgroundImage : 'url(https://images.unsplash.com/photo-1552346154-7841f684d259?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80)',
        backgroundRepeat : 'no-repeat',
        backgroundSize : 'cover'
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
        marginTop : '5%'
    },
    helper : {
        color : '#EA2027',
        fontSize : 12
    },
    agreement : {
        margin : '2% 0px',
        fontSize : 14,
        display : 'flex',
        alignItems : 'flex-start'
    },
    checkBox : {
        marginRight : 10,
        color : '#130f40', 
        height : 15, 
        width : 15
    }
}

export default SignUp