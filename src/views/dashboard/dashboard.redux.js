import {connect} from "react-redux";
import View from "./dashboard.view";
import {logout, getProfile} from "../../redux/logics/user";
import {getSessionToken} from "../../utils/session";

const mapStateToProps = state => ({
    token: (!!state.user.token ? state.user.token : getSessionToken()),
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    getProfile: () => dispatch(getProfile()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
