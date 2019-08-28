import {connect} from "react-redux";
import View from "./login.view";
import {login} from "../../redux/logics/user";

const mapStateToProps = state => ({
    isLoggedIn: !!state.user.token,
});

const mapDispatchToProps = dispatch => ({
    submit: (data) => dispatch(login(data)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
