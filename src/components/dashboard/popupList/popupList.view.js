import React from 'react';
import * as PropTypes from 'prop-types';
import {
    Popper,
    Grow,
    Paper,
    ClickAwayListener,
} from '@material-ui/core';

/**
 * Popup Generic component
 */

class View extends React.PureComponent {
    render() {
        const {open, anchorEl, handleClose, children, id} = this.props;
        return (
            <Popper open={open} anchorEl={anchorEl} transition disablePortal style={{
                zIndex: 100,
            }}>
                {({TransitionProps, placement}) => (
                    <Grow
                        {...TransitionProps}
                        style={{transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom'}}
                    >
                        <Paper id={id}>
                            <ClickAwayListener onClickAway={handleClose}>
                                {children}
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        );
    }
}

View.defaultProps = {
    anchorEl: {},
    id: '',
};
View.propTypes = {
    /**
     * is true when the menu is opened
     */
    open: PropTypes.bool.isRequired,
    /**
     * menu node position
     */
    anchorEl: PropTypes.objectOf(PropTypes.any),
    /**
     * Action creator: logout
     */
    handleClose: PropTypes.func.isRequired,
    /**
     * Children
     */
    children: PropTypes.any.isRequired,
    /**
     * Html ID
     */
    id: PropTypes.string.isRequired,
};
export default View;
