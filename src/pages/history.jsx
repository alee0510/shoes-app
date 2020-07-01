import React from 'react'
import Axios from 'axios'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogActions
} from '@material-ui/core'

import HistoryIcon from '@material-ui/icons/History'
import InfoIcon from '@material-ui/icons/Info'

import { URL } from '../actions/helper'

class History extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data : [],
            alert : false,
            details : []
        }
    }

    componentDidMount () {
        Axios.get(URL + `/transaction_histories?userId=${localStorage.getItem('id')}`)
        .then(res => {
            console.log(res.data)
            this.setState({data : res.data})
        })
        .catch(err => console.log(err))    
    }

    handleClose = () => {
        this.setState({alert : false})
    }
    
    handleDetails = (data) => {
        this.setState({details : data, alert : true})
    }

    renderTableHead = () => (
        <TableHead>
            <TableRow>
                <TableCell style={styles.tableHead}>No</TableCell>
                <TableCell style={styles.tableHead}>Date</TableCell>
                <TableCell style={styles.tableHead}>Total</TableCell>
                <TableCell style={styles.tableHead}>Action</TableCell>
            </TableRow>
        </TableHead>
    )

    renderTableContents = () => {
        return this.state.data.map((item, index) => (
            <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.total}</TableCell>
                <TableCell>
                    <Button
                        startIcon={<InfoIcon/>}
                        style={styles.details}
                        onClick={ _ => this.handleDetails(item.transactions)}
                    >
                        Details
                    </Button>
                </TableCell>
            </TableRow>
        ))
    }

    renderDetails = () => {
        return this.state.details.map((item, index) => (
            <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                    <img src={item.image} width="70px" alt="product-img"/>
                </TableCell>
                <TableCell>{item.product}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.color}</TableCell>
                <TableCell>{item.price}</TableCell>
                <TableCell>{item.size}</TableCell>
                <TableCell>{item.qty}</TableCell>
            </TableRow>
        ))
    }

    render () {
        const { alert  } = this.state

        if (!this.props.username) {
            return <Redirect to='/'/>
        }

        return (
            <div style={styles.root}>
                <div style={styles.title}>
                    <HistoryIcon fontSize="large"/>
                    <h1 style={styles.subTitle}>Transaction History</h1>
                </div>
                <Table style={{backgroundColor : 'white'}}>
                    {this.renderTableHead()}
                    <TableBody>
                        {this.renderTableContents()}
                    </TableBody>
                </Table>
                <Dialog
                    open={alert}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    maxWidth={'md'}
                >
                    <DialogContent style ={{margin : 0, padding : 0}}>
                        <DialogContentText id="alert-dialog-description">
                            <Table >
                                <TableHead>
                                    <TableRow>
                                        <TableCell>No</TableCell>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Product</TableCell>
                                        <TableCell>Brand</TableCell>
                                        <TableCell>Color</TableCell>
                                        <TableCell>Price</TableCell>
                                        <TableCell>Size</TableCell>
                                        <TableCell>Quantity</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {this.renderDetails()}
                                </TableBody>
                            </Table>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary" autoFocus>
                            Ok
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const styles = {
    root : {
        width : '100%',
        height : 'calc(100vh - 70px)',
        backgroundColor : '#f2f2f2',
        padding : '90px 10% 3% 10%'
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
    details : {
        color : '#130f40'
    },
    tableHead : {
        fontWeight : 600,
        fontSize : 17
    }
}

const mapStore = ({user}) => {
    return {
        username : user.username
    }
}

export default connect(mapStore)(History)