import React from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
    Divider,
    ListItem,
    ListItemIcon,
    ListItemText,
    CssBaseline,
    List,
    Tooltip,
    Badge,
    CircularProgress,
} from "@material-ui/core";
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import styles from '../../styles/material_ui/dashboard.style';
import {Link} from 'react-router-dom';
import {
    Menu as MenuIcon,
    ExitToApp as ExitToAppIcon,
    ChevronLeft as ChevronLeftIcon,
    ChevronRight as ChevronRightIcon,
    Notifications as NotificationsIcon,
    Refresh as RefreshIcon,
} from "@material-ui/icons";
import routes from "../../routing/routes";
import styled from "styled-components";
import {LOGO} from "../../assets/images";
import ConfirmationDialog from '../../components/dashboard/confirmationDialog';
import PopUpList from '../../components/dashboard/popupList';
import MenuList from "@material-ui/core/MenuList";
import {setAuthorizationToken} from "../../utils/axios";

const Logo = styled.img`
  height: 8rem;
  object-fit: contain;
`;

// TODO: add tests everywhere
class View extends React.PureComponent {
    constructor(props) {
        super(props);
        const {token} = props;
        setAuthorizationToken(token);
        this.state = {
            openDrawer: true,
            openLogoutDialog: false,
            openPopupNotifs: false,
            refreshing: false,
        };
    }

    componentDidUpdate(prevProps, prevStats, snapshot) {
        if (prevProps.match.params.page !== this.props.match.params.page) {
            const {setTitle, match} = this.props;
            const {params: {page = Object.entries(routes)[0][0]}} = match;
            setTitle(`Sayara Dz - ${routes[page].label}`);
        }
    }

    componentDidMount() {
        const {match, setTitle, setIsLoaded, isLoaded} = this.props;
        const {params: {page = Object.entries(routes)[0][0]}} = match;
        setTitle(`Sayara Dz - ${routes[page].label}`);

        if (!isLoaded) {
            setIsLoaded(true);
            const {
                fetchProfile,
                fetchModels,
                fetchVersions,
                fetchCategories,
                fetchOptions,
                fetchColors,
                fetchImages,
                fetchVideos,
                fetchPricing,
                fetchVehicles,
                fetchOrders,
            } = this.props;
            fetchProfile();
            fetchModels();
            fetchVersions();
            fetchCategories();
            fetchOptions();
            fetchColors();
            fetchImages();
            fetchVideos();
            fetchPricing();
            fetchVehicles();
            fetchOrders();
        }
    }

    toggleDrawer = () => {
        const {openDrawer} = this.state;
        this.setState({openDrawer: !openDrawer});
    };

    toggleLogoutDialog = () => {
        const {openLogoutDialog} = this.state;
        this.setState({openLogoutDialog: !openLogoutDialog});
    };

    togglePopupNotifs = () => {
        const {openPopupNotifs} = this.state;
        this.setState({openPopupNotifs: !openPopupNotifs});
    };

    handleClosePopupNotifs = event => {
        if (this.anchorEl && this.anchorEl.contains(event.target)) {
            return;
        }
        this.setState({openPopupNotifs: false});
    };

    handleRefresh = () => {
        const {refreshing} = this.state;
        if (!refreshing) {
            const {
                fetchProfile,
                fetchModels,
                fetchVersions,
                fetchCategories,
                fetchOptions,
                fetchColors,
                fetchImages,
                fetchVideos,
                fetchPricing,
                fetchVehicles,
            } = this.props;

            this.setState({refreshing: true});
            Promise.all(
                [
                    fetchProfile(),
                    fetchModels(),
                    fetchVersions(),
                    fetchCategories(),
                    fetchOptions(),
                    fetchColors(),
                    fetchImages(),
                    fetchVideos(),
                    fetchPricing(),
                    fetchVehicles(),
                ]
            ).then(() => this.setState({refreshing: false}));
        }
    };

    render() {
        const {match, logout, classes} = this.props;
        const {openDrawer, openLogoutDialog, openPopupNotifs, refreshing} = this.state;
        const {params: {page = Object.entries(routes)[0][0]}} = match;
        const popupNotifsId = openPopupNotifs ? 'popup-notifications-id' : undefined;

        return (
            <div className={classes.root}>
                <CssBaseline/>
                {/*Header*/}
                <AppBar position="absolute"
                        className={classNames(classes.appBar, openDrawer && classes.appBarShift)}
                >
                    <Toolbar disableGutters={!openDrawer} className={classes.toolbar}>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.toggleDrawer}
                            className={classNames(classes.menuButton, openDrawer && classes.menuButtonHidden)}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                            {routes[page].label}
                        </Typography>

                        {/*Refresh Button*/}
                        <IconButton color="inherit" onClick={this.handleRefresh} disabled={refreshing}>
                            {
                                refreshing ?
                                    (<CircularProgress color='secondary' size={20}/>) :
                                    <RefreshIcon/>
                            }
                        </IconButton>

                        <IconButton
                            color="inherit"
                            aria-haspopup="true"
                            buttonRef={node => {
                                this.anchorEl = node;
                            }}
                            aria-owns={popupNotifsId}
                            onClick={this.togglePopupNotifs}
                        >
                            <Badge badgeContent={0} color="secondary">
                                <NotificationsIcon/>
                            </Badge>
                        </IconButton>

                        {/*PopUp Notifications*/}
                        <PopUpList
                            open={openPopupNotifs}
                            anchorEl={this.anchorEl}
                            handleClose={this.handleClosePopupNotifs}
                            id={popupNotifsId}
                        >
                            <MenuList style={{color: 'black', width: '25vw', maxHeight: '25vw', overflowY: 'scroll'}}>
                                <Typography variant="subtitle1" style={{opacity: 0.5, textAlign: 'center'}}>
                                    Pas de nouvelles notifications.
                                </Typography>
                            </MenuList>
                        </PopUpList>

                        <IconButton color="inherit" onClick={this.toggleLogoutDialog}>
                            <ExitToAppIcon/>
                        </IconButton>
                        <ConfirmationDialog
                            open={openLogoutDialog}
                            title="Confirmation de deconnexion"
                            content="Êtes-vous sûr de vouloir vous déconnecter ?"
                            handleClose={this.toggleLogoutDialog}
                            handleAgree={logout}
                            handleDisagree={this.toggleLogoutDialog}
                        />
                    </Toolbar>
                </AppBar>

                {/*Navigation Drawer*/}
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: classNames(classes.drawerPaper, !openDrawer && classes.drawerPaperClose),
                    }}
                    open={openDrawer}
                >
                    <div className={classes.toolbarIcon}>
                        {/*TODO: add logo company here*/}
                        <IconButton onClick={this.toggleDrawer}>
                            {
                                openDrawer ? <ChevronLeftIcon/> : <ChevronRightIcon/>
                            }
                        </IconButton>
                    </div>
                    <List>
                        <Divider/>
                        {
                            Object.entries(routes).map(([key, item]) => {
                                const selected = page === key;
                                return (
                                    <ListItem
                                        button
                                        component={Link}
                                        to={`/${key}`}
                                        selected={selected}
                                        key={key}
                                        // disabled={selected}
                                    >
                                        <ListItemIcon>
                                            <Tooltip title={item.label}>
                                                <item.icon color={selected ? 'secondary' : 'inherit'}/>
                                            </Tooltip>
                                        </ListItemIcon>
                                        <ListItemText primary={item.label}/>
                                    </ListItem>
                                )
                            })
                        }
                        <Divider/>
                        {
                            openDrawer && (
                                <Link to='/'>
                                    <Logo src={LOGO} className="m-5"/>
                                </Link>
                            )
                        }
                    </List>
                </Drawer>

                {/*Main Content*/}
                <main className={classes.content}>
                    <div className={classes.appBarSpacer}/>
                    {
                        React.createElement(routes[page].component)
                    }
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(View)
