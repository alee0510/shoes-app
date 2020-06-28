import React from 'react'
import { Route } from 'react-router-dom'
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

// import actions
import { keepLogin } from './actions'

class Main extends React.Component {
    componentDidMount () {
        this.props.keepLogin()
    }

    render () {
        return (
            <div>
                <Navbar/>
                <Route path="/" component={Home} exact/>
                <Route path="/login" component={LogIn} exact/>
                <Route path="/register" component={SignUp} exact/>
                <Route path="/details" component={ProductDetails} exact/>
                <Route path="/cart" component={UserCart} exact/>
                <Route path="/history" component={History} exact/>
                <Footer/>
            </div>
        )
    }
}

export default connect(null, { keepLogin })(Main)