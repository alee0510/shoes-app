import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button
} from '@material-ui/core'

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import DeleteIcon from '@material-ui/icons/Delete'
import CreditCardIcon from '@material-ui/icons/CreditCard'


import { URL } from '../actions/helper'
import { keepLogin } from '../actions'
import Alert from '../components/alert'

class UserCart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            alert : false
        }
    }

    handleDelete = (index) => {
        console.log(index)
        let tempCart = this.props.cart
        tempCart.splice(index, 1)
        
        // update database
        Axios.patch(URL + `/users/${this.props.id}`, { cart : tempCart })
        .then(res => this.props.keepLogin())
        .catch(err => console.log(err))
    }

    hanldeOk = () => {
        let history = {
            userId : this.props.id,
            date : new Date().toLocaleDateString(),
            total : this.props.cart.map(item => item.total).reduce((a, b) => a + b),
            transactions : this.props.cart
        }
        console.log(history)

        // update database
        Axios.post(URL + '/transaction_histories', history)
        .then(res => {

            // delete user cart
            Axios.patch(URL + `/users/${this.props.id}`, { cart : [] })
            .then(res => this.props.keepLogin())
        })
        .catch(err => console.log(err))
    }

    renderTableHead = () => (
        <TableHead>
            <TableRow>
                <TableCell style={styles.tableHead}>No</TableCell>
                <TableCell style={styles.tableHead}>Product</TableCell>
                <TableCell style={styles.tableHead}>Brand</TableCell>
                <TableCell style={styles.tableHead}>Price</TableCell>
                <TableCell style={styles.tableHead}>Color</TableCell>
                <TableCell style={styles.tableHead}>Size</TableCell>
                <TableCell style={styles.tableHead}>Quantity</TableCell>
                <TableCell style={styles.tableHead}>Price</TableCell>
                <TableCell style={styles.tableHead}>Total</TableCell>
                <TableCell style={styles.tableHead}>Action</TableCell>
            </TableRow>
        </TableHead>
    )

    renderTableContents = () => {
        return this.props.cart.map((item, index) => (
            <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.product}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.qty}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.price * item.qty}</TableCell>
                <TableCell>
                    <Button
                        startIcon={<DeleteIcon/>}
                        style={styles.deleteButton}
                        onClick={ _ => this.handleDelete(index)}
                    >
                        Delete
                    </Button>
                </TableCell>
            </TableRow>
        ))
    }

    render () {
        const { alert } = this.state

        return (
            <div style={styles.root}>
                <div style={styles.title}>
                    <ShoppingBasketIcon fontSize="large"/>
                    <h1 style={styles.subTitle}>User Cart</h1>
                </div>
                <Table>
                    {this.renderTableHead()}
                    <TableBody>
                        {this.renderTableContents()}
                    </TableBody>
                </Table>
                <Button 
                    variant="contained" 
                    style={styles.checkOutButton}
                    startIcon={<CreditCardIcon/>}
                    onClick={ _ => this.setState({alert : true})}
                >
                    Check Out
                </Button>
                <Alert 
                    open={alert} 
                    title="Are you sure to check out and finish transaction ?" 
                    handleClose={ _ => this.setState({alert : false})}
                    handleOk={this.hanldeOk}
                />
            </div>
        )
    }
}

const styles = {
    root : {
        width : '100%',
        height : 'calc(100vh - 70px)',
        backgroundColor : '#f2f2f2',
        padding : '90px 10% 3% 10%',
        display : 'flex',
        flexDirection : 'column'
    },
    title : {
        display : 'flex',
        alignItems : 'center',
        margin : '2% 0px',
        color : '#130f40'
    },
    subTitle : {
        marginLeft : '1%'
    },
    deleteButton : {
        backgroundColor : '#EA2027',
        color : 'white',
        borderRadius : 0,
        padding : '10px 20px'
    },
    checkOutButton : {
        backgroundColor : '#130f40',
        color : 'white',
        borderRadius : 0,
        width : '20%',
        alignSelf : 'flex-end',
        marginTop : '3%'
    },
    tableHead : {
        fontWeight : 600,
        fontSize : 17
    }
}

const mapStore = ({user}) => {
    return {
        id : user.id,
        cart : user.cart
    }
}

export default connect(mapStore, { keepLogin })(UserCart)