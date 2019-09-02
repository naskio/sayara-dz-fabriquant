import React from 'react';
import {
    // Tooltip,
    // IconButton,
    Hidden,
    // Dialog,
    // Paper,
    // Typography,
} from '@material-ui/core';
// import {
//     Add as AddIcon,
//     Edit as EditIcon,
//     Delete as DeleteIcon,
//     CloudUploadSharp as CloudIcon,
// } from '@material-ui/icons';
import SnackBar from '../../../components/dashboard/snackbar';
import {catcher} from "../../../utils/catcher";

export default class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openSnackBar: false,
            messageSnackBar: '',
            variantSnackBar: 'info',
            formInitialValues: {},
            formTitle: '',
        };
    }

    toggleSnackBar = () => {
        const {openSnackBar} = this.state;
        this.setState({openSnackBar: !openSnackBar,});
    };

    handleCloseSnackBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.toggleSnackBar();
    };

    showSnackBar = (message, variant = 'info') => {
        this.setState({
            openSnackBar: true,
            messageSnackBar: message,
            variantSnackBar: variant,
        });
    };

    simulate = (data) => {
        const {simulate} = this.props;
        simulate(data)
            .then(res => {
                console.log('res', res);
                // TODO this.setState({});
            })
            .catch(catcher(this.showSnackBar));
    };

    render() {
        const {
            openSnackBar,
            messageSnackBar,
            variantSnackBar,
            formInitialValues,
            formTitle,
        } = this.state;
        const {
            versions,
            models,
            colors,
            options,
        } = this.props;
        return (
            <div>
                <Hidden xsDown>
                    Hello Simulateur
                </Hidden>
                {/*message SnackBar*/}
                {
                    openSnackBar && <SnackBar
                        open={openSnackBar}
                        handleClose={this.handleCloseSnackBar}
                        message={messageSnackBar}
                        variant={variantSnackBar}
                    />
                }
            </div>
        );
    }
}
