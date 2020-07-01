import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    IconButton
} from '@material-ui/core'

import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import DeleteIcon from '@material-ui/icons/Delete'
import CreditCardIcon from '@material-ui/icons/CreditCard'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import ClearIcon from '@material-ui/icons/Clear'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle'

import { URL } from '../actions/helper'
import { keepLogin } from '../actions'
import Alert from '../components/alert'

class UserCart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            alert : false,
            selectedIndex : null,
            qty : null
        }
    }

    handleDelete = (index) => {
        console.log(index)
        let tempCart = this.props.cart
        tempCart.splice(index, 1)
        
        // update database
        Axios.patch(URL + `/users/${this.props.id}`, { cart : tempCart })
        .then(res => {
            this.props.keepLogin()
            this.setState({ selectedIndex : null, qty : null})
        })
        .catch(err => console.log(err))
    }

    handleEdit = (index, qty) => {
        this.setState({selectedIndex : index, qty : qty})
    }

    handleCancel = () => {
        this.setState({selectedIndex : null})
    }

    handleDone = () => {
        const { selectedIndex, qty } = this.state
        console.log('done')
        let tempCart = this.props.cart
        tempCart[selectedIndex].qty = qty
        tempCart[selectedIndex].total = qty * tempCart[selectedIndex].price

        // update database
        Axios.patch(URL + `/users/${this.props.id}`, { cart : tempCart })
        .then(res => {
            this.props.keepLogin()
            this.setState({ selectedIndex : null, qty : null})
        })
        .catch(err => console.log(err))
    }

    handleCheckOut = () => {
        if (this.props.cart.length === 0) return
        this.setState({alert : true})
    }


    handleQty = () => {
        this.setState({qty : this.state.qty - 1}, _ => this.state.qty === 0 ? this.handleDelete(this.state.selectedIndex) : null )
    }

    hanldeOk = () => {
        let history = {
            userId : this.props.id,
            date : new Date().toLocaleString(),
            total : this.props.cart.map(item => item.total).reduce((a, b) => a + b),
            transactions : this.props.cart
        }
        // console.log(history)

        // update database
        Axios.post(URL + '/transaction_histories', history)
        .then(res => {

            // delete user cart
            Axios.patch(URL + `/users/${this.props.id}`, { cart : [] })
            .then(res => {
                this.props.keepLogin()
                this.setState({alert : false})
            })
        })
        .catch(err => console.log(err))
    }

    renderTableHead = () => (
        <TableHead>
            <TableRow>
                <TableCell style={styles.tableHead}>No</TableCell>
                <TableCell style={styles.tableHead}>Image</TableCell>
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
        const { selectedIndex, qty } = this.state
        return this.props.cart.map((item, index) => (
            <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                    <img src={item.image} width="70px" alt="product-img"/>
                </TableCell>
                <TableCell>{item.product}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>
                    {
                        selectedIndex === index ?
                        <div style={styles.qty}>
                            <IconButton onClick={this.handleQty}>
                                <RemoveCircleIcon/>
                            </IconButton>
                            <h5 style={styles.qtyInfo}>{qty}</h5>
                            <IconButton onClick={ _ => this.setState({qty : qty + 1})}>
                                <AddCircleIcon/>
                            </IconButton>
                        </div>
                        :
                        item.qty
                    }
                </TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.price * (qty || item.qty)}</TableCell>
                <TableCell>
                    {
                        selectedIndex === index ?
                        <>
                            <Button
                                startIcon={<DoneIcon/>}
                                color="primary"
                                onClick={this.handleDone}
                            >
                                Done
                            </Button>
                            <Button
                                startIcon={<ClearIcon/>}
                                color="primary"
                                onClick={this.handleCancel}
                            >
                                Cancel
                            </Button>
                        </>
                        :
                        <>
                            <Button
                                startIcon={<EditIcon/>}
                                color="primary"
                                onClick={ _ => this.handleEdit(index, item.qty)}
                            >
                                Edit
                            </Button>
                            <Button
                                startIcon={<DeleteIcon/>}
                                color="secondary"
                                onClick={ _ => this.handleDelete(index)}
                            >
                                Delete
                            </Button>
                        </>
                    }
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
                <Table style={{backgroundColor : 'white'}}>
                    {this.renderTableHead()}
                    <TableBody>
                        {this.renderTableContents()}
                    </TableBody>
                </Table>
                <Button 
                    variant="contained" 
                    style={styles.checkOutButton}
                    startIcon={<CreditCardIcon/>}
                    onClick={this.handleCheckOut}
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
    },
    qty : {
        display : 'flex',
        alignItems : 'center'
    },
    qtyInfo : {
        margin : '0px 20px'
    }
}

const mapStore = ({user}) => {
    return {
        id : user.id,
        cart : user.cart
    }
}

export default connect(mapStore, { keepLogin })(UserCart)