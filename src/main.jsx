import React from 'react'
import { Route } from 'react-router-dom'

// import components
import Navbar from './components/navbar'
import Footer from './components/footer'

// import pages
import Home from './pages/home'
import LogIn from './pages/login'
import SignUp from './pages/register'
import ProductDetails from './pages/productDeatils'

class Main extends React.Component {
    render () {
        return (
            <div>
                <Navbar/>
                <Route path="/" component={Home} exact/>
                <Route path="/login" component={LogIn}/>
                <Route path="/register" component={SignUp}/>
                <Route path="/details" component={ProductDetails}/>
                <Footer/>
            </div>
        )
    }
}

export default Main