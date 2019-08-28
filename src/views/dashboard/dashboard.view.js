import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    Divider,
    ListItem,
    // ListItemIcon,
    ListItemText
} from "@material-ui/core";
import {Link} from 'react-router-dom';
import {Menu as MenuIcon, ExitToApp} from "@material-ui/icons";
import routes from "../../routing/routes";
import styled from "styled-components";
import {LOGO} from "../../assets/images";

const Logo = styled.img`
  height: 8rem;
  object-fit: contain;
`;


export default class View extends React.PureComponent {
    componentDidMount() {
        // TODO: make requests here
    }

    render() {
        const {match, logout} = this.props;
        const {params: {page = 'home'}} = match;
        return (<div>
            <AppBar
                color="inherit"
                position="fixed"
            >
                <Toolbar>
                    <div className="container-fluid d-flex flex-row justify-content-end">
                    {/*<div>*/}
                    {/*    <IconButton*/}
                    {/*        color="inherit"*/}
                    {/*        aria-label="Open drawer"*/}
                    {/*        // onClick={handleDrawerOpen}*/}
                    {/*        // className={classNames(classes.menuButton, open && classes.hide)}*/}
                    {/*    >*/}
                    {/*        <MenuIcon/>*/}
                    {/*    </IconButton>*/}
                    {/*    <Typography>Hello World</Typography>*/}
                    {/*</div>*/}
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={logout}
                    >
                        <ExitToApp/>
                    </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="persistent"
                color="primary"
                open
            >
                <Logo src={LOGO} className="m-5"/>
                <Divider/>
                {
                    routes.map(item => (
                        <ListItem
                            button
                            component={Link}
                            to={`/${item.id}`}
                            selected={page === `${item.id}`}
                            key={item.id}
                        >
                            {/*<ListItemIcon>*/}
                            {/*    <img src={item.icon} alt="menu" className={classes.icon} />*/}
                            {/*</ListItemIcon>*/}
                            <ListItemText primary={item.label}/>
                        </ListItem>
                    ))
                }
                {/*<Divider/>*/}
                {/*<Typography>Hello world!</Typography>*/}
            </Drawer>
        </div>);
    }
}
