import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'


const PrivateRoute = ({ component: Component, ...rest }) => {
    const username = useSelector(state => state.user.username)
    const role = useSelector(state => state.user.role)

    if (username) {
        return (
            <Route {...rest} render = {(props) => {
                if (role === 'admin') {
                    return <Component {...props}/>
                }                    
                return <Redirect to = '/not_found'/>
            }}/>
        )
    } else {
        return <Redirect to = '/not_found'/>
    }
}

export default PrivateRoute