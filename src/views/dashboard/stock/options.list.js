import React from 'react';
import {IconButton, Typography, MenuList, ListItem} from "@material-ui/core";
import PopUpList from "../../../components/dashboard/popupList";

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

    render() {
        const {id, icon, list, field} = this.props;
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
                        list ?
                            <MenuList style={{color: 'black', width: '25vw', maxHeight: '25vw', overflowY: 'scroll'}}>
                                {
                                    list.map(item => (
                                        <ListItem key={item.id}>
                                            <Typography variant="subtitle1" style={{textAlign: 'center'}}>
                                                {item[field]}
                                            </Typography>
                                        </ListItem>
                                    ))
                                }
                            </MenuList>
                            :
                            <Typography variant="subtitle1" style={{textAlign: 'center'}}>
                                Liste Vide
                            </Typography>
                    }
                </PopUpList>
            </>
        );
    }
}
