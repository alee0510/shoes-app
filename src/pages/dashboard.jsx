import React from 'react'
import Axios from 'axios'
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    Select,
    MenuItem
} from '@material-ui/core'

import DashboardIcon from '@material-ui/icons/Dashboard'
import InfoIcon from '@material-ui/icons/Info'

import { URL } from '../actions/helper'

class Dashboard extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            data : [],
            alert : false,
            details : [],
            by : 'id',
            order : 'asc'
        }
    }

    componentDidMount () {
        Axios.get(URL + '/transaction_histories')
        .then(res => {
            this.setState({data : res.data})
        })
        .catch(err => console.log(err))
    }

    getSortedData = (by, order) => {
        Axios.get(URL + `/transaction_histories?_sort=${by}&_order=${order}`)
        .then(res => {
            this.setState({data : res.data, by : by, order : order})
        })
        .catch(err => console.log(err))
    }

    handleClose = () => {
        this.setState({alert : false})
    }
    
    handleDetails = (data) => {
        this.setState({details : data, alert : true})
    }

    handleSort = (e) => {
        this.getSortedData(e.target.value, this.state.order)
    }

    handleSortProps = (e) => {
        this.getSortedData(this.state.by, e.target.value)
    }

    renderTableHead = () => (
        <TableHead>
            <TableRow>
                <TableCell style={styles.tableHead}>No</TableCell>
                <TableCell style={styles.tableHead}>User ID</TableCell>
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
                <TableCell>{item.userId}</TableCell>
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
        const { alert, by, order  } = this.state
        return (
            <div style={styles.root}>
                <div style={styles.header}>
                    <div style={styles.title}>
                        <DashboardIcon fontSize="large"/>
                        <h1 style={styles.subTitle}>Admin Dashboard</h1>
                    </div>
                    <div style={styles.sort}>
                        <h1 style={styles.sortBy}>Sort By</h1>
                        <Select
                            value={by}
                            onChange={(e) => this.handleSort(e)}
                            disableUnderline = {true}
                            style={{marginRight : 20}}
                        >
                            <MenuItem value={'id'}>ID</MenuItem>
                            <MenuItem value={'date'}>Date</MenuItem>
                            <MenuItem value={'total'}>Total</MenuItem>
                        </Select>
                        <Select
                            value={order}
                            onChange={(e) => this.handleSortProps(e)}
                            disableUnderline = {true}
                        >
                            <MenuItem value={'asc'}>ASC</MenuItem>
                            <MenuItem value={'desc'}>DESC</MenuItem>
                        </Select>
                    </div>
                </div>
                <Table>
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
                            <Table style={{backgroundColor : 'white'}}>
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
        height : 'calc(100vh - 70px)',
        width : '100%',
        backgroundColor : '#f2f2f2',
        padding : '90px 10% 3% 10%',
    },
    header : {
        display : 'flex',
        justifyContent : 'space-between',
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
    },
    title : {
        display : 'flex',
        alignItems : 'center',
        color : '#130f40',
        flexBasis : '50%'
    },
    sort : {
        display : 'flex',
        justifyContent : 'flex-end',
        alignItems : 'center',
        color : '#130f40',
        flexBasis : '50%'
    },
    sortBy : {
        fontSize : 16,
        marginRight : 20
    }
}

export default Dashboard