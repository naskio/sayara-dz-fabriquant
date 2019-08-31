import {connect} from "react-redux";
import View from "./router.view";
import {getSessionToken} from "../../utils/session";

const mapStateToProps = state => ({
    token: (!!state.user.token ? state.user.token : getSessionToken()),
    title: state.config.title,
});

// const mapDispatchToProps = dispatch => ({
//     logout: () => dispatch(logout()),
// });

export default connect(
    mapStateToProps,
    // mapDispatchToProps
)(View);
