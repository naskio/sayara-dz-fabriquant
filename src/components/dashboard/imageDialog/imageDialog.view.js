import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    Dialog,
    DialogContent,
    IconButton
} from '@material-ui/core';
import {
    Close as CloseIcon,
} from '@material-ui/icons';

const styles = theme => ({
    dialog: {
        margin: 0,
        padding: theme.spacing(2),
        width: 600,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
    },
});


class View extends React.PureComponent {
    render() {
        const {classes, open, onClose, image} = this.props;
        return (
            <Dialog onClose={onClose} open={open}>
                <DialogContent className={classes.dialog}>
                    <IconButton type="button"
                                className={classes.closeButton}
                                onClick={onClose}
                    >
                        <CloseIcon/>
                    </IconButton>
                    {
                        image &&
                        <img style={{
                            width: '100%',
                            objectFit: 'cover',
                            marginTop: 44,
                        }}
                             src={image}
                             alt='Dialog Preview'/>
                    }
                </DialogContent>
            </Dialog>
        );
    }
}

export default withStyles(styles)(View);
