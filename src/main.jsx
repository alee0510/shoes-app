import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

// import components
import Navbar from './components/navbar'
import Footer from './components/footer'

// import pages
import Home from './pages/home'
import LogIn from './pages/login'
import SignUp from './pages/register'
import ProductDetails from './pages/productDetails'
import UserCart from './pages/userCart'
import History from './pages/history'
import Dashboard from './pages/dashboard'
import Page404 from './pages/404'

// import actions
import { keepLogin } from './actions'

import PrivateRoute from './privateRoute'

class Main extends React.Component {
    componentDidMount () {
        this.props.keepLogin()
    }

    render () {
        return (
            <div>
                <Navbar/>
                <Switch>
                    <Route path="/" component={Home} exact/>
                    <Route path="/login" component={LogIn}/>
                    <Route path="/register" component={SignUp}/>
                    <Route path="/details" component={ProductDetails}/>
                    <Route path="/cart" component={UserCart}/>
                    <Route path="/history" component={History}/>
                    <Route path='/dashboard' component={Dashboard}/>
                    <Route path='*' component={Page404}/>
                </Switch>
                <Footer/>
            </div>
        )
    }
}

export default connect(null, { keepLogin })(Main)