import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {
    Dialog,
    DialogContent,
    IconButton
} from '@material-ui/core';
import {
    Close as CloseIcon,
} from '@material-ui/icons';

var Carousel = require('react-responsive-carousel').Carousel;

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
        const {classes, open, onClose, image, images, id} = this.props;
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
                        !images && image &&
                        <img style={{
                            width: '100%',
                            objectFit: 'cover',
                            marginTop: 44,
                        }}
                             src={image}
                             alt='Dialog Preview'/>
                    }
                    {
                        !!images && (
                            <div style={{marginTop: 44,}}>
                                <Carousel showArrows id={`carousel-images-${id}`}>
                                    {
                                        images.map((item, ind) => (
                                            <div key={ind}>
                                                <img style={{
                                                    width: '100%',
                                                    objectFit: 'cover',
                                                }}
                                                     src={item.url}
                                                     alt='Dialog Preview'/>
                                                <p className="legend">{item.title}</p>
                                            </div>
                                        ))
                                    }
                                </Carousel>
                            </div>
                        )
                    }
                </DialogContent>
            </Dialog>
        );
    }
}

export default withStyles(styles)(View);
