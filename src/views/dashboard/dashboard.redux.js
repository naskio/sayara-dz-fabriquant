import {connect} from "react-redux";
import View from "./dashboard.view";
import {logout} from "../../redux/logics/user";

const mapStateToProps = state => ({
    // isLoggedIn: !!state.user.token,
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
