import {connect} from "react-redux";
import View from "./login.view";
import {login} from "../../redux/logics/user";
import {setTitle} from "../../redux/logics/config";

const mapStateToProps = state => ({
    isLoggedIn: !!state.user.token,
});

const mapDispatchToProps = dispatch => ({
    submit: (data) => dispatch(login(data)),
    setTitle: (title) => dispatch(setTitle(title)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
