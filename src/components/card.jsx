import React from 'react'
import Axios from 'axios'
import {
    Card,
    CardActionArea,
    CardMedia,
    CardContent,
    CardActions,
    Button,
    Typography
} from '@material-ui/core'

import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'
import FavoriteIcon from '@material-ui/icons/Favorite'

class Cards extends React.Component {
    constructor (props) {
        super (props) 
        this.state = {
            products : []
        }
    }

    componentDidMount () {
        Axios.get('http://localhost:2000/products')
        .then(res => {
            this.setState({products : res.data})
        })
        .catch(err => console.log(err))
    }

    renderCards = () => {
        return this.state.products.map((item, index) => (
            <Card key={item.id} style={styles.card}>
                <CardActionArea style={styles.contentArea}>
                    <CardMedia component="img" image={item.images[0]} style={styles.contentImage}/>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="h2" style={styles.contentTitle}>
                            {item.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {`Rp ${item.price}, 00`}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions style={{height : '13%'}}>
                    <Button 
                        size="small" color="primary"
                        variant="contained"
                        disableElevation
                        startIcon={<AddShoppingCartIcon/>}
                        style={styles.buttonBuy}
                    >
                        Buy Now
                    </Button>
                    <Button 
                        size="small" color="secondary"
                        startIcon={<FavoriteIcon/>}
                        style={{padding : '3% 7%', borderRadius : 0}}
                    >
                        Wishlist
                    </Button>
                </CardActions>
            </Card>
        ))
    }

    render () {
        console.log(this.state.products)
        return (
            <div style={styles.root} id="products">
                <h1 style={styles.title}>Products</h1>
                <div style={styles.cardContainer}>
                    {this.renderCards()}
                </div>
            </div>
        )
    }
}

const styles = {
    root : {
        width : '100%',
        height : 'auto',
        backgroundColor : '#f2f2f2',
        padding : '2% 7%',
    },
    title : {
        fontSize : 50,
        fontWeight : 600,
        margin : '2% 0px'
    },
    cardContainer : {
        width : '100%',
        display : 'flex',
        flexWrap : 'wrap',
        justifyContent : 'flex-start',
    },
    card : {
        flexBasis : '19%',
        minWidth : '300px',
        marginBottom : '1%',
        marginRight : '1%',
        borderRadius : 0
    },
    contentArea : {
        height : '87%',
        padding : '1%'
    },
    contentImage : {
        width : '100%',
        padding : '5%'
    },
    contentTitle : {
        fontWeight : 500, 
        fontSize : 20
    },
    buttonBuy : {
        marginLeft : '2%',
        backgroundColor : '#130f40',
        borderRadius : 0,
        padding : '3% 7%'
    }
}

export default Cards