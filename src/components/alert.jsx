import React from 'react'
import {
    Dialog,
    // DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button
} from '@material-ui/core'

function Alert (props) {
    return (
        <Dialog
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            style={styles.root}
        >
            {/* <DialogTitle id="alert-dialog-title" style={styles.title}>{props.title}</DialogTitle> */}
            <DialogContent>
                <DialogContentText id="alert-dialog-description" style={styles.title}>
                    {props.title}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleOk} color="primary" autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

const styles = {
    root : {
        borderRadius : 0
    },
    title : {
        fontWeight : 500,
        color : 'black',
        fontSize : 16
    }
}

export default Alert