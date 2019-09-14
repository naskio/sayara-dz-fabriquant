import React from 'react';
import {IconButton, Typography} from "@material-ui/core";
import PopUpList from "../popupList";
import {labelTransformer} from "../../../assets/data/specs";

export default class View extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {openPopup: false};
    }

    togglePopup = () => {
        const {openPopup} = this.state;
        this.setState({openPopup: !openPopup});
    };

    handleClosePopup = event => {
        if (this.anchorEl && this.anchorEl.contains(event.target)) {
            return;
        }
        this.setState({openPopup: false});
    };

    emptyObject = obj => JSON.stringify(obj) === '{}';

    disable = specs => {
        let vv = true;
        Object.entries(specs).map(([k, v]) => {
            Object.entries(v).map(([k1, v1]) => {
                if (!!v1) {
                    vv = false;
                }
            })
        });
        return vv;
    };

    render() {
        const {id, icon, specs} = this.props;
        const Icon = icon;
        const {openPopup} = this.state;
        return (
            <>
                <IconButton
                    color="inherit"
                    aria-haspopup="true"
                    buttonRef={node => {
                        this.anchorEl = node;
                    }}
                    aria-owns={`popup-${id}`}
                    onClick={this.togglePopup}
                    disabled={this.disable(specs)}
                >
                    <Icon/>
                </IconButton>

                {/*PopUp Notifications*/}
                <PopUpList
                    open={openPopup}
                    anchorEl={this.anchorEl}
                    handleClose={this.handleClosePopup}
                    id={`popup-${id}`}
                >
                    {
                        specs ?
                            <div style={{
                                padding: 16,
                            }}>
                                {
                                    Object.entries(specs).filter(([category, values]) => !this.emptyObject(values)).map(([category, values]) =>
                                        (<div key={category} style={{marginBottom: 16,}}>
                                            <Typography color='primary' variant="button">
                                                {category}
                                            </Typography>
                                            <div style={{marginLeft: 16, marginRight: 16,}}>
                                                {
                                                    Object.entries(values).filter(([spec, value]) => !!value).map(([spec, value]) =>
                                                        (
                                                            <div key={spec}>
                                                                <Typography variant="button"
                                                                            style={{
                                                                                display: "inline",
                                                                            }}>
                                                                    {labelTransformer(spec)}
                                                                </Typography>
                                                                <Typography variant="body1"
                                                                            style={{
                                                                                display: "inline",
                                                                                marginLeft: 12,
                                                                            }}>
                                                                    {value}
                                                                </Typography>
                                                            </div>
                                                        )
                                                    )
                                                }
                                            </div>
                                        </div>)
                                    )
                                }
                            </div>
                            :
                            <Typography variant="subtitle1" style={{textAlign: 'center'}}>
                                Vide
                            </Typography>
                    }
                </PopUpList>
            </>
        );
    }
}
