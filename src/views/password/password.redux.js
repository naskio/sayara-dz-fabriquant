import {connect} from "react-redux";
import View from "./password.view";
import {fetchProfile, setPassword} from "../../redux/logics/user";
import {setTitle} from "../../redux/logics/config";

const mapStateToProps = state => ({
    isLoggedIn: !!state.user.token,
});

const mapDispatchToProps = dispatch => ({
    setPassword: (data) => dispatch(setPassword(data)),
    fetchProfile: () => dispatch(fetchProfile()),
    setTitle: (title) => dispatch(setTitle(title)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(View);
